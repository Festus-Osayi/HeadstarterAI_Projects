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
    setDoc,
    getDoc,
    Timestamp,
    serverTimestamp,
    updateDoc
} from "firebase/firestore";
import Error from "@/components/Error";



/** Application state management */
import { useImageUpload } from "@/imageUploadProvider";



export default function NewPantryItems() {

    const [item, setItem] = useState({ itemName: '', category: { name: '' } });
    const router = useRouter()
    const [user, setUser] = useState(null)
    const { setImageUpload, uploadImages, imageUrls } = useImageUpload();


    const handleImageChange = async (e) => {
        await setImageUpload(e.target.files[0]);
    };

    const handleSubmit = async () => {
        try {
            await uploadImages();
            const latestImageUrl = imageUrls[imageUrls.length - 1]; // Get the latest uploaded image URL
            await addItem(item, latestImageUrl);
            if (!latestImageUrl) return;
            router.push('/pantryitems')

        }
        catch (error) {
            return error
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
        } catch (error) {
            return error
        }

    };





    if (!user) {
        return <Error />
    }

    return (
        <>
            <Layout />
            <Container>

                <Box className="mt-5 w-[50%]">
                    <FormControl
                        className="flex flex-col gap-3"
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

