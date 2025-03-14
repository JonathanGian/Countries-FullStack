import { createContext } from "react";
import { ColorModeContextProps } from "./ThemeProvider";

type ThemeContextType = undefined;

export const ThemeContext = createContext<ThemeContextType>(undefined);

export const ColorModeContext = createContext<ColorModeContextProps>({
    toggleColorMode: () => {},


  });
  