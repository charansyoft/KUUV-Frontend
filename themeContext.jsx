// src/ThemeContext.js
import React, { createContext, useContext, useState } from "react";
import { themes } from "./theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("light");

  const changeTheme = (theme) => {
    if (themes[theme]) setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme: themes[currentTheme], changeTheme, currentTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
