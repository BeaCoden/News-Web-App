// components/specific/breakingNews/BreakingNewsCarousel.js
import React from "react";
import { styled, keyframes } from "../../../styles/globalStyles"; // keyframes aus deinen globalen Styles
import NewsCard from "../newsCard/NewsCard"; // passe den Pfad ggf. an

// Keyframes: Der Container wird von 0 bis -50% animiert.
const marquee = keyframes({
  "0%": { transform: "translateX(0)" },
  "100%": { transform: "translateX(-50%)" },
});

// CarouselWrapper: Umschließt das Carousel, blendet den Überlauf aus und fügt pseudo-Overlays hinzu.
const CarouselWrapper = styled("div", {
  position: "relative",
  overflow: "hidden",
  width: "100%",
  padding: "20px 0",
  // Pseudo-Element links: Gradient, der den linken Rand abdeckt (leicht geblurt)
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    width: "10%",
    height: "100%",
    background: "linear-gradient(to right, rgba(0,0,0,0.8), transparent)",
    pointerEvents: "none",
    zIndex: 2,
  },
  // Pseudo-Element rechts: Gradient, der den rechten Rand abdeckt (leicht geblurt)
  "&::after": {
    content: '""',
    position: "absolute",
    right: 0,
    top: 0,
    width: "10%",
    height: "100%",
    background: "linear-gradient(to left, rgba(0,0,0,0.8), transparent)",
    pointerEvents: "none",
    zIndex: 2,
  },
});

// Überschrift für den Carousel-Bereich
const CarouselHeading = styled("h2", {
  textAlign: "center",
  marginBottom: "10px",
  fontSize: "1.5rem",
});

// CarouselContent: Enthält alle Items, hat einen definierten Gap und läuft per Keyframe-Animation.
// Durch animationDirection: "reverse" scrollt er von links nach rechts.
const CarouselContent = styled("div", {
  display: "flex",
  gap: "20px", // Abstand zwischen den Items
  width: "200%", // Da wir die News duplizieren
  animation: `${marquee} 20s linear infinite`,
  animationDirection: "reverse",
  "&:hover": {
    animationPlayState: "paused",
  },
});

// Jedes Carousel-Item (flex-basiert)
const CarouselItem = styled("div", {
  flex: "0 0 auto",
});

// Wrapper, der die NewsCard in eine fixe, responsive Breite setzt.
const ItemWrapper = styled("div", {
  width: "300px", // Standard: Smartphones
  "@media (min-width: 768px)": {
    width: "400px", // Tablets
  },
  "@media (min-width: 1024px)": {
    width: "500px", // Laptops und größere
  },
});

const BreakingNewsCarousel = ({ news }) => {
  // Dupliziere die News-Daten, damit der Übergang nahtlos wirkt.
  const duplicatedNews = [...news, ...news];

  return (
    <CarouselWrapper>
      <CarouselHeading>🔥 Breaking News</CarouselHeading>
      <CarouselContent>
        {duplicatedNews.map((article, index) => (
          <CarouselItem key={index}>
            <ItemWrapper>
              <NewsCard
                title={article.title}
                description={article.description}
                urlToImage={article.urlToImage}
                url={article.url}
              />
            </ItemWrapper>
          </CarouselItem>
        ))}
      </CarouselContent>
    </CarouselWrapper>
  );
};

export default BreakingNewsCarousel;
