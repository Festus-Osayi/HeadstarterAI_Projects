import { useRouter } from "next/router";
import { TextField, Container, Typography, Box, Link, Button, FormControl } from "@mui/material";
import { default as NextLink } from "next/link";
import Layout from "@/components/Layout";
import { useState } from "react";
import { auth } from "@/lib/firebase_config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            if (user) {
                router.push("/pantryitems")
                setEmail("")
                setPassword("")
            }
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <>
            <Layout>
                <Typography variant='h2' color='primary' textAlign='center' className="text-[#1976D2] text-left">Pantry Tracker</Typography>
                <Box
                    component='form'
                >


                    {/* input*/}
                    <div className="flex flex-col justify-center gap-3 h-[50vh]">
                        <Typography variant="h4">Login to get started</Typography>
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
                            className="flex w-[100%] md:w-[50%] gap-5"
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
                            <div>
                                <Button
                                    type="button"
                                    variant="contained"
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            </div>
                        </FormControl>
                    </div>
                </Box>
            </Layout >

        </>
    )
}