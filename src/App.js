import React, { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { globalStyles } from "./styles/globalStyles";
import { ThemeProvider } from "./contexts/ThemeContext";
import Spinner from "./components/common/spinner/Spinner";

const AppRouter = lazy(() => import("./routes/AppRouter"));

globalStyles();

const App = () => (
  <ThemeProvider>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<Spinner />}>
        <AppRouter />
      </Suspense>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
