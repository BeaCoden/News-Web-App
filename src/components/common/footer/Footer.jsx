import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "../../../styles/globalStyles";
import * as Toggle from "@radix-ui/react-toggle";
import { Linkedin, Github, BookOpen, Contact } from "lucide-react";

// Footer Container
const FooterContainer = styled("footer", {
  position: "fixed",
  bottom: "-80px",
  left: 0,
  width: "100%",
  backgroundColor: "$footerBg",
  textAlign: "center",
  padding: "10px 0",
  zIndex: 1000,
  borderTop: "3px solid $detail",
  fontSize: "0.8rem",
  color: "$footerFont",
  transition: "bottom 0.5s ease-in-out",

  variants: {
    visible: {
      true: {
        bottom: "0",
      },
    },
  },
});

// Toggle Button für den Footer
const ToggleButton = styled(Toggle.Root, {
  position: "fixed",
  bottom: "15px",
  left: "5px",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  padding: "5px",
  zIndex: 1001,
  borderRadius: "50px",
  color: "$buttonFont",
  fontSize: "small",
  transition: "background-color 0.3s ease",

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});

// Footer-Links
const FooterLinks = styled("ul", {
  listStyle: "none",
  padding: 0,
  margin: "10px 0 0",
  display: "flex",
  justifyContent: "center",
  gap: "15px",
});

const FooterLinkItem = styled("li", {});

const FooterLink = styled("a", {
  color: "$footerFont",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  transition: "color 0.3s ease",

  "&:hover": {
    color: "$hover",
  },
});

// Icon-Styling
const Icon = styled("span", {
  fontSize: "1.2rem",
});

const Footer = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const toggleFooter = () => {
    setIsFooterVisible((prev) => !prev);
  };

  return (
    <div>
      {/* Footer Toggle Button */}
      <ToggleButton
        pressed={isFooterVisible}
        onPressedChange={toggleFooter}>
        {isFooterVisible ? "❌" : "ℹ️"}
      </ToggleButton>

      {/* Footer Content */}
      <FooterContainer visible={isFooterVisible}>
        <p>
          <small>© 2024 by BeaCoden | All rights reserved</small>
        </p>
        <FooterLinks>
          <FooterLinkItem>
            <FooterLink
              href="https://www.linkedin.com/in/beapitzschke?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BBKg3cKmvTyGzjJ2bcXnVgw%3D%3D"
              target="_blank"
              rel="noreferrer">
              <Icon>
                <Linkedin size={18} />
              </Icon>
              LinkedIn
            </FooterLink>
          </FooterLinkItem>
          <FooterLinkItem>
            <FooterLink
              href="https://github.com/BeaCoden"
              target="_blank"
              rel="noreferrer">
              <Icon>
                <Github size={18} />
              </Icon>
              GitHub
            </FooterLink>
          </FooterLinkItem>
          <FooterLinkItem>
            <FooterLink href="/about">
              <Icon>
                <BookOpen size={18} />
              </Icon>
              About
            </FooterLink>
          </FooterLinkItem>
          <FooterLinkItem>
            <FooterLink href="/contact">
              <Icon>
                <Contact size={18} />
              </Icon>
              Contact
            </FooterLink>
          </FooterLinkItem>
        </FooterLinks>
      </FooterContainer>
    </div>
  );
};

export default Footer;
