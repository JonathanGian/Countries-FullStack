import { useContext } from "react";
import { ColorModeContext } from "./themeContext";

export const useColorMode = () => useContext(ColorModeContext);