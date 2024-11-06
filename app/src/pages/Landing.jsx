import React from "react";
import { useState, useEffect, useRef } from "react";
import theme from "../theme";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { NavLink, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/bodybuddy.svg";
import "./Landing.css";

export function Landing() {
  const [menuActive, setMenuActive] = useState(false);
  const [isOnTop, setIsOnTop] = useState(true);
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);
  const teamRef = useRef(null);
  const contactRef = useRef(null);
  // Handle menu open and close
  const handleMenuClick = () => {
    setMenuActive((currentState) => !currentState);
  };
  // Scroll handler
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Track scroll position to update isOnTop state
  useEffect(() => {
    const handleScroll = () => {
      setIsOnTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <AppBar
        position="fixed"
        className="toolbar"
        sx={{
          backgroundColor: isOnTop ? "transparent" : "white",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Box component="div" className="toolbar-content-wrapper">
            <Box component="div">
              <img src={logo} id="app-logo" />
            </Box>
            <Box sx={{ flexGrow: "1", justifyContent: { xs: "end" } }}>
              {/* Desktop Links */}
              <Box
                component="nav"
                id="menu"
                className={[
                  isMdUp ? "" : "mobile-menu",
                  menuActive ? "active" : "",
                ]}
              >
                <NavLink
                  color="primary"
                  to="#about"
                  onClick={() => scrollToSection(aboutRef)}
                >
                  About Us
                </NavLink>
                <NavLink
                  color="primary"
                  to="#features"
                  onClick={() => scrollToSection(featuresRef)}
                >
                  Features
                </NavLink>
                <NavLink
                  color="primary"
                  to="#pricing"
                  onClick={() => scrollToSection(pricingRef)}
                >
                  Pricing
                </NavLink>
                <NavLink
                  color="primary"
                  to="#team"
                  onClick={() => scrollToSection(teamRef)}
                >
                  Team
                </NavLink>
                <NavLink
                  color="primary"
                  onClick={() => scrollToSection(contactRef)}
                >
                  Contact
                </NavLink>
              </Box>

              {/* Mobile Menu Icon */}
              <IconButton
                color="primary"
                aria-label="menu"
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
                sx={{
                  display: { xs: "flex", md: "none", justifySelf: "right" },
                }}
              >
                <MenuIcon />
              </IconButton>
              {/* Mobile Menu */}
            </Box>
            <Box component="div">
              <Link to="/enter">
                <Button variant="contained">Sign Up</Button>
              </Link>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        id="home"
        component="section"
        ref={homeRef}
        sx={{ minHeight: "100vh", paddingTop: "80px" }}
      >
        <Typography variant="h2">Home</Typography>
      </Box>
      <Box component="section" id="about" ref={aboutRef}>
        <Typography variant="h2">About Us</Typography>
      </Box>
      <Box component="section" id="features" ref={featuresRef}>
        <Typography variant="h2">Features</Typography>
      </Box>
      <Box component="section" id="pricing" ref={pricingRef}>
        <Typography variant="h2">Pricing</Typography>
      </Box>
      <Box component="section" id="team" ref={teamRef}>
        <Typography variant="h2">Team</Typography>
      </Box>
      <Box component="section" id="contact" ref={contactRef}>
        <Typography variant="h2">Contact</Typography>
      </Box>
    </>
  );
}

export default Landing;
