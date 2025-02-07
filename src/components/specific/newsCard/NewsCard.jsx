import { useContext } from "react";
import { styled } from "../../../styles/globalStyles";
import noImage from "../../../assets/img/noImage.jpg";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Button from "../../common/button/Button";

const Card = styled("div", {
  width: "100%",
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

const CardMedia = styled("div", {
  position: "relative",
  width: "100%",
  height: "200px",
  overflow: "hidden",
  cursor: "pointer",
  "&:hover .descriptionOverlay": {
    opacity: 1,
  },
  "&:hover .titleOverlay": {
    opacity: 0,
  },
  "@media (min-width: 768px)": {
    height: "250px",
  },
  "@media (min-width: 1024px)": {
    height: "300px",
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
  background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
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
