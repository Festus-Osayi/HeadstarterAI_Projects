'use client'
import { SignIn, SignUp, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Container, Button, Typography, Box, AppBar, Toolbar } from "@mui/material"
import { useEffect } from "react"



export default function SignUpPage() {


    return <Container maxWidth="lg">
        <Box
            display="flex"
            flexDirection='column'
            alignItems="center"
            justifyContent='center'
            marginTop='5em'
        >
            <Typography variant="h4">Sign In</Typography>
            <SignIn fallbackRedirectUrl="/restaurantDetails" />
        </Box>

    </Container>
}