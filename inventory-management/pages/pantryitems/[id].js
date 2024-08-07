import Layout from "@/components/Layout";
import { Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { firestore } from "@/lib/firebase_config";
/** find where the item name is eql to the name */
import { getDoc, doc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function ItemDetails() {
    const router = useRouter()
    const { id } = router.query
    const [itemDetails, setItemDetails] = useState([])

    async function readDB() {
        const docRef = doc(firestore, "inventory", id)
        const docSnap = await getDoc(docRef)

       setItemDetails(docSnap.data())

    }

    useEffect(() => {
        readDB()
    }, [])

    console.log(itemDetails)

    return (
        <>
            <Layout />
            <Container maxWidth='lg'>
                <Typography variant="h4" component="h4"
                className='mt-5'
                >
                    Pantry Details
                </Typography>
                <Typography>{itemDetails?.name}</Typography>
                <Typography>{itemDetails?.quantity}</Typography>
            </Container>
        </>
    )
}

