import React from "react";
import Footer from "../../components/common/footer/Footer";
import { styled } from "../../styles/globalStyles";

const WeatherContainer = styled("div", {
  minHeight: "100vh",
  padding: "20px",
  backgroundColor: "var(--color-background)",
  color: "var(--color-font)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.3s ease, color 0.3s ease",
});

const WeatherCard = styled("div", {
  backgroundColor: "var(--color-secondary)",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  width: "300px",
});

const Title = styled("h1", {
  fontSize: "1.8rem",
  color: "var(--color-primary)",
  marginBottom: "10px",
});

//FIXME - Wetterdaten einbinden aus API
const Weather = () => {
  return (
    <WeatherContainer>
      <Title>🌤 Wetter</Title>
      <WeatherCard>
        <h2>Stadtname</h2>
        <p>Wetterbeschreibung</p>
        <h3>🌡 25°C</h3>
        <p>💨 Wind: 5 m/s</p>
      </WeatherCard>
      <Footer />
    </WeatherContainer>
  );
};

export default Weather;
