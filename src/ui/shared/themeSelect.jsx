import { useColorScheme } from "react-native";
import { useState } from "react";
import { lightTheme, darkTheme } from "./theme";

export default function useTheme() {
  const system = useColorScheme(); // "light" or "dark"

  // "system" | "light" | "dark"
  const [themeName, setThemeName] = useState("system");

  const getTheme = () => {
    if (themeName === "light") return lightTheme;
    if (themeName === "dark") return darkTheme;
    return system === "dark" ? darkTheme : lightTheme;
  };

  return {
    theme: getTheme(),
    themeName,
    setThemeName,
  };
}
