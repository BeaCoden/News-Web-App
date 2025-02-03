// pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/common/footer/Footer";
import BreakingNews from "../../components/specific/breakingNews/breakingNews";
import { styled } from "../../styles/globalStyles";
import { Search } from "lucide-react";
import globusVideo from "../../assets/video/Globus.mp4";

// Hintergrundvideo (styled)
const BackgroundVideo = styled("video", {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  objectFit: "cover",
  zIndex: -1,
});

// Hauptcontainer der Seite
const Container = styled("div", {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "1400px",
  margin: "10px auto",
  zIndex: 1,
  gap: "20px",
  position: "relative",
});

// Styling der Suchleiste
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

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

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
  }, [url]);

  // Funktion zur Verarbeitung von Suchanfragen
  const fetchSearchResults = async () => {
    if (query.trim() === "") return;
    const searchUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    try {
      const { data } = await axios.get(searchUrl);
      setNews(data.articles);
    } catch (error) {
      console.error("Fehler beim Abrufen der Suchergebnisse:", error);
    }
  };

  // Suche über Enter-Taste oder Button
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchSearchResults();
    }
  };

  return (
    <>
      {/* Video-Hintergrund */}
      <BackgroundVideo
        autoPlay
        loop
        muted
        playsInline>
        <source
          src={globusVideo}
          type="video/mp4"
        />
        Dein Browser unterstützt keine Videos.
      </BackgroundVideo>

      <Container>
        {/* Suchleiste */}
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

        {/* Breaking News – Artikel wischen sanft von rechts herein */}
        <BreakingNews news={news} />

        <Footer />
      </Container>
    </>
  );
};

export default Home;
