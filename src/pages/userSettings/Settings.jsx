import React from "react";
import Footer from "../../components/common/footer/Footer";
import { styled } from "../../styles/globalStyles";

// Container für die Settings-Seite
const SettingsContainer = styled("div", {
  padding: "20px",
  gap: "20px",
  backgroundColor: "var(--color-background)", // Dynamisch durch Theme gesteuert
  color: "var(--color-font)", // Dynamisch durch Theme gesteuert
  transition: "background-color 0.3s ease, color 0.3s ease",
});

// Titel-Styling
const Title = styled("h1", {
  fontSize: "2rem",
  color: "var(--color-primary)", // Globale Farbe für Konsistenz
});

const Settings = () => {
  return (
    <SettingsContainer>
      <Title>Settings</Title>
      <Footer />
    </SettingsContainer>
  );
};

export default Settings;
