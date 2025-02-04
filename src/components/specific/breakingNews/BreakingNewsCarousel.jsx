import React from "react";
import { styled, keyframes } from "../../../styles/globalStyles";
import NewsCard from "../newsCard/NewsCard";

const marquee = keyframes({
  "0%": { transform: "translateX(0)" },
  "100%": { transform: "translateX(-50%)" },
});

const CarouselWrapper = styled("div", {
  position: "relative",
  overflow: "hidden",
  width: "100%",
  padding: "20px 0",

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

const CarouselHeading = styled("h2", {
  textAlign: "center",
  marginBottom: "10px",
  fontSize: "1.5rem",
});

const CarouselContent = styled("div", {
  display: "flex",
  gap: "20px",
  width: "200%",
  animation: `${marquee} 20s linear infinite`,
  animationDirection: "reverse",
  "&:hover": {
    animationPlayState: "paused",
  },
});

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
