import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import axios from 'axios'
// import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
// mui code start 
import './Dashboard.css'

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
// mui code end
const Dashboard = () => {


  const { user, logOut, admin } = useAuth();

  // drawer in mui 
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (

    <Box sx={{ display: 'flex', minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Yooda Hostel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

          <ListItem button >
            <Nav.Link as={NavLink} to="/dashboard" className="navlink" activeStyle={{ backgroundColor: "purple" }}>
              Dashboard
            </Nav.Link>
          </ListItem>

          <>




            <ListItem button >
              <Nav.Link as={NavLink} to="/dashboard/addnewstudent">
                Add New Student
              </Nav.Link>
            </ListItem>
            <ListItem button >
              <Nav.Link as={NavLink} to="/dashboard/addfood">
                Add Food
              </Nav.Link>
            </ListItem>
            {/* <ListItem button >
              <Nav.Link as={NavLink} to="/dashboard/allstudents">
                All Students
              </Nav.Link>
            </ListItem> */}
            <ListItem button >
              <Nav.Link as={NavLink} to="/dashboard/servefood">
                Serve Food
              </Nav.Link>
            </ListItem>


          </>

          {user.email ? (
            <>
              <ListItem button >
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  onClick={logOut}
                  className="border-0"
                >
                  {" "}
                  Sign Out
                </Nav.Link>
              </ListItem>
            </>
          ) : (
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
          )}


        </List>


      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          <Outlet></Outlet>
        </Typography>
      </Main>
    </Box>

  );
};

export default Dashboard;
