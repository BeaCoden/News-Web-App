// components/specific/breakingNews/BreakingNewsCarousel.js
import React, { useState, useEffect, useRef } from "react";
import { styled } from "../../../styles/globalStyles";
import NewsCard from "../newsCard/NewsCard";

// Wrapper, der das Carousel umschließt und den Überlauf ausblendet
const CarouselWrapper = styled("div", {
  position: "relative",
  overflow: "hidden",
  width: "100%",
  // Die Höhe sollte zur Höhe deiner NewsCard passen; NewsCards definieren ihre Höhe selbst
});

// Container, der alle Carousel-Items nebeneinander anordnet
const CarouselContainer = styled("div", {
  display: "flex",
  transition: "transform 0.6s ease-in-out",
});

// Einzelnes Carousel-Item – hier nimmt jedes Item 100% der Breite des Wrappers ein
const CarouselItem = styled("div", {
  flex: "0 0 100%",
  maxWidth: "100%",
});

const BreakingNewsCarousel = ({ news }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Auto-Play: Wechsle alle 3 Sekunden zum nächsten Artikel (außer wenn pausiert)
  useEffect(() => {
    if (!isPaused && news.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, news.length]);

  // Bei MouseEnter wird das Auto-Play angehalten
  const handleMouseEnter = () => {
    setIsPaused(true);
    clearInterval(intervalRef.current);
  };

  // Bei MouseLeave wird das Auto-Play fortgesetzt
  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <CarouselWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <CarouselContainer style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {news.map((article, index) => (
          <CarouselItem key={index}>
            <NewsCard
              title={article.title}
              description={article.description}
              urlToImage={article.urlToImage}
              url={article.url}
            />
          </CarouselItem>
        ))}
      </CarouselContainer>
    </CarouselWrapper>
  );
};

export default BreakingNewsCarousel;
