import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/common/header/Header";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Category from "../pages/category/Category";
import Contact from "../pages/contact/Contact";
import Search from "../pages/search/Search";
import Weather from "../pages/weather/Weather";
import Settings from "../pages/userSettings/Settings";
const AppRouter = () => {
  return (
    <div>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/category"
            element={<Category />}
          />
          <Route
            path="/contact"
            element={<Contact />}
          />
          <Route
            path="/search"
            element={<Search />}
          />
          <Route
            path="/Settings"
            element={<Settings />}
          />
          <Route
            path="/weather"
            element={<Weather />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
