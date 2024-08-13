
import { Box, Container, Typography, TextField, Button, Link, FormControl, Alert } from "@mui/material";
import { auth } from "@/lib/firebase_config";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { default as NextLink } from "next/link";
import Layout from "@/components/Layout";
/** Google provider */
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import ReuseableHeading from "@/components/ReuseableHeading";







export default function Register() {
    /** States */
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [googleError, setGoogleError] = useState("")


    async function handleRegister(e) {
        e.preventDefault()
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password)

            if (user) {
                router.push("/pantryitems")
                clearField()

            }

        }
        catch (error) {
            setErrorMessage(error.message)
            clearField()
        }

    }

    /** Handle signup with Google */
    function handleAuth(e) {
        e.preventDefault()
        try {
            const provider = new GoogleAuthProvider()
            signInWithPopup(auth, provider)
                .then((result) => {

                    // The signed-in user info.
                    const user = result.user
                    if (!user) return;

                    router.push('/pantryitems')
                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                }).catch((error) => {
                    // Handle Errors here.
                    setGoogleError(error.message)

                });
        }
        catch (err) {
            setGoogleError(err.message)
        }
    }

    function clearField() {
        setEmail("")
        setPassword("")
    }


    return (
        <>

            <Layout />
            <Container>
                <ReuseableHeading>
                    Pantry Tracker
                </ReuseableHeading>
                <Box
                    className="lg:mt-10"
                >
                    {/* input*/}
                    <div className="flex flex-col justify-center gap-3 h-[55vh]">

                        <Typography variant="h5">Create new account</Typography>
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
                            component='form'
                            onSubmit={handleRegister}

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

                            <div className="flex justify-between items-center my-4">
                                <Button
                                    type="submit"
                                    variant="contained"

                                >
                                    Register
                                </Button>

                                {
                                    errorMessage && <Alert severity="error">Sorry, email already exists.</Alert>
                                }
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

                            {
                                googleError && <Alert severity="error">
                                    {googleError}
                                </Alert>
                            }
                        </div>
                    </div>
                </Box>
            </Container>

        </>
    )
}


