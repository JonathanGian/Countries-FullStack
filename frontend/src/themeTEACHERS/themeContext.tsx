// import CssBaseline from "@mui/material/CssBaseline";
// import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
// import { useTheme } from "next-themes";
// import { createContext, useContext, useEffect, useState } from "react";
// import { createAppTheme } from "./theme";

// type ThemeContextType = {
//   theme: "light" | "dark";
//   setTheme: (theme: "light" | "dark") => void;
//   toggleTheme: () => void;
// };

// export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const AppThemeProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const { theme: nextTheme, setTheme } = useTheme();
//   const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

//   useEffect(() => {
//     // Sync the theme with next-themes
//     if (nextTheme === "light" || nextTheme === "dark") {
//       setCurrentTheme(nextTheme);
//     }
//   }, [nextTheme]);

//   const toggleTheme = () => {
//     setTheme(currentTheme === "dark" ? "light" : "dark");
//   };

//   // Create MUI theme based on current theme
//   const muiTheme = createAppTheme(currentTheme);

//   return (
//     <ThemeContext.Provider
//       value={{
//         theme: currentTheme,
//         setTheme,
//         toggleTheme,
//       }}
//     >
//       <MUIThemeProvider theme={muiTheme}>
//         <CssBaseline />
//         {children}
//       </MUIThemeProvider>
//     </ThemeContext.Provider>
//   );
// };

// export const useAppTheme = () => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error("useAppTheme must be used within an AppThemeProvider");
//   }
//   return context;
// };