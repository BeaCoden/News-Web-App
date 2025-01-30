import React, { useContext } from "react";
import styles from "./NewsCard.module.css";
import noImage from "../../../assets/img/noImage.jpg";
import { ThemeContext } from "../../../contexts/ThemeContext";

const NewsCard = ({ title, description, urlToImage, url }) => {
  const { state } = useContext(ThemeContext);
  const cardClass = state.darkMode ? `${styles.newsCard} ${styles.darkMode}` : styles.newsCard;

  return (
    <div className={cardClass}>
      <img
        className={styles.image}
        src={urlToImage ? urlToImage : noImage}
        alt="news"
      />
      <h2>{title}</h2>
      <p>{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer">
        Read more ➡️
      </a>
    </div>
  );
};

export default NewsCard;
