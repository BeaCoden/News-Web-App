import React from "react";
import { useNavigate } from "react-router-dom";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { styled } from "../../../styles/globalStyles";
import ChangeTheme from "../../specific/theme/ChangeTheme";
import newsEarth from "../../../assets/gifs/newsEarth.gif";
import { routes } from "../../../routes/AppRouter";

// Container für Logo und Titel
const LogoContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
});

// Header Container
const HeaderWrapper = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "var(--color-primary)",
  padding: "10px 20px",
  width: "100%",
  borderBottom: "5px solid var(--color-info)",
  zIndex: "999",
  position: "relative",
});

// Desktop Navigation – sichtbar ab 768px
const MenuList = styled(NavigationMenu.List, {
  display: "flex",
  gap: "20px",
  listStyle: "none",
  padding: 0,
  margin: 0,
  alignItems: "center",
  "@media (max-width: 768px)": {
    display: "none",
  },
});

// Mobile Dropdown – nur unter 768px sichtbar
const MobileDropdown = styled("div", {
  display: "none",
  "@media (max-width: 768px)": {
    display: "block",
  },
});

const DropdownTrigger = styled(DropdownMenu.Trigger, {
  backgroundColor: "transparent",
  border: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
  color: "var(--color-font)",
});

const DropdownContent = styled(DropdownMenu.Content, {
  backgroundColor: "var(--color-primary)",
  padding: "10px",
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  position: "absolute",
  top: "100%",
  right: "0",
  zIndex: "1000",
});

const DropdownItem = styled(DropdownMenu.Item, {
  padding: "10px 15px",
  color: "var(--color-font)",
  cursor: "pointer",
  borderRadius: "5px",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "var(--color-buttonHover)",
  },
});

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      {/* Logo und Titel */}
      <LogoContainer onClick={() => navigate("/")}>
        <img
          src={newsEarth}
          alt="News Logo"
          style={{ width: "50px" }}
        />
        <h1>News</h1>
      </LogoContainer>

      {/* Desktop Navigation */}
      <NavigationMenu.Root>
        <MenuList>
          {routes
            .filter((route) => route.label !== "About" && route.label !== "Contact")
            .map((route, index) => (
              <NavigationMenu.Item
                key={index}
                onClick={() => navigate(route.path)}>
                {route.label}
              </NavigationMenu.Item>
            ))}
          <NavigationMenu.Item>
            <ChangeTheme />
          </NavigationMenu.Item>
        </MenuList>
      </NavigationMenu.Root>

      {/* Mobile Dropdown Navigation */}
      <MobileDropdown>
        <DropdownMenu.Root>
          <DropdownTrigger>☰</DropdownTrigger>
          <DropdownContent align="end">
            {routes
              .filter((route) => route.label !== "About" && route.label !== "Contact")
              .map((route, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => navigate(route.path)}>
                  {route.label}
                </DropdownItem>
              ))}
            <DropdownItem>
              <ChangeTheme />
            </DropdownItem>
          </DropdownContent>
        </DropdownMenu.Root>
      </MobileDropdown>
    </HeaderWrapper>
  );
};

export default Header;
