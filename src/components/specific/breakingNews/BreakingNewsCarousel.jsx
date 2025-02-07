import { styled, keyframes } from "../../../styles/globalStyles";
import NewsCard from "../newsCard/NewsCard";

const marquee = keyframes({
  "0%": { transform: "translateX(0%)" },
  "100%": { transform: "translateX(-100%)" },
});

const CarouselWrapper = styled("div", {
  position: "relative",
  overflow: "hidden",
  width: "100%",
  margin: "0",
});

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
      <MarqueeContainer>
        <MarqueeText>🔥 Breaking News 🔥 Breaking News 🔥 Breaking News 🔥 Breaking News 🔥</MarqueeText>
        <MarqueeText>Breaking News 🔥 Breaking News 🔥 Breaking News 🔥 Breaking News 🔥</MarqueeText>
      </MarqueeContainer>

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
