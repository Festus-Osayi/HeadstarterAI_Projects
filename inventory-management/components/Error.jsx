import { Box, Button, Container, Typography, Link } from "@mui/material";
import { default as NEXTLINK } from "next/link";

export default function Error() {
  return (
    <Container maxWidth="sm">
      <Box className="flex flex-col justify-center items-center h-screen">
        <Typography variant="h5">Opps! something went wrong</Typography>
        <p className="text-center">
          It seems you forgot to login or register. Please login and try again
          later..
        </p>

        <NEXTLINK href="/login" className="mt-10">
          <Button variant="contained" color="primary">
            Login
          </Button>
        </NEXTLINK>
      </Box>
    </Container>
  );
}
