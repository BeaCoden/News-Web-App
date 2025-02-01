import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/common/footer/Footer";
import Slider from "../../components/common/slider/Slider";
import Spinner from "../../components/common/spinner/Spinner";
import NewsCard from "../../components/specific/newsCard/NewsCard";
import { styled } from "../../styles/globalStyles";

// **Gesamter Seiten-Container**
const Container = styled("div", {
  paddingTop: "3rem",
  paddingBottom: "5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "1200px",
  margin: "0px auto",
  zIndex: 1,
});

// **Breaking News Section (Slider)**
const BreakingNewsSection = styled("div", {
  width: "100%",
  backgroundColor: "#f8f9fa",
  padding: "20px",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  marginBottom: "20px",
  borderRadius: "10px",
  position: "relative",
  zIndex: 1, // Sicherstellen, dass es unter der Navigation bleibt

  "@media (max-width: 1024px)": {
    padding: "15px",
  },
});

// **Titel für Breaking News**
const SectionTitle = styled("h2", {
  fontSize: "1.8rem",
  textAlign: "center",
  color: "#435585",
  marginBottom: "10px",

  "@media (max-width: 768px)": {
    fontSize: "1.5rem",
  },
});

// **Wrapper für News-Bereich**
const ContentWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: "2fr 3fr", // Slider = 2, News = 3
  gap: "20px",
  width: "100%",
  marginTop: "20px",
  position: "relative",
  zIndex: 0, // **Stellt sicher, dass News-Bereich unter Navbar bleibt**

  "@media (max-width: 1024px)": {
    gridTemplateColumns: "1fr", // 📌 Bei kleineren Screens untereinander
  },
});

// **News Grid Styling**
const NewsGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
});

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {/* 📌 Breaking News Bereich mit Slider */}
      <BreakingNewsSection>
        <SectionTitle>🔥 Breaking News</SectionTitle>
        <Slider sliderNews={news.slice(0, 5)} />
      </BreakingNewsSection>

      {/* 📌 Haupt-News-Bereich */}
      <h1>Latest News</h1>
      <ContentWrapper>
        <NewsGrid>
          {loading ? (
            <Spinner />
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
