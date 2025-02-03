// App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "../src/routes/AppRouter";
import { globalStyles } from "./styles/globalStyles";
import { ThemeProvider } from "./contexts/ThemeContext";

// Global Styles initialisieren
globalStyles();

const App = () => (
  <ThemeProvider>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
