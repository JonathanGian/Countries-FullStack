import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {  Close, Favorite, Lock } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { lightPalette, darkPalette } from "../Theme/theme";
import { FiMoon, FiSun } from "react-icons/fi";
export const Navigation = () => {
  const { toggleColorMode } = useContext(ThemeContext);
  const { user, signOut } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const theme = useTheme();

  const mode = theme.palette.mode;

  return (
    <>
      <AppBar
        role="banner"
        aria-label="navigation"
        position="sticky"
        sx={{
          background:
            mode === "dark"
              ? darkPalette.custom.darkGradient
              : lightPalette.custom.lightGradient,
          color: "#000",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          top: 0,
          zIndex: (theme) => theme.zIndex.drawer + 10,
        }}
      >
        
        <Toolbar aria-label="navigation" role="navigation">
          {/* Left side navigation items */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Light/Dark mode */}
                   <FormControlLabel
                          control={
                            <Switch
                              checked={mode === "dark"}
                              onChange={toggleColorMode}
                              icon={<FiSun />}
                              checkedIcon={<FiMoon />}
                            />
                          }
                          label=""
                          aria-label="toggle-dark-mode"
                        />

            {/* Drawer Button */}
            <IconButton
              aria-label="menu"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            {/* Navigation Buttons */}
            <Button
              aria-label="home"
              color="inherit"
              component={RouterLink}
              to="/"
            >
              Home
            </Button>
            <Button
              aria-label="countries"
              color="inherit"
              component={RouterLink}
              to="/countries/all"
            >
              Countries
            </Button>
            {user && (
              <Button
                aria-label="favorites"
                color="inherit"
                component={RouterLink}
                to="/favorites"
                startIcon={<Favorite />}
              >
                Favorites
              </Button>
            )}
            <Button
              color="inherit"
              component={RouterLink}
              to="/protected"
              startIcon={<Lock />}
            >
              Protected Data
            </Button>
          </Box>
          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />
          {/* Right side: User avatar or login */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {user ? (
              <>
                <Avatar
                  src={user.user_metadata.avatar_url || undefined}
                  sx={{ width: 30, height: 30, cursor: "pointer" }}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  title="PROFILE"
                />
                <Menu
                  role="menu"
                  aria-label="user-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem
                    role="button"
                    component={RouterLink}
                    to="/profile"
                    onClick={() => setAnchorEl(null)}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    role="button"
                    onClick={() => {
                      setAnchorEl(null);
                      signOut();
                    }}
                  >
                    Logout ({user.email})
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                role="button"
                color="inherit"
                component={RouterLink}
                to="/login"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        transitionDuration={0}
        anchor="left"
        open={drawerOpen}
        role="navigation"
        aria-label="navigation"
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            mt: 8,
            backgroundImage: "linear-gradient(90deg, #2af598 0%, #009efd 100%)",
            color: "#000",
            borderRight: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            width: 250,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <IconButton onClick={() => toggleDrawer()}>
            <Close sx={{ color: "black" }} />
          </IconButton>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/">
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/test">
                <ListItemText primary="Test" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/countries/all">
                <ListItemText primary="Countries" />
              </ListItemButton>
            </ListItem>
            {user && (
              <ListItem disablePadding>
                <ListItemButton component={RouterLink} to="/favorites">
                  <ListItemText primary="Favorites" />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/protected">
                <ListItemText primary="Protected Data" />
              </ListItemButton>
            </ListItem>
            {user ? (
              <ListItem disablePadding>
                <ListItemButton onClick={signOut}>
                  <ListItemText primary={`Logout (${user.email})`} />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem disablePadding>
                <ListItemButton component={RouterLink} to="/login">
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
