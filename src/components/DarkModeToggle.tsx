import React from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { Sun, Moon } from "lucide-react";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-white-dark dark:bg-background"
    >
      {darkMode ? <Moon /> : <Sun color="#ffffff" />}
    </button>
  );
};

export default DarkModeToggle;
