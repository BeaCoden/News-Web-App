import React from "react";
import Footer from "../../components/common/footer/Footer";
import { styled } from "../../styles/globalStyles";

// Container für die Contact-Seite
const ContactContainer = styled("div", {
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

//TODO - Kontakt-Seite erstellen mit Kontaktformular
const Contact = () => {
  return (
    <ContactContainer>
      <Title>Contact</Title>
      <Footer />
    </ContactContainer>
  );
};

export default Contact;
