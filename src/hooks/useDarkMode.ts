import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

function useDarkMode() {
  // initialize from localStorage or default to false
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>(
    "darkMode",
    false
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev: boolean) => !prev);
  };

  return { isDarkMode, toggleDarkMode };
}

export default useDarkMode;
