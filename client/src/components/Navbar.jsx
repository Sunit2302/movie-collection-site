import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  IconButton,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Make sure the path is correct
import MenuIcon from "@mui/icons-material/Menu"; // Import Menu Icon for mobile
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const { logout, user } = useAuth(); // Get user, logout, and isAdmin functions
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    if (logout) {
      logout(); // Only call logout if it's available
    }
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ backgroundColor: "orange" }}>
        {/* Menu Icon for Mobile View */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ display: { sm: "none" } ,backgroundColor: "orange" }} // Hide on larger screens
        >
          <MenuIcon />
        </IconButton>

        {/* App Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Movie App
        </Typography>

        {/* Desktop Navbar links */}
        <Box sx={{ display: { xs: "none", sm: "block" }}}>
          {user.role === "user" && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/home"
                startIcon={<HomeIcon />}
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/search"
                startIcon={<SearchIcon />}
              >
                Search
              </Button>
            </>
          )}
          {user.role === "admin" && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/add"
                startIcon={<AddCircleIcon />}
              >
                Add Movie
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/edit"
                startIcon={<EditIcon />}
              >
                Edit Movie
              </Button>
            </>
          )}
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{ textTransform: "none" }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ padding: 2 }}>
            {user.role === "user" && (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/home"
                  fullWidth
                  startIcon={<HomeIcon />}
                >
                  Home
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/search"
                  fullWidth
                  startIcon={<SearchIcon />}
                >
                  Search
                </Button>
              </>
            )}
            {user.role === "admin" && (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/add"
                  fullWidth
                  startIcon={<AddCircleIcon />}
                >
                  Add Movie
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/edit"
                  fullWidth
                  startIcon={<EditIcon />}
                >
                  Edit Movie
                </Button>
              </>
            )}
            <Divider sx={{ my: 1 }} />
            <Button
              color="inherit"
              onClick={handleLogout}
              fullWidth
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
