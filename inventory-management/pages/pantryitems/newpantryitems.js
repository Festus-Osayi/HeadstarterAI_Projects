import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase_config";
import {
    Box,
    Button,
    TextField,
    FormControl,
    Container,
} from "@mui/material";
import { firestore } from "@/lib/firebase_config";
import { useRouter } from "next/router";

import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    getDoc,
    Timestamp,
    serverTimestamp,
    updateDoc
} from "firebase/firestore";
import Error from "@/components/Error";

/** firebase storage*/
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";

import { storage } from "@/lib/firebase_config";

/** Generate random character */
import { v4 } from "uuid";






export default function NewPantryItems() {

    /** State managements
     * 
   * Manages - inventory list, and new item input
   */

    const [itemName, setItemName] = useState("");
    const [category, setCategory] = useState({})
    const [imageUpload, setImageUpload] = useState(null)
    const [imageUrls, setImageUrls] = useState([])
    const router = useRouter()
    const imageListRef = ref(storage, "pantryImages/")

    /** function to fetch inventory data from Firestore */

    const updateInventory = async () => {
        const snapshot = query(collection(firestore, "inventory"));
        const docs = await getDocs(snapshot);
        const inventoryList = [];
        docs.forEach((doc) => {
            inventoryList.push({ name: doc.id, ...doc.data() });
        });

    };

    useEffect(() => {
        updateInventory();
    }, []);

    /** Image upload */
    const uploadImages = function () {
        if (imageUpload === null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
            })
        })
    }

    useEffect(() => {
        /** List all images in the cloud storage */
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url])
                })
            })
        })
    }, [])


    /** Functionality to add an item to -- DB */
    const addItem = async (item) => {
        try {
            const docData = {
                name: item.itemName,
                category: {
                    name: item.category.name
                },

                quantity: 1,
                timestamp: Timestamp.now()
            };

            const docRef = doc(collection(firestore, "inventory"), item.itemName);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const { quantity } = docSnap.data();
                await updateDoc(docRef, {
                    quantity: quantity + 1,
                    timestamp: serverTimestamp()
                });
            } else {
                await setDoc(docRef, docData);

            }
            await updateInventory();
        } catch (error) {
            console.error(error);
        }
    };

    /** Data to populate the database with */

    const data = {
        itemName: itemName,
        category: {
            name: category
        },


    }

    if (!auth.currentUser) {
        return <Error />
    }

    return (
        <>
            <Layout />
            <Container>

                <Box className="mt-5 w-[50%]">

                    <FormControl className="flex flex-col gap-3"
                        enctype="multipart/form-data"
                    >
                        <TextField
                            label='item name'
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            type="text"

                        />
                        <TextField
                            label='category'
                            value={category.name}
                            onChange={(e) => setCategory({ name: e.target.value })}
                        />
                        <TextField

                            onChange={(e) => setImageUpload(e.target.files[0])}
                            type="file"
                            accept="image/*"
                        />
                        <div>
                            <Button variant="contained"
                                type="submit"
                                onClick={() => {
                                    addItem(data)
                                    uploadImages()
                                    setItemName(""),
                                        setCategory({ name: "" })
                                    setImageUpload("");
                                    router.push('/pantryitems')
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    </FormControl>

                </Box>
            </Container>
        </>
    )
}

