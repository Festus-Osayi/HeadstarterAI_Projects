import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, Button, MenuItem} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { default as NextLink } from "next/link";
import { Link } from "@mui/material";
import { auth } from "@/lib/firebase_config";
import { useRouter } from "next/router";
import {useState} from 'react'

const pagesLink = ["/", "register"];

function MainNav() {
  /** router */
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function signOut() {
    if (auth.signOut()) {
      router.push("/login");
    }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
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
            Pantry Tracker
          </Typography>

          {!auth.currentUser && (
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
                {pagesLink.map((link) => (
                  <MenuItem key={link} onClick={handleCloseNavMenu}>
                    <NextLink
                      textAlign="center"
                      href={`${link}`}
                      passHref
                      legacyBehavior
                    >
                      <Link className="no-underline text-black">
                        {link === "/" ? "Home" : "Join"}
                      </Link>
                    </NextLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Pantry
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {!auth.currentUser &&
              pagesLink.map((page) => (
                <NextLink key={page} passHref legacyBehavior href={`${page}`}>
                  <Link className="text-[#dfe9f3] no-underline flex ml-3">
                    {`${page === "/" ? "Home" : "Join"}`}
                  </Link>
                </NextLink>
              ))}
          </Box>

          {auth.currentUser && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={auth?.currentUser?.displayName}
                    src={auth?.currentUser?.photoURL}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={handleCloseUserMenu}
                  className="flex flex-col justify-center items-center gap-3"
                >
                  <Typography textAlign="center">
                    {auth.currentUser?.displayName}
                  </Typography>

                  <NextLink href={"/pantryitems"} passHref legacyBehavior>
                    <Link className="text-gray-800 no-underline">
                      Pantry Items
                    </Link>
                  </NextLink>

                  <NextLink
                    href={"/pantryitems/newpantryitems"}
                    passHref
                    legacyBehavior
                  >
                    <Link className="text-gray-800 no-underline">New item</Link>
                  </NextLink>

                  <Button onClick={signOut} variant="contained">
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainNav;
