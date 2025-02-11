import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { styled } from "../../../styles/globalStyles";
import newsSvg from "../../../assets/svg/news.svg";

const OnBuildContainer = styled(motion.div, {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "20px",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  color: "white",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
  zIndex: 2,
  maxWidth: "400px",
});

const Title = styled("h2", {
  fontSize: "1.8rem",
  fontWeight: "bold",
  marginBottom: "12px",
});

const Countdown = styled(motion.p, {
  fontSize: "1.2rem",
  fontWeight: "bold",
  marginTop: "10px",
});

const Image = styled("img", {
  width: "80px",
  marginBottom: "15px",
});

const OnBuild = ({ resetTime }) => {
  const [timeLeft, setTimeLeft] = useState(resetTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(resetTime - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [resetTime]);

  const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  // Framer Motion für Scroll-Animation
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <OnBuildContainer style={{ opacity }}>
      <Image
        src={newsSvg}
        alt="News unavailable"
        onError={(e) => (e.target.style.display = "none")}
      />
      <Title>🚧 Wir sind bald zurück! 🚧</Title>
      <p>Hallo! Aktuell können keine News geladen werden, aber keine Sorge – wir arbeiten daran! 😊</p>
      <Countdown
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}>
        Versuch es in {hours}h {minutes}m {seconds}s erneut
      </Countdown>
    </OnBuildContainer>
  );
};

export default OnBuild;
