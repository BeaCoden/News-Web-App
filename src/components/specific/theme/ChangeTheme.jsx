import React, { useContext } from "react";
import styles from "./ChangeTheme.module.css";
import sun from "../../../assets/icons/sun.png";
import moon from "../../../assets/icons/moon.png";
import { ThemeContext } from "../../../contexts/ThemeContext";

const ChangeTheme = () => {
  const { state, dispatch } = useContext(ThemeContext);

  const handleClick = () => {
    dispatch({ type: "TOGGLE" });
  };

  return (
    <button
      onClick={handleClick}
      className={styles.themeButton}>
      <img
        src={state.darkMode ? sun : moon}
        alt={state.darkMode ? "Dark Mode" : "Light Mode"}
        className={styles.icon}
      />
    </button>
  );
};

export default ChangeTheme;
