import React, { useContext } from "react";
import { styled } from "../../../styles/globalStyles";
import noImage from "../../../assets/img/noImage.jpg";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Button from "../../common/button/Button";

// Card: Umfasst den gesamten Inhalt (Medienbereich + externer Link)
const Card = styled("div", {
  background: "$background",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  transition: "transform 0.2s ease-in-out",
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

// CardMedia: Bereich für Bild und Overlays
const CardMedia = styled("div", {
  position: "relative",
  width: "100%",
  height: "200px",
  overflow: "hidden",
  cursor: "pointer",
  // Beim Hover wird das TitleOverlay ausgeblendet und das DescriptionOverlay eingeblendet
  "&:hover .descriptionOverlay": {
    opacity: 1,
  },
  "&:hover .titleOverlay": {
    opacity: 0,
  },
});

// Das Bild – füllt den gesamten Medienbereich aus
const Image = styled("img", {
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

// TitleOverlay: Am unteren Rand des Bildes, mit linearem Verlauf für bessere Lesbarkeit
const TitleOverlay = styled("div", {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  padding: "10px",
  background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
  color: "#fff",
  transition: "opacity 0.3s ease",
  opacity: 1,
});

// DescriptionOverlay: Bedeckt den gesamten Medienbereich; zeigt die Beschreibung (auf 3 Zeilen gekürzt) und den Button
const DescriptionOverlay = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  padding: "10px",
  background: "rgba(0,0,0,0.8)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  transition: "opacity 0.3s ease",
  opacity: 0,
});

// DescriptionText: Zeigt maximal 3 Zeilen an, überschüssiger Text wird abgeschnitten
const DescriptionText = styled("p", {
  margin: 0,
  fontSize: "0.85rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
});

// Externer Link-Button (führt zur vollständigen Artikelseite)
const ExternalLinkButton = styled(Button, {
  marginTop: "10px",
  padding: "5px 10px",
  fontSize: "0.75rem",
});

const NewsCard = ({ title, description, urlToImage, url }) => {
  const theme = useContext(ThemeContext);
  if (!theme) return null;

  return (
    <Card darkMode={theme.darkMode}>
      <CardMedia>
        <Image
          src={urlToImage ? urlToImage : noImage}
          alt="news"
        />
        <TitleOverlay className="titleOverlay">
          <h2 style={{ margin: 0, fontSize: "1rem" }}>{title}</h2>
        </TitleOverlay>
        <DescriptionOverlay className="descriptionOverlay">
          <DescriptionText>{description}</DescriptionText>
          <ExternalLinkButton
            as="a"
            href={url}
            target="_blank">
            Go to Article
          </ExternalLinkButton>
        </DescriptionOverlay>
      </CardMedia>
    </Card>
  );
};

export default NewsCard;
