import { useContext } from "react";
import { styled } from "../../../styles/globalStyles";
import noImage from "../../../assets/img/noImage.jpg";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Button from "../../common/button/Button";

const Card = styled("div", {
  width: "100%",
  borderRadius: "8px",
  overflow: "hidden",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
});

const CardMedia = styled("div", {
  position: "relative",
  width: "100%",
  height: "140px",
  overflow: "hidden",
  cursor: "pointer",
  "&:hover .descriptionOverlay": {
    opacity: 1,
  },
  "&:hover .titleOverlay": {
    opacity: 0,
  },
  "@media (min-width: 768px)": {
    height: "180px",
  },
  "@media (min-width: 1024px)": {
    height: "200px",
  },
});

const Image = styled("img", {
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const TitleOverlay = styled("div", {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  padding: "10px",
  color: "#fff",
  transition: "opacity 0.3s ease",
  opacity: 1,
});

const DescriptionOverlay = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  padding: "10px",
  background: "rgba(2, 56, 117, 0.8)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  transition: "opacity 0.3s ease",
  opacity: 0,
});

const DescriptionText = styled("p", {
  margin: 0,
  fontSize: "0.85rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
});

const ExternalLinkButton = styled(Button, {
  marginTop: "10px",
  padding: "5px 10px",
  fontSize: "0.75rem",
  backgroundColor: "var(--color-button)",
  textDecoration: "none",
  color: "var(--color-font)",
  "&:hover": {
    backgroundColor: "var(--color-buttonHover)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
  "&:focus": {
    outline: "none",
  },
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
            ➡️ Go to Article
          </ExternalLinkButton>
        </DescriptionOverlay>
      </CardMedia>
    </Card>
  );
};

export default NewsCard;
