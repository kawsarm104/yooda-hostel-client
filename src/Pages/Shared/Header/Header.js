import * as React from "react";
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
import "./Header.css";
import useAuth from "../../../Hooks/useAuth";
import { Link, NavLink } from "react-router-dom";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  const { user, logOut, admin } = useAuth();
  console.log(user.email);

  return (
    <section className="text-dark">
      <AppBar
        style={{ backgroundColor: "RGBA(0,101,80,0)" }}
        className="text-dark"
        position="static"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <NavLink to="/" style={{ textDecoration: "none" }}>Travel Blog</NavLink>
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
                <Link to='/'>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" sx={{ color: "blue" }}>Home</Typography>
                  </MenuItem>
                </Link>
                <Link to='/blogs'>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" sx={{ color: "blue" }}>Blogs</Typography>
                  </MenuItem>
                </Link>



                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" sx={{ color: "blue" }}>About Us</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <img width={160} src="{logo}" alt="" />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link className="text-decoration-none" to='/'>
                <Button
                  className="text-dark"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  Home
                </Button>
              </Link>

              <Button
                className="text-dark"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              // style={{ textDecoration: "none" }}

              >
                <Link to="/blogs" sx={{ color: "black" }}>Blogs</Link>
              </Button>

              <Button
                className="text-dark"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                About Us
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Profile and Settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
               
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><NavLink to="/dashboard" style={{ textDecoration: 'none', color: 'black' }}>Dashboard</NavLink></Typography>
                </MenuItem> 
                {user?.email ? (
                  <MenuItem onClick={logOut}>
                    <Typography textAlign="center" sx={{ color: "black" }}>Logout</Typography>
                  </MenuItem>
                ) : (
                  <Link to='/login' className="text-decoration-none">
                    <MenuItem>
                      <Typography textAlign="center" sx={{ color: "black" }}>Login</Typography>
                    </MenuItem>
                  </Link>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </section>
  );
};
export default Header;
