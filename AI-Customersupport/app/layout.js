
import MainNav from "@/components/MainNav";
import "../styles/global.css"
import { Container } from "@mui/material";



export const metadata = {
  title: "FusionTalk AI",
  description: "Talk to your favorite celebrity!",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html>
        <body>
          <MainNav />
          <br/>
          <br/>
          <Container maxWidth='lg'>
            {children}
          </Container>

        </body>
      </html>
    </>
  );
}
