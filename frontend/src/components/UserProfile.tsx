import { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Typography,
  Avatar,
  FormControlLabel,
  Switch,
  useTheme,
} from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";

import { FiMoon, FiSun } from "react-icons/fi";
const UserProfile = () => {
  // import { useAppSelector } from "../../store/hooks";
  // import { selectUser } from "../../store/slices/authSlice";
  const { user } = useAuth();
  const { toggleColorMode } = useContext(ThemeContext);

  const theme = useTheme();
  const mode = theme.palette.mode;
  console.log(mode);
  //   const user = useAppSelector(selectUser);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      {user ? (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            src={user.user_metadata.avatar_url || undefined}
            sx={{ width: 80, height: 80, mr: 2 }}
          />
          <Box>
            <Typography variant="h6">
              {user.user_metadata.full_name || user.email}
            </Typography>
            <Typography variant="body2">{user.email}</Typography>
            {/* Theme control */}
            <FormControlLabel
              control={
                <Switch
                  checked={mode === "dark"}
                  onChange={toggleColorMode}
                  icon={<FiSun />}
                  checkedIcon={<FiMoon />}
                />
              }
              label={mode === "dark" ? "Dark Mode" : "Light Mode"}
            />
          </Box>
        </Box>
      ) : (
        <Typography variant="body1">No user is logged in.</Typography>
      )}
    </Box>
  );
};

export default UserProfile;
