import React from "react";
import Footer from "../../components/common/footer/Footer";
import { styled } from "../../styles/globalStyles";

const SettingsContainer = styled("div", {
  padding: "20px",
  gap: "20px",
  backgroundColor: "var(--color-background)",
  color: "var(--color-font)",
  transition: "background-color 0.3s ease, color 0.3s ease",
});

const Title = styled("h1", {
  fontSize: "2rem",
  color: "var(--color-primary)",
});

//TODO - Einstellungen für den User hinzufügen (z. B. Dark Mode, Sprache, etc.)
const Settings = () => {
  return (
    <SettingsContainer>
      <Title>Settings</Title>
      <Footer />
    </SettingsContainer>
  );
};

export default Settings;
