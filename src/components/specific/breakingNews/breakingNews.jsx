import React, { useState, useEffect, useRef } from "react";
import { styled } from "../../../styles/globalStyles";
import NewsCard from "../newsCard/NewsCard";

const SectionWrapper = styled("div", {
  width: "100%",
  padding: "20px 0",
  overflowX: "hidden",
});

const Title = styled("h2", {
  marginBottom: "20px",
});

const GridContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gap: "20px",
  "@media(min-width: 768px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@media(min-width: 1024px)": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
});

const AnimatedWrapper = styled("div", {
  transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
  transform: "translateX(80px)",
  opacity: 0,
});

const AnimatedNewsCard = ({ article }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <AnimatedWrapper
      ref={ref}
      style={{
        transform: visible ? "translateX(0)" : "translateX(80px)",
        opacity: visible ? 1 : 0,
      }}>
      <NewsCard
        title={article.title}
        description={article.description}
        urlToImage={article.urlToImage}
        url={article.url}
      />
    </AnimatedWrapper>
  );
};

const BreakingNews = ({ news }) => {
  return (
    <SectionWrapper>
      <Title>🔥 Breaking News</Title>
      <GridContainer>
        {news.map((article, index) => (
          <AnimatedNewsCard
            key={index}
            article={article}
          />
        ))}
      </GridContainer>
    </SectionWrapper>
  );
};

export default BreakingNews;
