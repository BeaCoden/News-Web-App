// components/specific/breakingNews/breakingNews.js
import React, { useState, useEffect, useRef } from "react";
import { styled } from "../../../styles/globalStyles";

// Der Wrapper sorgt dafür, dass horizontales Scrollen unterbunden wird.
const SectionWrapper = styled("div", {
  width: "100%",
  padding: "20px 0",
  overflowX: "hidden", // Verhindert horizontales Scrollen
});

// Überschrift
const Title = styled("h2", {
  marginBottom: "20px",
});

// Container für jeden Artikel mit Swipe‑Effekt
const ArticleContainer = styled("div", {
  backgroundColor: "var(--color-secondary)",
  padding: "20px",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  marginBottom: "20px",
  borderRadius: "10px",
  position: "relative",
  transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
  // Starte mit einem moderaten Offset (z. B. 80px) nach rechts – so sieht man schon einen kleinen Versatz
  transform: "translateX(180px)",
  opacity: 0,
});

// Optionales Styling für das Artikelbild
const ArticleImage = styled("img", {
  width: "100%",
  height: "auto",
  borderRadius: "8px",
  marginBottom: "10px",
});

// Titel und Beschreibung des Artikels
const ArticleTitle = styled("h3", {
  margin: "0 0 10px 0",
});
const ArticleDescription = styled("p", {
  margin: 0,
});

const NewsArticle = ({ article }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            // Sobald der Artikel sichtbar ist, braucht er nicht weiter beobachtet zu werden
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
    <ArticleContainer
      ref={ref}
      style={{
        transform: visible ? "translateX(0)" : "translateX(80px)",
        opacity: visible ? 1 : 0,
      }}>
      {article.urlToImage && (
        <ArticleImage
          src={article.urlToImage}
          alt={article.title}
        />
      )}
      <ArticleTitle>{article.title}</ArticleTitle>
      <ArticleDescription>{article.description}</ArticleDescription>
    </ArticleContainer>
  );
};

const BreakingNews = ({ news }) => {
  return (
    <SectionWrapper>
      <Title>🔥 Breaking News</Title>
      {news.map((article, index) => (
        <NewsArticle
          key={index}
          article={article}
        />
      ))}
    </SectionWrapper>
  );
};

export default BreakingNews;
