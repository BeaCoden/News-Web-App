import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/common/footer/Footer";
import Slider from "../../components/common/slider/Slider";
import Spinner from "../../components/common/spinner/Spinner";
import NewsCard from "../../components/specific/newsCard/NewsCard";
import { styled } from "../../styles/globalStyles";
import { Search } from "lucide-react";

// **Gesamter Seiten-Container**
const Container = styled("div", {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "1400px",
  margin: "10px auto",
  zIndex: 1,
  gap: "20px",
});

// **Suchleiste Styling**
const SearchContainer = styled("div", {
  margin: "10px 0",
  width: "100%",
  maxWidth: "600px",
  display: "flex",
  alignItems: "center",
  border: "2px solid var(--color-primary)",
  borderRadius: "5px",
  overflow: "hidden",
  backgroundColor: "var(--color-background)",
  transition: "border 0.3s ease, box-shadow 0.3s ease",

  "&:focus-within": {
    border: "2px solid var(--color-buttonHover)",
    boxShadow: "0px 0px 8px var(--color-buttonHover)",
  },
});

const SearchInput = styled("input", {
  flex: 1,
  padding: "10px",
  fontSize: "1rem",
  color: "var(--color-font)",
  backgroundColor: "var(--color-background)",
  border: "none",
  outline: "none",

  "&::placeholder": {
    color: "var(--color-secondary)",
  },
});

const SearchButton = styled("button", {
  backgroundColor: "var(--color-button)",
  border: "none",
  padding: "10px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    backgroundColor: "var(--color-buttonHover)",
  },
});

const SearchIcon = styled(Search, {
  color: "var(--color-font)",
  width: "20px",
  height: "20px",
});

// **Breaking News Section (Slider)**
const BreakingNewsSection = styled("div", {
  width: "100%",
  backgroundColor: "var(--color-secondary)",
  padding: "20px",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  marginBottom: "20px",
  borderRadius: "10px",
  position: "relative",
  zIndex: 1,

  "@media (max-width: 1024px)": {
    padding: "15px",
  },
});

// **News Grid Styling**
const NewsGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
  width: "100%",
});

// **Wrapper für News-Bereich**
const ContentWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
  width: "100%",
  marginTop: "20px",
  position: "relative",
  zIndex: 0,

  "@media (max-width: 1024px)": {
    gridTemplateColumns: "1fr",
  },
});

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(""); // Speichert den Suchtext
  const [searchResults, setSearchResults] = useState([]); // Speichert die Suchergebnisse

  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(url);
        setNews(data.articles);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [url]); // 🔹 `url` jetzt als Dependency hinzugefügt

  // **Funktion zur Verarbeitung der Suche**
  const fetchSearchResults = async () => {
    if (query.trim() === "") return; // Keine leere Suche absenden

    const searchUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    try {
      const { data } = await axios.get(searchUrl);
      setSearchResults(data.articles);
    } catch (error) {
      console.error("Fehler beim Abrufen der Suchergebnisse:", error);
    }
  };

  // **Suchtaste oder Enter-Taste löst Suche aus**
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchSearchResults();
    }
  };

  return (
    <Container>
      {/* 📌 Suchleiste mit Lupen-Button */}
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="searching for news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
        <SearchButton onClick={fetchSearchResults}>
          <SearchIcon />
        </SearchButton>
      </SearchContainer>

      {/* 📌 Breaking News Bereich mit Slider */}
      <BreakingNewsSection>
        <h2>🔥 Breaking News</h2>
        <Slider sliderNews={news.slice(0, 5)} />
      </BreakingNewsSection>

      {/* 📌 Haupt-News-Bereich */}
      <h1>Latest News</h1>
      <ContentWrapper>
        <NewsGrid>
          {loading ? (
            <Spinner />
          ) : query && searchResults.length > 0 ? (
            searchResults.map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                description={article.description}
                urlToImage={article.urlToImage}
                url={article.url}
              />
            ))
          ) : query && searchResults.length === 0 ? (
            <p>Keine Ergebnisse gefunden...</p>
          ) : (
            news.slice(5).map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                description={article.description}
                urlToImage={article.urlToImage}
                url={article.url}
              />
            ))
          )}
        </NewsGrid>
      </ContentWrapper>

      <Footer />
    </Container>
  );
};

export default Home;
