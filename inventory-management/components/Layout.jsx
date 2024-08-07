import { Container } from "@mui/material";
import MainNav from "./MainNav";

export default function Layout({ children }) {
  return (
    <>
    <MainNav/>
      <Container maxWidth='lg'>{children}</Container>
    </>
  );
}
