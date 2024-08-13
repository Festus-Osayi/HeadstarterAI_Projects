
import { Container, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";




export default function Home() {
  const router = useRouter()


  return (
    <div className="bg-[url('/images/bg4.jpg')]
    bg-contain bg-center h-screen w-screen flex justify-center items-center"
    >
      <Container maxWidth='lg'
      >
        <div className="flex justify-center items-center h-[50vh]">
          <Button
            variant="contained" color="success"
            onClick={() => router.push("/login")}>Get started</Button>

        </div>

      </Container>

    </div>
  )
}