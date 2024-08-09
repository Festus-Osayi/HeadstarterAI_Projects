import Error from "@/components/Error";
import PantryList from "@/components/PantryList";
import { auth } from "@/lib/firebase_config";
import { useEffect, useState } from "react";

export default function Pantryitems() {
    const [user, setUser] = useState(null)


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log(user)
            if (user) {
                setUser(user)
            }
        })

        return (() => {
            unsubscribe()
        })

    }, [])

    if (!user) {
        return <Error />
    }

    return (

        <PantryList />

    )

}

