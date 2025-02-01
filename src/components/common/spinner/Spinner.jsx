import React from "react";
import { styled } from "../../../styles/globalStyles";

// Container für den Spinner
const SpinnerContainer = styled("div", {
  margin: "100px auto",
  width: "70px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

// Einzelne Punkte im Spinner
const Bounce = styled("div", {
  width: "18px",
  height: "18px",
  backgroundColor: "$primary",
  borderRadius: "100%",
  display: "inline-block",
  animation: "bouncedelay 1.4s infinite ease-in-out both",

  variants: {
    delay: {
      first: { animationDelay: "-0.32s" },
      second: { animationDelay: "-0.16s" },
    },
  },

  "@keyframes bouncedelay": {
    "0%, 80%, 100%": { transform: "scale(0)" },
    "40%": { transform: "scale(1)" },
  },
});

const Spinner = () => {
  return (
    <SpinnerContainer>
      <Bounce delay="first" />
      <Bounce delay="second" />
      <Bounce />
    </SpinnerContainer>
  );
};

export default Spinner;
