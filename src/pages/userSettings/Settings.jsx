import React from "react";
import Footer from "../../components/common/footer/Footer";
import { styled } from "../../styles/globalStyles";

// Container für die Settings-Seite
const SettingsContainer = styled("div", {
  padding: "20px",
  gap: "20px",

  transition: "background-color 0.3s ease, color 0.3s ease",

  variants: {
    darkMode: {
      true: { backgroundColor: "#121212", color: "#ffffff" },
      false: { backgroundColor: "$background", color: "$font" },
    },
  },
});

// Titel-Styling
const Title = styled("h1", {
  fontSize: "2rem",
  color: "$primary",
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
