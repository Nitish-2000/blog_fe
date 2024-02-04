import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../Hooks/useLogout";

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
function Headers() {
  let userData = JSON.parse(sessionStorage.getItem("userData"));
  let navigate = useNavigate();
  let logout = useLogout();
  let [role, setRole] = useState("");

  useEffect(() => {
    if (!userData) {
      logout();
    } else {
      setRole(userData.role);
    }
  });

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
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
               {userData.firstName}
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
                {role === "admin" ? <AdminNavLink0 /> : <UserNavLink0 />}
              </Menu>
            </Box>
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
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {role === "admin" ? <AdminNavLink /> : <UserNavLink />}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem>
                  <Typography textAlign="center"></Typography>
                </MenuItem>
                {/* ))} */}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

function AdminNavLink() {
  let navigate = useNavigate();
  let logout = useLogout();
  return (
    <>
      <Button
        onClick={() => navigate("/dashboard")}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        Dashboard
      </Button>
      <Button onClick={logout} sx={{ my: 2, color: "white", display: "block" }}>
        Logout
      </Button>
    </>
  );
}

function AdminNavLink0() {
  let navigate = useNavigate();
  let logout = useLogout();
  return (
    <>
      <MenuItem>
        <Typography textAlign="center" onClick={() => navigate("/dashboard")}>
          Dashboard
        </Typography>
      </MenuItem>
      <MenuItem>
        <Typography textAlign="center" onClick={logout}>
          Logout
        </Typography>
      </MenuItem>
    </>
  );
}

function UserNavLink() {
  let navigate = useNavigate();
  let logout = useLogout();

  return (
    <>
      <Button
        onClick={() => navigate("/home")}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        Home
      </Button>
      <Button
        onClick={() => navigate("/dashboard")}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        Dashboard
      </Button>
      <Button
        onClick={() => navigate("/create")}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        Create
      </Button>
      <Button onClick={logout} sx={{ my: 2, color: "white", display: "block" }}>
        Logout
      </Button>
    </>
  );
}

function UserNavLink0() {
    let navigate = useNavigate();
  let logout = useLogout();

  return (
    <>
      <MenuItem>
        <Typography textAlign="center" onClick= {()=>navigate('/home')}>Home</Typography>
      </MenuItem>
      <MenuItem>
        <Typography textAlign="center" onClick= {()=>navigate('/dashboard')}>Dashboard</Typography>
      </MenuItem>
      <MenuItem>
        <Typography textAlign="center" onClick= {()=>navigate('/create')}>Create</Typography>
      </MenuItem>
      <MenuItem>
        <Typography textAlign="center"  onClick={logout}>Logout</Typography>
      </MenuItem>
    </>
  );
}



export default Headers;
