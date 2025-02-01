import React from "react";
import { Link } from "react-router-dom";
import { styled, keyframes } from "../../../styles/globalStyles";

// 🔥 Keyframe-Animationen für Rakete, Satellit & Erde
const floatRocket = keyframes({
  "0%": { opacity: 0, transform: "translate(-100vw, 100vh) rotate(0deg)" },
  "15%": { opacity: 1 },
  "50%": { transform: "translate(40vw, -40vh) rotate(0deg)" },
  "85%": { opacity: 1 },
  "100%": { opacity: 0, transform: "translate(100vw, -100vh) rotate(90deg)" },
});

const floatSatellite = keyframes({
  "0%": { opacity: 0, transform: "translate(100vw, -100vh) rotate(0deg)" },
  "15%": { opacity: 1 },
  "50%": { transform: "translate(-5vw, 40vh) rotate(-45deg)" },
  "85%": { opacity: 1 },
  "100%": { opacity: 0, transform: "translate(-100vw, -5vh) rotate(-90deg)" },
});

const floatEarth = keyframes({
  "0%": { opacity: 0, transform: "translate(-100vw, -100vh) rotate(-20deg)" },
  "15%": { opacity: 1 },
  "50%": { transform: "translate(40vw, 40vh) rotate(50deg)", opacity: 1 },
  "100%": { opacity: 0, transform: "translate(100vw, 100vh) rotate(10deg)" },
});

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

// 🚀 Container für die gesamte Seite
const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "20px",
  backgroundColor: "$background",
  color: "$font",
  overflowX: "hidden",
});

// 🛸 Box für den Fehler-Inhalt
const ErrorContent = styled("div", {
  width: "90vw",
  maxWidth: "500px",
  padding: "20px",
  backgroundColor: "$secondary",
  border: "1px solid $detail",
  borderRadius: "8px",
  boxShadow: "0 4px 8px $shadow",
  animation: `${fadeIn} 1s ease-in-out`,
});

// 🌌 Container für das visuelle Design (Zahlen, Icons)
const ErrorVisual = styled("div", {
  position: "relative",
  height: "250px",
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
});

// 🌙 Mond-Zwischenraum
const Moon = styled("div", {
  width: "75px",
  height: "75px",
  background: "radial-gradient(circle, #f0f0f0 20%, #cccccc 80%, #e7e3e3 100%)",
  borderRadius: "50%",
  position: "absolute",
  boxShadow: "0 0 30px $font",
  zIndex: 1,
});

// ⭐ Sterne-Hintergrund
const Stars = styled("div", {
  width: "100%",
  height: "100%",
  background: `url('data:image/svg+xml,%3Csvg xmlns%3D"http%3A//www.w3.org/2000/svg" width%3D"100" height%3D"100" viewBox%3D"0 0 100 100"%3E%3Cg fill%3D"%23ffffff"%3E%3Ccircle cx%3D"25" cy%3D"25" r%3D"1.5"/%3E%3Ccircle cx%3D"50" cy%3D"10" r%3D"1"/%3E%3Ccircle cx%3D"75" cy%3D"50" r%3D"1.5"/%3E%3Ccircle cx%3D"10" cy%3D"75" r%3D"1"/%3E%3Ccircle cx%3D"50" cy%3D"75" r%3D"1"/%3E%3Ccircle cx%3D"90" cy%3D"90" r%3D"1.5"/%3E%3Ccircle cx%3D"75" cy%3D"75" r%3D"1"/%3E%3Ccircle cx%3D"20" cy%3D"80" r%3D"1.5"/%3E%3C/g%3E%3C/svg%3E') repeat center center`,
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 0,
});

// 🚀 Emoji-Styling mit Animationen
const Emoji = styled("div", {
  position: "absolute",
  zIndex: 3,
  opacity: 0,
  animationTimingFunction: "cubic-bezier(0.42, 0, 0.58, 1)",

  variants: {
    type: {
      rocket: { animation: `${floatRocket} 30s infinite` },
      satellite: { animation: `${floatSatellite} 16s infinite` },
      earth: { animation: `${floatEarth} 22s infinite` },
    },
  },
});

// 🖋️ Titel und Nachricht
const ErrorTitle = styled("h4", {
  fontSize: "1.5rem",
  marginBottom: "10px",
  color: "$font",
});

const ErrorMessage = styled("p", {
  fontSize: "1rem",
  marginBottom: "10px",
  color: "$font",
});

// 🌍 Home-Link als Button
const HomeLink = styled(Link, {
  display: "inline-block",
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "$buttonBg",
  color: "$buttonFont",
  borderRadius: "10px",
  textDecoration: "none",
  fontSize: "0.9rem",
  transition: "background-color 0.3s ease",
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "$buttonHover",
    color: "$buttonHoverFont",
  },
});

const Error404 = () => {
  return (
    <Container>
      <ErrorContent>
        <ErrorVisual>
          <span className="fourLeft">4</span>
          <Moon />
          <span className="fourRight">4</span>
          <Emoji type="rocket">🚀</Emoji>
          <Emoji type="satellite">🛰️</Emoji>
          <Emoji type="earth">🌏</Emoji>
          <Stars />
        </ErrorVisual>
        <ErrorTitle>Lost in Space</ErrorTitle>
        <ErrorMessage>Oh no! You seem to be stranded in space.</ErrorMessage>
        <ErrorMessage>The page you are looking for does not exist. Please try another page.</ErrorMessage>
        <HomeLink to="/">Back to Earth</HomeLink>
      </ErrorContent>
    </Container>
  );
};

export default Error404;
