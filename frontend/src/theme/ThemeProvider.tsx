import React, { useState, useMemo, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  PaletteMode,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "./themeContext";
// Optionally, augment the MUI Theme type (usually in a separate file, e.g., theme.d.ts)
declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      gradient: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    custom?: {
      gradient?: string;
    };
  }
}

export interface ColorModeContextProps {
  toggleColorMode: () => void;
}

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const storedMode = localStorage.getItem("themeMode") as PaletteMode | null;
  const [mode, setMode] = useState<PaletteMode>(storedMode || "light");

  // Saving color mode in local storage

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("themeMode", newMode);
          return newMode;
        });
      },
    }),
    [],
  );
  

  
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
          },
          secondary: {
            main: '#9c27b0',
            light: '#ba68c8',
            dark: '#7b1fa2',
          },
        },
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),
          h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
          },
          h2: {
            fontSize: '2rem',
            fontWeight: 600,
          },
          h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
          },
          body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
          },
          button: {
            textTransform: 'none',
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              },
            },
          },
        },
        custom: {
          // Define your gradient here
          gradient: "linear-gradient(45deg, #FE6B8B, #FF8E53)",
        },
      }),
    [mode],
  );
  // Syncing the color mode if it changes in another tab
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "themeMode" && event.newValue) {
        setMode(event.newValue as PaletteMode);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  // Listen for when the page becomes visible and update mode from localStorage
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const storedMode = localStorage.getItem(
          "themeMode",
        ) as PaletteMode | null;
        if (storedMode && storedMode !== mode) {
          setMode(storedMode);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
};
