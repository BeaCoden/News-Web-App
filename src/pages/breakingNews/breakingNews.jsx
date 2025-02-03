import React, { useState } from "react";
import Footer from "../../components/common/footer/Footer";
import Slider from "../../components/common/slider/Slider";
import { styled } from "../../styles/globalStyles";

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

const BreakingNews = () => {
  const [news] = useState([]);

  return (
    <Container>
      {/* 📌 Breaking News Bereich mit Slider */}
      <BreakingNewsSection>
        <h2>🔥 Breaking News</h2>
        <Slider sliderNews={news.slice(0, 5)} />
      </BreakingNewsSection>

      <Footer />
    </Container>
  );
};

export default BreakingNews;
