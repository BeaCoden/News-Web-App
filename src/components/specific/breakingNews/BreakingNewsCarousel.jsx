import React from "react";
import { styled, keyframes } from "../../../styles/globalStyles";
import NewsCard from "../newsCard/NewsCard";

/* 🚀 Animations-Logik für fließenden, endlosen Lauf */
const marquee = keyframes({
  "0%": { transform: "translateX(0%)" },
  "100%": { transform: "translateX(-100%)" },
});

/* Wrapper für das gesamte Carousel */
const CarouselWrapper = styled("div", {
  position: "relative",
  overflow: "hidden",
  width: "100%",
  margin: "0",
});

/* 🔥 Endlos animierter Breaking News Text */
const MarqueeContainer = styled("div", {
  width: "100%",
  overflow: "hidden",
  backgroundColor: "var(--color-secondary)",
  padding: "10px 0",
  position: "relative",
  display: "flex",
  whiteSpace: "nowrap",
});

const MarqueeText = styled("div", {
  display: "flex",
  gap: "50px",
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#FF4500",
  animation: `${marquee} 20s linear infinite`,
  flexShrink: 0,
  "&:hover": {
    animationPlayState: "paused",
  },
});

/* 🚀 Nahtlos animierter Carousel-Container */
const CarouselContent = styled("div", {
  display: "flex",
  flexWrap: "nowrap",
  width: "max-content",
  animation: `${marquee} 50s linear infinite`,
  "&:hover": {
    animationPlayState: "paused",
  },
  gap: "25px",
  marginTop: "5px",
});

/* Einzelne News-Kacheln */
const CarouselItem = styled("div", {
  flex: "0 0 auto",
});

const ItemWrapper = styled("div", {
  width: "300px",
  "@media (min-width: 768px)": {
    width: "400px",
  },
  "@media (min-width: 1024px)": {
    width: "500px",
  },
});

const BreakingNewsCarousel = ({ news }) => {
  /* 🔄 Verdoppelung der Inhalte für eine nahtlose Endlos-Animation */
  const duplicatedNews = [...news, ...news];

  return (
    <CarouselWrapper>
      {/* 🔥 Animierter Text für Breaking News */}
      <MarqueeContainer>
        <MarqueeText>🔥 Breaking News 🔥 Breaking News 🔥 Breaking News 🔥 Breaking News 🔥</MarqueeText>
        {/* ❗ Verdoppelt für nahtlose Animation */}
        <MarqueeText>Breaking News 🔥 Breaking News 🔥 Breaking News 🔥 Breaking News 🔥</MarqueeText>
      </MarqueeContainer>

      {/* 📰 Animiertes News Carousel */}
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
