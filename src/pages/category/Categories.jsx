import React, { useEffect, useState } from "react";
import NewsCard from "../../components/specific/newsCard/NewsCard";
import Footer from "../../components/common/footer/Footer";
import axios from "axios";
import { styled } from "../../styles/globalStyles";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import Spinner from "../../components/common/spinner/Spinner";
import Button from "../../components/common/button/Button";

const filterOptions = [
  { id: "publishedAt", label: "Latest", sortBy: "publishedAt" },
  { id: "popularity", label: "Popularity", sortBy: "popularity" },
  { id: "relevancy", label: "Relevancy", sortBy: "relevancy" },
];

const categories = [
  { id: "", label: "All" },
  { id: "business", label: "Business" },
  { id: "entertainment", label: "Entertainment" },
  { id: "general", label: "General" },
  { id: "health", label: "Health" },
  { id: "science", label: "Science" },
  { id: "sports", label: "Sports" },
  { id: "technology", label: "Technology" },
];

const CategoryContainer = styled("div", {
  width: "100vw",
  minHeight: "100vh",
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
  "@media(min-width: 1024px)": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const SearchContainer = styled("div", {
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

const SearchButton = styled(Button, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
});

const FilterContainer = styled("div", {
  display: "flex",
  flexWrap: "nowrap",
  gap: "0.5rem",
  overflowX: "auto",
  paddingBottom: "5px",
  "&::-webkit-scrollbar": {
    height: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "var(--color-buttonHover)",
    borderRadius: "4px",
  },
});

const Dropdown = styled("select", {
  padding: "10px",
  fontSize: "1rem",
  border: "2px solid var(--color-button)",
  borderRadius: "5px",
  backgroundColor: "var(--color-background)",
  color: "var(--color-font)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "var(--color-secondary)",
    color: "#fff",
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
  const [selectedFilter, setSelectedFilter] = useState("publishedAt");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_API_KEY;

  const buildNewsApiUrl = () => {
    let baseUrl = "https://newsapi.org/v2/";
    baseUrl += searchQuery.trim().length === 0 ? "top-headlines" : "everything";

    const params = new URLSearchParams();
    params.set("apiKey", apiKey);
    if (selectedCategory && searchQuery.trim().length === 0) params.set("category", selectedCategory);
    if (searchQuery.trim().length === 0) params.set("country", "us");
    if (searchQuery.trim().length > 0) params.set("q", searchQuery.trim());
    if (baseUrl.includes("everything")) params.set("sortBy", selectedFilter);

    return `${baseUrl}?${params.toString()}`;
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const finalUrl = buildNewsApiUrl();
      const response = await axios.get(finalUrl);
      setArticles(response.data.articles || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, selectedFilter]);

  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const delayDebounce = setTimeout(() => {
        fetchArticles();
      }, 600);
      return () => clearTimeout(delayDebounce);
    }
    if (searchQuery.trim().length === 0) {
      fetchArticles();
    }
  }, [searchQuery]);

  return (
    <CategoryContainer>
      <Title>Categories</Title>

      <ControlsWrapper>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search in headlines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton onClick={fetchArticles}>
            <Search />
          </SearchButton>
        </SearchContainer>

        {/* Filter als Dropdown auf kleinen Screens, Buttons ab 1024px */}
        {window.innerWidth < 1024 ? (
          <Dropdown
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}>
            {filterOptions.map((f) => (
              <option
                key={f.id}
                value={f.sortBy}>
                {f.label}
              </option>
            ))}
          </Dropdown>
        ) : (
          <FilterContainer>
            {filterOptions.map((f) => (
              <Button
                key={f.id}
                onClick={() => setSelectedFilter(f.sortBy)}
                active={selectedFilter === f.sortBy}>
                {f.label}
              </Button>
            ))}
          </FilterContainer>
        )}
      </ControlsWrapper>

      <FilterContainer>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            active={selectedCategory === cat.id}>
            {cat.label}
          </Button>
        ))}
      </FilterContainer>

      {loading && <Spinner />}

      {!loading && (
        <NewsGrid>
          {articles.map((article, index) => (
            <NewsCard
              key={index}
              {...article}
            />
          ))}
        </NewsGrid>
      )}

      <Footer />
    </CategoryContainer>
  );
}

export default Categories;
