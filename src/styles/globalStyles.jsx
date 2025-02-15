import { createStitches } from "@stitches/react";

export const { styled, globalCss, keyframes } = createStitches({});

export const globalStyles = globalCss({
  //FIXME - Farben global anpassen (Light/Dark Mode)
  /* Light Mode */
  ":root": {
    "--color-primary": "#435585",
    "--color-secondary": "#818fb4",
    "--color-background": "#ccc1bc",
    "--color-font": "#1e1e2f",
    "--color-button": "#435585",
    "--color-buttonHover": "#7fa1c3",
    "--color-info": "#6c8ea3",
  },

  /* Dark Mode */
  'html[data-theme="dark"]': {
    "--color-primary": "#1e3a5f",
    "--color-secondary": "#415a80",
    "--color-background": "#121212",
    "--color-font": "#ffffff",
    "--color-button": "#1e3a5f",
    "--color-buttonHover": "#2a5d8f",
    "--color-info": "#3a6f9e",
  },

  "*": { boxSizing: "border-box", margin: 0, padding: 0 },
  "html, body": {
    fontFamily: "Raleway, sans-serif",
    backgroundColor: "transparent",
    color: "var(--color-font)",
    transition: "background-color 0.3s ease, color 0.3s ease",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  "@media (min-width: 1920px)": {
    HomeContainer: {
      maxWidth: "95%",
    },
    BreakingNewsCarousel: {
      justifyContent: "flex-start",
    },
  },
});
