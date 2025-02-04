import React from "react";
import Footer from "../../components/common/footer/Footer";
import { styled } from "../../styles/globalStyles";

// Container für die About-Seite
const AboutContainer = styled("div", {
  padding: "20px",
  gap: "20px",
  backgroundColor: "var(--color-background)",
  color: "var(--color-font)",
  transition: "background-color 0.3s ease, color 0.3s ease",
});

// Titel-Styling
const Title = styled("h1", {
  fontSize: "2rem",
  color: "var(--color-primary)",
});

//TODO - About-Seite erstellen
const About = () => {
  return (
    <AboutContainer>
      <Title>About</Title>
      <Footer />
    </AboutContainer>
  );
};

export default About;
