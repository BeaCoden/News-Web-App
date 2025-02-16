import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../common/footer/Footer";
import NewsCard from "../newsCard/NewsCard";
import { styled } from "../../../styles/globalStyles";
import { motion } from "framer-motion";

const Container = styled("div", {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "1400px",
  margin: "10px auto",
  zIndex: 0,
  gap: "20px",
});

const newsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const newsItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const NewsGrid = styled(motion.div, {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px",
  width: "100%",

  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
  },
});

const SkeletonCard = styled(motion.div, {
  width: "100%",
  height: "250px",
  borderRadius: "10px",
  background:
    "linear-gradient(90deg, rgba(200, 200, 200, 0.1) 25%, rgba(200, 200, 200, 0.3) 50%, rgba(200, 200, 200, 0.1) 75%)",
  backgroundSize: "200% 100%",
  animation: "loadingAnimation 1.5s infinite linear",

  "@keyframes loadingAnimation": {
    "0%": { backgroundPosition: "-200% 0" },
    "100%": { backgroundPosition: "200% 0" },
  },
});

const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;

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
      {loading ? (
        <NewsGrid>
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </NewsGrid>
      ) : (
        <NewsGrid
          variants={newsContainerVariants}
          initial="hidden"
          animate="visible">
          {news.slice(5).map((article, index) => (
            <motion.div
              key={index}
              variants={newsItemVariants}>
              <NewsCard
                title={article.title}
                description={article.description}
                urlToImage={article.urlToImage}
                url={article.url}
              />
            </motion.div>
          ))}
        </NewsGrid>
      )}
      <Footer />
    </Container>
  );
};

export default LatestNews;
