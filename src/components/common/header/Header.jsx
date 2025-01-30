import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import ChangeTheme from "../../specific/theme/ChangeTheme";
import styles from "./Header.module.css";
import newsEarth from "../../../assets/gifs/newsEarth.gif";
import { ThemeContext } from "../../../contexts/ThemeContext";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { state } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search", { state: search });
    setSearch("");
  };

  return (
    <div className={`${styles.container} ${state.darkMode ? styles.dark : styles.light}`}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <img
            onClick={() => navigate("/")}
            src={newsEarth}
            alt="Globe"
            className={styles.newsEarthGIF}
          />
          <h1
            onClick={() => navigate("/")}
            className={styles.heading}>
            <em>news</em>
          </h1>
        </div>
        <ChangeTheme />
      </div>
      <div className={styles.searchContainer}>
        <form
          onSubmit={handleSubmit}
          className={styles["search-bar"]}>
          <div className={styles["input-wrapper"]}>
            <input
              type="search"
              name="search"
              pattern=".*\S.*"
              required
              className={`${styles.search} ${styles["search-input"]}`}
              value={search}
              placeholder="Search your news..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className={styles["search-btn"]}>
              🔍
            </button>
          </div>
        </form>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
