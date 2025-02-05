import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import NewsCard from "../../components/specific/newsCard/NewsCard";
import useFetchNews from "../../hooks/useFetchNews";
import Spinner from "../../components/common/spinner/Spinner";
import { styled } from "../../styles/globalStyles";

const SearchContainer = styled("div", {
  minHeight: "100vh",
  padding: "20px",
  backgroundColor: "var(--color-background)",
  color: "var(--color-font)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "background-color 0.3s ease, color 0.3s ease",
});

const Title = styled("h1", {
  fontSize: "2rem",
  color: "var(--color-primary)",
  marginBottom: "10px",
});

const NewsGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
  width: "100%",
  maxWidth: "1200px",
  marginTop: "20px",
});

const MessageBox = styled("div", {
  backgroundColor: "var(--color-secondary)",
  padding: "15px",
  borderRadius: "8px",
  textAlign: "center",
  marginTop: "20px",
  width: "80%",
  maxWidth: "500px",
});

const ErrorText = styled("p", {
  color: "var(--color-font)",
  fontSize: "1rem",
  marginBottom: "10px",
});

const Button = styled("button", {
  backgroundColor: "var(--color-button)",
  color: "var(--color-font)",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",

  "&:hover": {
    backgroundColor: "var(--color-buttonHover)",
  },
});

//FIXME - Suchseite Design und Funktionalität verbessern (Ladeanimation, Fehlermeldungen, Filter, Nachrichten anzeigen)
const Search = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const prevQuery = useRef(state);

  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?q=${state}&apiKey=${apiKey}`;

  const { news, error } = useFetchNews(url);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && (news.length || error)) {
      setShowContent(true);
      console.log("search news data:", news);
    }
  }, [loading, news, error]);

  useEffect(() => {
    if (state !== prevQuery.current) {
      setLoading(true);
      setShowContent(false);
      prevQuery.current = state;
    }
  }, [state]);

  return (
    <SearchContainer>
      <Title>🔍 Suche: {state || "Alle Nachrichten"}</Title>

      {loading ? (
        <Spinner />
      ) : showContent && error ? (
        <MessageBox>
          <ErrorText>Keine Nachrichten gefunden.</ErrorText>
          <Button onClick={() => (window.location.href = "/")}>🔙 Zur Startseite</Button>
        </MessageBox>
      ) : showContent && !news.length ? (
        <MessageBox>
          <ErrorText>Keine Ergebnisse für die Suche gefunden.</ErrorText>
        </MessageBox>
      ) : (
        showContent && (
          <NewsGrid>
            {news.map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                description={article.description}
                urlToImage={article.urlToImage}
                url={article.url}
              />
            ))}
          </NewsGrid>
        )
      )}
    </SearchContainer>
  );
};

export default Search;
