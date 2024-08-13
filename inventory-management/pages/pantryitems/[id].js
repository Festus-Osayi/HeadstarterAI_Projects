import Layout from "@/components/Layout";
import { Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { firestore } from "@/lib/firebase_config";
/** find where the item name is eql to the name */
import { getDoc, doc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import PantryDetails from "@/components/PantryDetails";
import { IoIosArrowRoundBack } from "react-icons/io";
import ImageDesc from "@/components/ImageDesc";


export default function ItemDetails() {
    const router = useRouter()
    const { id } = router.query
    const [itemDetails, setItemDetails] = useState([])

    async function readDB() {
        try {
            const docRef = doc(firestore, "inventory", id)
            if (!docRef) return;
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setItemDetails(docSnap.data())
            }

        }
        catch (error) {
            console.log(error)
        }


    }

    useEffect(() => {
        readDB()
    }, [])

    return (
        <>
            <Layout />
            <Container maxWidth='lg'>

                <Typography variant="h4" component="h4" sx={{
                    mt: 4,
                    mb: 5,
                }} className='text-[#1976D2]'>Pantry Details</Typography>

                <div className="bg-[#1976D2] w-10 flex justify-center items-center rounded-md mb-10 cursor-pointer"
                    onClick={() => router.back()}
                >
                    <IoIosArrowRoundBack className="text-white text-2xl" />
                </div>
                <PantryDetails {...itemDetails} />
                <ImageDesc {...itemDetails} />
            </Container>
        </>
    )
}

