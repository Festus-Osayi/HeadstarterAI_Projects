
import { Box, Container, Typography, TextField, Button, Link, FormControl, Input, InputLabel, FormHelperText } from "@mui/material";
import { auth } from "@/lib/firebase_config";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { default as NextLink } from "next/link";
import Layout from "@/components/Layout";
/** Google provider */
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";







export default function Register() {
    /** States */
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    async function handleRegister(e) {
        e.preventDefault()
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password)

            if (user) {
                router.push("/login")
                setEmail("")
                setPassword("")
            }

        }
        catch (error) {
            console.error(error)
        }

    }

    /** Handle signup with Google */
    function handleAuth(e) {
        e.preventDefault()
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.

                const user = result.user;

                if (user) {
                    router.push('/pantryitems')

                }
                else {
                    router.push('/login')
                }
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error?.code;
                const errorMessage = error?.message;
                // The email of the user's account used.
                const email = error?.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log({ errorCode, errorMessage, email, credential })
            });
    }


    return (
        <>

            <Layout>

                <Typography variant='h3' color='primary' textAlign='center' className="shadow-sm text-left mt-5 text-[#1976D2]">Pantry Tracker</Typography>
                <Box
                    component='form'
                    className="lg:mt-10"
                >
                    {/* input*/}
                    <div className="flex flex-col justify-center gap-3 h-[55vh]">

                        <Typography variant="h4">Create new account</Typography>
                        <div className="flex gap-2">
                            <p>Already A member?</p>
                            <NextLink
                                href="/login"
                                passHref
                                legacyBehavior
                            >
                                <Link className="no-underline font-bold">Log in</Link>
                            </NextLink>
                        </div>
                        <FormControl
                            className="flex gap-5 w-[100%] md:w-[50%]"

                        >
                            <TextField id="email" label="Email" variant="outlined" type="email"
                                className="w-[100%]"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                id="password"
                                label="Password" variant="outlined"
                                className="w-[100%]"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <div className="flex my-4">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={handleRegister}
                                >
                                    Register
                                </Button>
                            </div>
                        </FormControl>

                        {/* Authentication */}
                        <div className="flex gap-3
                        items-center">
                            <p className="text-sm"
                            >Create account with</p>
                            <Button className="border-solid border border-sky-500 rounded-[1em] px-0"
                                onClick={handleAuth}
                            >
                                <FcGoogle className="text-xl" />
                            </Button>
                        </div>
                    </div>
                </Box>
            </Layout>
        </>
    )
}


