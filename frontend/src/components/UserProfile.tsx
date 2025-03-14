import { useAuth } from "../context/AuthContext";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { useColorMode } from "../theme/ColorModeHook";


const UserProfile = () => {
// import { useAppSelector } from "../../store/hooks";
// import { selectUser } from "../../store/slices/authSlice";
const { user } = useAuth();
console.log(user)
  const { toggleColorMode } = useColorMode();
//   const user = useAppSelector(selectUser);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      {user ? (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            src={user.user_metadata.avatar_url|| undefined}
            sx={{ width: 80, height: 80, mr: 2 }}
          />
          <Box>
            <Typography variant="h6">{ user.user_metadata.full_name ||  user.email}</Typography>
            <Typography variant="body2">{user.email}</Typography>
          </Box>
        </Box>
      ) : (
        <Typography variant="body1">No user is logged in.</Typography>
      )}
      <Button variant="outlined" onClick={toggleColorMode}>
        Toggle Dark/Light Mode
      </Button>
    </Box>
  );
};

export default UserProfile;