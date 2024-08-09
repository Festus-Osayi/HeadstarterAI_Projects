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

/** Application state management */
import { useImageUpload } from "@/imageUploadProvider";
import { useAtom } from "jotai";







export default function NewPantryItems() {

    /** State managements
     * 
   * Manages - inventory list, and new item input
   */

    const [item, setItem] = useState({ itemName: '', category: { name: '' } });
    const router = useRouter()
    const [user, setUser] = useState(null)

    const { setImageUpload, uploadImages, imageUrls } = useImageUpload();

    /** function to fetch inventory data from Firestore 
     * @function hanndleImageChange - Handles the image input
     * 
    */


    const handleImageChange = async (e) => {
        await setImageUpload(e.target.files[0]);
    };

    const handleSubmit = async () => {
        try {
            await uploadImages();
            const latestImageUrl = imageUrls[imageUrls.length - 1]; // Get the latest uploaded image URL
            await addItem(item, latestImageUrl);
            if (latestImageUrl) {
                console.log(`Uploaded items successfully`);
                router.push('/pantryitems')

            }
            else{
                console.log('No image uploaded')
            }


        }
        catch (error) {
            console.log(`Error uploading image ${error}`)
        }

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItem(prevState => ({
            ...prevState,
            [name]: value
        }));

    };


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
            }
        })

        return (() => {
            unsubscribe()
        })

    }, [])


    /** Functionality to add an item to -- DB */

    const addItem = async (item, imageUrl) => {
        try {
            const docData = {
                name: item.itemName,
                category: {
                    name: item.category.name
                },
                quantity: 1,
                timestamp: Timestamp.now(),
                imageUrl: imageUrl// Include the image URL here
            };

            console.log('Document data to be added:', docData);

            const docRef = doc(collection(firestore, "inventory"), item.itemName);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const { quantity } = docSnap.data();
                await updateDoc(docRef, {
                    quantity: quantity + 1,
                    timestamp: serverTimestamp()
                });
                console.log('Document updated successfully');
            } else {
                await setDoc(docRef, docData);
                console.log('Document added successfully');
            }

            // Call updateInventory if it is defined
            if (typeof updateInventory === 'function') {
                await updateInventory();

            } else {
                console.warn('updateInventory function is not defined');
            }
        } catch (error) {
            console.error('Error adding document:', error);
        }

    };

    /** Updates the inventory */
    const updateInventory = async () => {
        const snapshot = query(collection(firestore, "inventory"));
        const docs = await getDocs(snapshot);
        const inventoryList = [];
        docs.forEach((doc) => {
            inventoryList.push({ name: doc.id, ...doc.data() });
        });
        setItem(inventoryList);
    };

    useEffect(() => {
        updateInventory();
    }, []);




    // }


    if (!user) {
        return <Error />
    }

    return (
        <>
            <Layout />
            <Container>

                <Box className="mt-5 w-[50%]">

                    <FormControl className="flex flex-col gap-3"
                        encType="multipart/form-data"
                    >
                        <TextField
                            label='item name'
                            value={item?.itemName}
                            onChange={handleInputChange}
                            type="text"
                            name="itemName"

                        />
                        <TextField
                            label='category'
                            value={item?.category?.name}
                            onChange={(e) => setItem(prevState => ({
                                ...prevState,
                                category: { name: e.target.value }
                            }))}
                        />
                        <TextField

                            onChange={handleImageChange}
                            type="file"
                            accept="image/*"
                        />
                        <div>
                            <Button variant="contained"
                                type="submit"

                                onClick={handleSubmit}
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

