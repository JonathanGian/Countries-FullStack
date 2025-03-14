// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import { IconButton, Tooltip, useTheme } from "@mui/material";
// import { useAppTheme } from "./themeContext";

// export function ThemeToggle() {
//   const { theme, toggleTheme } = useAppTheme();
//   const muiTheme = useTheme();

//   return (
//     <Tooltip title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
//       <IconButton
//         onClick={toggleTheme}
//         color="inherit"
//         sx={{
//           color: theme === "dark" ? "#fff" : "rgba(0, 0, 0, 0.7)",
//           transition: muiTheme.transitions.create(["transform", "color"], {
//             duration: muiTheme.transitions.duration.shorter,
//           }),
//           "&:hover": {
//             color: muiTheme.palette.primary.main,
//             transform: "scale(1.1)",
//           },
//         }}
//       >
//         {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
//       </IconButton>
//     </Tooltip>
//   );
// }