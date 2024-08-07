import Error from "@/components/Error";
import PantryList from "@/components/PantryList";
import { auth } from "@/lib/firebase_config";

export default function Pantryitems() {
    if (!auth.currentUser) {
        return <Error />
    }
    return (

        <PantryList />

    )
}

