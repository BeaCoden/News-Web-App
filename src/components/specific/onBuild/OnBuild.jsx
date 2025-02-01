import React from "react";
import { Link } from "react-router-dom";
import { styled } from "../../../styles/globalStyles";

// Container für die gesamte Seite
const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "$font",
  textAlign: "center",
  padding: "20px",
  overflowX: "hidden",
  backgroundColor: "$background",
});

// Box für den Inhalt
const ConstructionContent = styled("div", {
  width: "90vw",
  maxWidth: "500px",
  padding: "40px",
  backgroundColor: "$secondary",
  border: "1px solid $detail",
  borderRadius: "15px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  animation: "fadeIn 1s ease-in-out",
  position: "relative",
});

// Animationen für Icons
const Visual = styled("div", {
  position: "relative",
  height: "100px",
  marginBottom: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

// Hammer-Animation
const Hammer = styled("div", {
  fontSize: "3rem",
  animation: "hammerSwing 2s infinite ease-in-out",
  transformOrigin: "bottom center",

  "@keyframes hammerSwing": {
    "0%": { transform: "rotate(0deg)" },
    "50%": { transform: "rotate(25deg)" },
    "100%": { transform: "rotate(0deg)" },
  },
});

// Schrauben-Animation
const Screw = styled("div", {
  position: "absolute",
  top: "-10px",
  right: "20px",
  fontSize: "1.5rem",
  animation: "screwRotate 8s infinite linear",

  "@keyframes screwRotate": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
});

// Schraubenschlüssel-Animation
const Wrench = styled("div", {
  position: "absolute",
  bottom: "-10px",
  left: "20px",
  fontSize: "1.5rem",
  animation: "wrenchRotate 6s infinite linear",

  "@keyframes wrenchRotate": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(-360deg)" },
  },
});

// Titel
const Title = styled("h4", {
  fontSize: "2rem",
  marginBottom: "10px",
  color: "$font",
  animation: "fadeIn 1.5s ease-in-out",
  zIndex: 3,
});

// Beschreibungstext
const Message = styled("p", {
  fontSize: "1rem",
  marginBottom: "20px",
  color: "$font",
  animation: "fadeIn 2s ease-in-out",
  zIndex: 3,
});

// Home-Link als Button
const HomeLink = styled(Link, {
  display: "inline-block",
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "$buttonBg",
  color: "$buttonFont",
  borderRadius: "10px",
  textDecoration: "none",
  fontSize: "0.9rem",
  animation: "fadeIn 2.5s ease-in-out",

  "&:hover": {
    backgroundColor: "$buttonHover",
    color: "$buttonHoverFont",
  },

  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
});

const OnBuild = () => {
  return (
    <Container>
      <ConstructionContent>
        <Visual>
          <Hammer>🛠️</Hammer>
          <Screw>🔩</Screw>
          <Wrench>🔧</Wrench>
        </Visual>
        <Title>Page Under Construction</Title>
        <Message>This page is currently being built. Please check back later!</Message>
        <HomeLink to="/">Back to Home</HomeLink>
      </ConstructionContent>
    </Container>
  );
};

export default OnBuild;
