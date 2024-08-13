import { useRouter } from "next/router";
import { TextField, Container, Typography, Box, Link, Button, FormControl, Alert } from "@mui/material";
import { default as NextLink } from "next/link";
import Layout from "@/components/Layout";
import { useState } from "react";
import { auth } from "@/lib/firebase_config";
import { signInWithEmailAndPassword } from "firebase/auth";
import ReuseableHeading from "@/components/ReuseableHeading";

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    function clearField() {
        setEmail("")
        setPassword("")
    }
    async function handleLogin(e) {
        e.preventDefault()
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            if (user) {
                router.push("/pantryitems")
                clearField()
                console.log(user)
            }
        } catch (error) {
            console.log(error.message)
            setErrorMessage(error.message)
            clearField()
        }
    }



    return (
        <>
            <Layout />
            <Container maxWidth='lg'>

                <ReuseableHeading>
                    Pantry Tracker
                </ReuseableHeading>
                <Box
                >
                    {/* input*/}
                    <div className="flex flex-col justify-center gap-3 h-[50vh]">
                        <Typography variant="h5">Login to get started</Typography>
                        <div className="flex gap-2">
                            <p>Have no account yet?</p>
                            <NextLink
                                href="/register"
                                passHref
                                legacyBehavior
                            >
                                <Link className="no-underline font-bold">register</Link>
                            </NextLink>
                        </div>

                        <FormControl
                            component='form'
                            className="flex w-[100%] md:w-[50%] gap-5 "
                            onSubmit={handleLogin}
                        >
                            <TextField id="email" label="Email" variant="outlined" type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                id="password"
                                label="Password" variant="outlined"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="flex justify-between items-center">
                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    Login
                                </Button>

                                {
                                    errorMessage && <Alert severity="error">Sorry: Invalid credentials</Alert>
                                }
                            </div>
                        </FormControl>
                    </div>
                </Box>
            </Container>
        </>
    )
}