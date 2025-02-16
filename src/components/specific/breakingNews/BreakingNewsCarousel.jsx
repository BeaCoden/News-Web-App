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
  padding: "10px",
  backgroundColor: "var(--color-secondary)",
  zIndex: 2,
});

const CarouselContent = styled("div", {
  display: "flex",
  flexWrap: "nowrap",
  width: "max-content",
  animation: `${marquee} 70s linear infinite`,
  "&:hover": {
    animationPlayState: "paused",
  },
  gap: "25px",
  marginTop: "5px",
});

const CarouselItem = styled("div", {
  flex: "0 0 auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "5px",
  borderRadius: "10px",
  backgroundColor: "var(--color-primary)",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
  "@media (min-width: 768px)": {
    padding: "10px",
  },
  "@media (min-width: 1024px)": {
    padding: "15px",
  },
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

const blink = keyframes({
  "0%, 100%": { opacity: 0 },
  "50%": { opacity: 1 },
});

const CarouselTitle = styled("h2", {
  color: "$white",
  fontSize: "1.2rem",
  fontWeight: "bold",
  fontStyle: "italic",
  letterSpacing: "4px",
  textAlign: "center",
  textTransform: "uppercase",
  animation: `${blink} 2s ease-in-out infinite`,
  "@media (min-width: 768px)": {
    fontSize: "1.5rem",
  },
  "@media (min-width: 1024px)": {
    fontSize: "1.8rem",
  },
});

const BreakingNewsCarousel = ({ news }) => {
  const duplicatedNews = [...news, ...news];

  return (
    <CarouselWrapper>
      <CarouselTitle>Breaking News</CarouselTitle>
      <CarouselContent>
        {duplicatedNews.map((article, index) => (
          <div key={index}>
            <CarouselItem>
              <ItemWrapper>
                <NewsCard
                  title={article.title}
                  description={article.description}
                  urlToImage={article.urlToImage}
                  url={article.url}
                />
              </ItemWrapper>
            </CarouselItem>
          </div>
        ))}
      </CarouselContent>
    </CarouselWrapper>
  );
};

export default BreakingNewsCarousel;
