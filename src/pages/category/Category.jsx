import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "../../styles/globalStyles";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const categories = [
  { id: "business", label: "Business" },
  { id: "entertainment", label: "Entertainment" },
  { id: "general", label: "General" },
  { id: "health", label: "Health" },
  { id: "science", label: "Science" },
  { id: "sports", label: "Sports" },
  { id: "technology", label: "Technology" },
];

// Stitches Styled Components
const CategoryContainer = styled("div", {
  maxWidth: "1200px",
  margin: "auto",
  padding: "20px",
  backgroundColor: "var(--color-background)",
});

const Title = styled("h1", {
  fontSize: "2rem",
  color: "var(--color-primary)",
  textAlign: "center",
});

const SearchContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  margin: "20px 0",
  width: "100%",
  maxWidth: "600px",
  border: "2px solid var(--color-primary)",
  borderRadius: "5px",
  overflow: "hidden",
  backgroundColor: "var(--color-background)",
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
  border: "none",
  outline: "none",
  "&::placeholder": {
    color: "var(--color-secondary)",
  },
});

const CategoryButton = styled("button", {
  backgroundColor: "var(--color-button)",
  color: "white",
  padding: "10px 15px",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "var(--color-buttonHover)",
  },
});

const NewsCard = styled(motion.div, {
  backgroundColor: "var(--color-background)",
  color: "var(--color-font)",
  padding: "15px",
  margin: "10px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("");

  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?category=${selectedCategory}&country=us&apiKey=${apiKey}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get(url);
        setNews(data.articles);
      } catch (error) {
        console.error("Fehler beim Laden der News:", error);
      }
    };
    fetchNews();
  }, [selectedCategory, url]);

  return (
    <CategoryContainer>
      <Title>News aus der Kategorie: {selectedCategory.toUpperCase()}</Title>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Suche nach Schlagzeilen..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <CategoryButton onClick={() => setQuery("")}>
          <Search />
        </CategoryButton>
      </SearchContainer>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
        {categories.map((cat) => (
          <CategoryButton
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}>
            {cat.label}
          </CategoryButton>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        {news
          .filter((article) => article.title.toLowerCase().includes(query.toLowerCase()))
          .map((article, index) => (
            <NewsCard
              key={index}
              whileHover={{ scale: 1.05 }}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer">
                Mehr lesen
              </a>
            </NewsCard>
          ))}
      </div>
    </CategoryContainer>
  );
};

export default CategoryPage;
