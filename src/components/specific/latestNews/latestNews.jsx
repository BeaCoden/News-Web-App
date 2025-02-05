import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../common/footer/Footer";
import Spinner from "../../common/spinner/Spinner";
import NewsCard from "../newsCard/NewsCard";
import { styled } from "../../../styles/globalStyles";

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

const NewsGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
  width: "100%",
});

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

//FIXME - LatestNews-Komponente auf Home Seite einbinden
const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query] = useState("");
  const [searchResults] = useState([]);

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

  return (
    <Container>
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

export default LatestNews;
