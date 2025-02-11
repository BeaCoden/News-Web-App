import React, { useEffect, useState } from "react";
import { styled } from "../../styles/globalStyles";
import NewsCard from "../../components/specific/newsCard/NewsCard";
import axios from "axios";
import { motion } from "framer-motion";
import Footer from "../../components/common/footer/Footer";

const filterOptions = [
  { id: "popular", label: "popularity", sortBy: "popularity" },
  { id: "relevancy", label: "relevancy", sortBy: "relevancy" },
  { id: "latest", label: "latest", sortBy: "publishedAt" },
];

const CategoryContainer = styled("div", {
  margin: "auto",
  padding: "20px",
  backgroundColor: "var(--color-background)",
});

const Title = styled("h1", {
  fontSize: "2rem",
  color: "var(--color-primary)",
  textAlign: "center",
  marginBottom: "20px",
});

const ControlsWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginBottom: "20px",
  "@media(min-width: 768px)": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const SearchInput = styled("input", {
  padding: "0.6rem 1rem",
  border: "2px solid var(--color-font)",
  borderRadius: "4px",
  fontSize: "1rem",
  width: "100%",
  "@media(min-width: 768px)": {
    width: "300px",
  },
});

const FilterContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
});

const FilterButton = styled(motion.button, {
  border: "2px solid var(--color-button)",
  backgroundColor: "transparent",
  color: "var(--color-font)",
  borderRadius: "4px",
  padding: "0.5rem 1rem",
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "var(--color-secondary)",
    color: "#fff",
  },
  variants: {
    active: {
      true: {
        backgroundColor: "var(--color-button)",
        color: "#fff",
      },
    },
  },
});

const NewsGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "20px",
  marginBottom: "50px",

  "@media (min-width: 768px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@media (min-width: 1024px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
});

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("popularity");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchArticles = async () => {
    try {
      setLoading(true);

      let endpoint = "";
      const params = { apiKey: apiKey };

      if (searchQuery) {
        endpoint = "https://newsapi.org/v2/everything";
        params.q = searchQuery;
        params.sortBy = selectedFilter;
      } else {
        endpoint = "https://newsapi.org/v2/top-headlines";
        params.country = "us";
        if (selectedCategory) {
          params.category = selectedCategory;
        }
      }

      const response = await axios.get(endpoint, { params });
      if (response.data && response.data.articles) {
        setArticles(response.data.articles);
      } else {
        setArticles([]);
      }
    } catch (error) {
      console.error("Error:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedFilter]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const delayDebounce = setTimeout(() => {
        fetchArticles();
      }, 600);
      return () => clearTimeout(delayDebounce);
    }
    if (searchQuery.length === 0) {
      fetchArticles();
    }
  }, [searchQuery]);

  const handleFilterClick = (sortId) => {
    setSelectedFilter(sortId);
  };

  return (
    <CategoryContainer>
      <Title>Categories</Title>
      <ControlsWrapper>
        <SearchInput
          type="text"
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <FilterContainer>
          {filterOptions.map((f) => (
            <FilterButton
              key={f.id}
              onClick={() => handleFilterClick(f.sortBy)}
              active={selectedFilter === f.sortBy ? true : false}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}>
              {f.label}
            </FilterButton>
          ))}
        </FilterContainer>
      </ControlsWrapper>

      <div style={{ marginBottom: "20px" }}>
        <br />
        <FilterContainer style={{ marginTop: "0.5rem" }}>
          {[
            { id: "business", label: "Business" },
            { id: "entertainment", label: "Entertainment" },
            { id: "general", label: "General" },
            { id: "health", label: "Health" },
            { id: "science", label: "Science" },
            { id: "sports", label: "Sports" },
            { id: "technology", label: "Technology" },
          ].map((cat) => (
            <FilterButton
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              active={selectedCategory === cat.id ? true : false}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}>
              {cat.label}
            </FilterButton>
          ))}
        </FilterContainer>
      </div>

      {loading && <p>Loading News</p>}

      {!loading && (
        <NewsGrid>
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}>
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

      {!loading && articles.length === 0 && <p>No search results, please try again.</p>}
      <Footer />
    </CategoryContainer>
  );
}

export default Categories;
