import React, { createContext, useReducer, useEffect } from "react";

const ThemeContext = createContext();

const INITIAL_STATE = {
  darkMode: JSON.parse(localStorage.getItem("darkMode")) || true,
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return { darkMode: !state.darkMode };
    default:
      return state;
  }
};

const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, INITIAL_STATE);

  useEffect(() => {
    const root = document.documentElement;
    if (state.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
  }, [state.darkMode]);

  return <ThemeContext.Provider value={{ state, dispatch }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
