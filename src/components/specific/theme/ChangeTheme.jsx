import React, { useContext } from "react";
import * as Switch from "@radix-ui/react-switch";
import { styled } from "../../../styles/globalStyles";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

const SwitchWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
});

const ThemeSwitch = styled(Switch.Root, {
  width: 42,
  height: 25,
  backgroundColor: "var(--color-primary)",
  borderRadius: "9999px",
  position: "relative",
  cursor: "pointer",
  transition: "background-color 0.2s ease-in-out",
  border: "2px solid var(--color-font)",

  "&[data-state='checked']": {
    backgroundColor: "var(--color-buttonHover)",
  },
});

const ThemeThumb = styled(Switch.Thumb, {
  display: "block",
  width: 21,
  height: 21,
  backgroundColor: "var(--color-font)",
  borderRadius: "9999px",
  transition: "transform 0.2s ease-in-out",
  transform: "translateX(2px)",

  "&[data-state='checked']": {
    transform: "translateX(20px)",
  },
});

const ThemeIcon = styled("div", {
  fontSize: "1.5rem",
  color: "var(--color-font)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "color 0.3s ease",
});

const ChangeTheme = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <SwitchWrapper>
      <ThemeIcon>{darkMode ? <Moon size={20} /> : <Sun size={20} />}</ThemeIcon>
      <ThemeSwitch
        checked={darkMode}
        onCheckedChange={(checked) => setDarkMode(checked)}
        aria-label="Toggle Theme">
        <ThemeThumb />
      </ThemeSwitch>
    </SwitchWrapper>
  );
};

export default ChangeTheme;
