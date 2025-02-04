// components/common/newsCard/NewsCard.js
import React, { useContext } from "react";
import { styled } from "../../../styles/globalStyles";
import noImage from "../../../assets/img/noImage.jpg";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Button from "../../common/button/Button";

// Container für die News-Karte mit fester Mindesthöhe
const Card = styled("div", {
  background: "$background",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s ease-in-out",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  textAlign: "center",
  height: "100%",
  gap: "10px",

  "&:hover": {
    transform: "translateY(-5px)",
  },
  variants: {
    darkMode: {
      true: { background: "#343a40" },
      false: { background: "#ffffff" },
    },
  },
});

// Bild-Styling
const Image = styled("img", {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "8px",
  marginBottom: "15px",
});

// Titel-Styling
const Title = styled("h2", {
  fontSize: "1rem",
  marginBottom: "10px",
  color: "$primary",
  variants: {
    darkMode: {
      true: { color: "#fff" },
      false: { color: "$primary" },
    },
  },
});

// Beschreibung-Styling mit Truncation (max. 3 Zeilen)
const Description = styled("p", {
  fontSize: "0.85rem",
  marginBottom: "10px",
  color: "$secondary",
  variants: {
    darkMode: {
      true: { color: "#ccc" },
      false: { color: "$secondary" },
    },
  },
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
});

const NewsCard = ({ title, description, urlToImage, url }) => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    return null;
  }

  return (
    <Card darkMode={theme.darkMode}>
      <Image
        src={urlToImage ? urlToImage : noImage}
        alt="news"
      />
      <Title darkMode={theme.darkMode}>{title}</Title>
      <Description darkMode={theme.darkMode}>{description}</Description>
      <Button
        as="a"
        href={url}
        target="_blank">
        Read More
      </Button>
    </Card>
  );
};

export default NewsCard;
