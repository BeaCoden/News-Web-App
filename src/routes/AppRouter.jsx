import React from "react";
import { Routes, Route } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import Header from "../components/common/header/Header";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Categories from "../pages/category/Categories";
import Contact from "../pages/contact/Contact";
import Search from "../pages/search/Search";
import Weather from "../pages/weather/Weather";
import Settings from "../pages/userSettings/Settings";

export const routes = [
  { path: "/", label: "Home", component: <Home /> },
  { path: "/about", label: "About", component: <About /> },
  { path: "/categories", label: "Categories", component: <Categories /> },
  { path: "/contact", label: "Contact", component: <Contact /> },
  { path: "/search", label: "Search", component: <Search /> },
  { path: "/settings", label: "Settings", component: <Settings /> },
  { path: "/weather", label: "Weather", component: <Weather /> },
];

const AppRouter = () => {
  return (
    <ParallaxProvider>
      <Header />
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.component}
          />
        ))}
      </Routes>
    </ParallaxProvider>
  );
};

export default AppRouter;
