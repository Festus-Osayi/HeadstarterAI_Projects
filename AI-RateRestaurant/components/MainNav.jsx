"use client";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";

import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import { useState } from "react";
import { default as NextLink } from "next/link";
import Link from "@mui/material/Link";
import theme from "@/app/theme";

const pages = ["/sign-in", "/sign-up"];
const flashcardPages = ["/", "/restaurantDetails"];

function MainNav() {
  const [anchorElNav, setAnchorElNav] = useState(null);
 
  const { user } = useUser();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#182539",
          color: "#00dfc3",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Taste Rank
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {/* when there's no user, display the signin and signup page... */}
                {!user &&
                  pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <NextLink href={page} passHref legacyBehavior>
                        <Link sx={{ textDecoration: "none", color: "black" }}>
                          {page == "/sign-in" ? "Signin" : "Signup"}
                        </Link>
                      </NextLink>
                    </MenuItem>
                  ))}

                {/* when there's a user, display the links to flashcard and flashcards */}
                {user &&
                  flashcardPages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <NextLink href={page} passHref legacyBehavior>
                        <Link sx={{ textDecoration: "none", color: "black" }}>
                          {page == "/" ? "Home" : "Restaurants"}
                        </Link>
                      </NextLink>
                    </MenuItem>
                  ))}
              </Menu>
              {/* menu */}
            </Box>

            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "Roboto",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Taste Rank
            </Typography>

            {!user && (
              <Box
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: "none",
                    md: "flex",
                    justifyContent: "flex-end",
                  },
                }}
              >
                <SignedOut>
                  <Button color="inherit" href="/sign-in">
                    Login
                  </Button>
                  <Button color="inherit" href="/sign-up">
                    Sign Up
                  </Button>
                </SignedOut>
              </Box>
            )}
            {user && (
              <Box
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  },
                }}
              >
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default MainNav;
