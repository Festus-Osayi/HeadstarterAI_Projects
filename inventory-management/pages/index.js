
import { Container, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";




export default function Home() {
  const router = useRouter()


  return (
    <>
      <Container maxWidth='lg'>
        <Typography variant='h2' color='primary' textAlign='center' className="text-black text-left">Pantry Tracker</Typography>
        <div className="flex justify-center items-center h-[50vh]">
          <Button
            variant="contained" color="primary"
            onClick={() => router.push("/login")}>Get started</Button>

        </div>

      </Container>

    </>
  )
}