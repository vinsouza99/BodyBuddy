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
  Grid2 as Grid,
  Container,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { NavLink, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/bodybuddy.svg";
import AppPreview from "../assets/main-app-preview.png";
import memberPicturePlaceholder from "../assets/bodybuddy_logo_color.svg";
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
  const teamMembers = [
    {
      name: "Yosuke Hanaoka",
      picture: "",
      linkedin: "",
      role: "Project Manager / Full Stack Developer",
    },
    {
      name: "Vinicius Souza",
      picture: "",
      linkedin: "",
      role: "Lead Developer / Full Stack Developer",
    },
    ,
    {
      name: "Cocoy Suguitan",
      picture: "",
      linkedin: "",
      role: "Frontend Developer",
    },
    {
      name: "Teru Mori",
      picture: "",
      linkedin: "",
      role: "Frontend Developer",
    },
    {
      name: "Trang Nguyen",
      picture: "",
      linkedin: "",
      role: "Co-PM / UI/UX Designer",
    },
    {
      name: "Calvin Tsai",
      picture: "",
      linkedin: "",
      role: "Lead Designer / UI/UX Designer",
    },
    {
      name: "Jason Yang",
      picture: "",
      linkedin: "",
      role: "UI/UX Designer",
    },
    {
      name: "Viola Sun",
      picture: "",
      linkedin: "",
      role: "UI/UX Designer",
    },
    {
      name: "Liezel Sagayadoro",
      picture: "",
      linkedin: "",
      role: "UI/UX Designer",
    },
  ];

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
                <Link to="#about" onClick={() => scrollToSection(aboutRef)}>
                  About Us
                </Link>
                <Link
                  color="primary"
                  to="#features"
                  onClick={() => scrollToSection(featuresRef)}
                >
                  Features
                </Link>
                <Link
                  color="primary"
                  to="#pricing"
                  onClick={() => scrollToSection(pricingRef)}
                >
                  Pricing
                </Link>
                <Link
                  color="primary"
                  to="#team"
                  onClick={() => scrollToSection(teamRef)}
                >
                  Team
                </Link>
                <Link
                  color="primary"
                  onClick={() => scrollToSection(contactRef)}
                >
                  Contact
                </Link>
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
      <Box id="page-content">
        <Box
          id="home"
          component="section"
          ref={aboutRef}
          sx={{ paddingTop: "80px" }}
        >
          <Grid container>
            {/* Left section with image slider */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Box
                textAlign="left"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "1rem",
                  padding: ".5rem 1rem",
                  maxWidth: "500px",
                }}
              >
                <Typography variant="h2" display="block">
                  Get fit and healthy from the comfort of home without gym or
                  trainers.
                </Typography>
                <Typography variant="body2" display="block">
                  BodyBuddy is an AI-powered fitness web platform for people who
                  want to exercise in their own homes or on the go, at their own
                  pace.
                </Typography>
                <Box display="block">
                  <Link to="/enter">
                    <Button variant="contained">Sign Up For Free</Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
            {/* Right section with sign-up form */}
            <Grid size={{ sm: 12, md: 6 }}>
              <Container>
                <img src={AppPreview} id="app-preview" />
              </Container>
            </Grid>
          </Grid>
        </Box>
        <Box component="section" id="features" ref={featuresRef}>
          <Grid container gap={5}>
            <Container>
              <Typography variant="h2">
                All you need to start your fitness journey
              </Typography>
            </Container>
            <Container>
              <Grid container spacing={2} justifyContent={"center"}>
                <Grid
                  item
                  xs={12} // 1 column on extra-small and small screens
                  md={4} // 3 columns on medium and larger screens
                >
                  <Card className="feature-card">
                    <CardContent>
                      <Typography variant="h5">Motion tracking</Typography>
                      <Typography variant="body2">
                        AI analysis checks your form in real-time, ensuring
                        correct posture for a safe and effective workout{" "}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  item
                  xs={12} // 1 column on extra-small and small screens
                  md={4} // 3 columns on medium and larger screens
                >
                  <Card className="feature-card">
                    <CardContent>
                      <Typography variant="h5">
                        Personalized workout plan
                      </Typography>
                      <Typography variant="body2">
                        AI analysis helps you create personalized workout plans
                        based on your fitness level and goals
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  item
                  xs={12} // 1 column on extra-small and small screens
                  md={4} // 3 columns on medium and larger screens
                >
                  <Card className="feature-card">
                    <CardContent>
                      <Typography variant="h5">Progress tracking</Typography>
                      <Typography variant="body2">
                        Progress dashboard keeps you motivated, making it easier
                        to stay on track and maintain a regular workout routine,
                        even when exercising alone!
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Grid>
          <Grid container>
            <Grid size={{ sm: 12, md: 6 }}>
              <Container>
                <img src={AppPreview} id="app-preview" />
              </Container>
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" display="block">
                BodyBuddy offers an effective fitness experience without the
                worry of time and location constraints
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box component="section" id="pricing" ref={pricingRef}>
          <Grid container gap={5}>
            <Container>
              <Typography variant="h2">Our Offers</Typography>
            </Container>
            <Container>
              <Grid container spacing={2} justifyContent={"center"}>
                <Grid
                  item
                  xs={12} // 1 column on extra-small and small screens
                  md={4} // 3 columns on medium and larger screens
                >
                  <Card className="feature-card">
                    <CardContent>
                      <Typography variant="h5">Starter</Typography>
                      <Typography variant="body3">
                        Everything you need to get started
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  item
                  xs={12} // 1 column on extra-small and small screens
                  md={4} // 3 columns on medium and larger screens
                >
                  <Card className="feature-card">
                    <CardContent>
                      <Typography variant="h5">Pro</Typography>
                      <Typography variant="body3">
                        Explore all features without limit
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  item
                  xs={12} // 1 column on extra-small and small screens
                  md={4} // 3 columns on medium and larger screens
                >
                  <Card className="feature-card">
                    <CardContent>
                      <Typography variant="h5">Enterprise</Typography>
                      <Typography variant="body3">
                        Valuable custom package for organization
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Box>
        <Box component="section" id="team" ref={teamRef}>
          <Typography variant="h2">Meet the Team</Typography>
          <Grid container spacing={2} justifyContent={"center"}>
            {teamMembers.slice(0, 5).map((member) => (
              <Grid item xs={6} md={3}>
                <Container>
                  <Box
                    sx={{
                      width: "50%",
                      aspectRatio: "1/1",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={memberPicturePlaceholder}
                      alt={member.name}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                  <Box display={"block"}>
                    <Link to={member.linkedin}>
                      <Box sx={{ display: "flex", alignItem: "center" }}>
                        <LinkedInIcon />
                        &nbsp;{member.name}
                      </Box>
                    </Link>
                  </Box>
                  <Box display={"block"}>
                    <Typography variant="body3">{member.role}</Typography>
                  </Box>
                </Container>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} justifyContent={"center"}>
            {teamMembers.slice(5, 10).map((member) => (
              <Grid item xs={6} md={3}>
                <Container>
                  <Box
                    sx={{
                      width: "50%",
                      aspectRatio: "1/1",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={memberPicturePlaceholder}
                      alt={member.name}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                  <Box display={"block"}>
                    <Link to={member.linkedin}>
                      <Box sx={{ display: "flex", alignItem: "center" }}>
                        <LinkedInIcon />
                        &nbsp;{member.name}
                      </Box>
                    </Link>
                  </Box>
                  <Box display={"block"}>
                    <Typography variant="body3">{member.role}</Typography>
                  </Box>
                </Container>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box component="section" id="contact" ref={contactRef}>
          <Grid container>
            <Grid size={{ sm: 12, md: 6 }}>
              <Container>
                <img src={logo} />
              </Container>
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Box
                textAlign="left"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <Typography variant="h3" display="block">
                  Contact Us
                </Typography>
                <Box>
                  <Box component="form" noValidate>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoFocus
                      sx={{ marginTop: 1 }}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      sx={{ marginTop: 1 }}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="message"
                      label="message"
                      type="text"
                      id="message"
                      sx={{ marginTop: 1 }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 1, mb: 2 }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Landing;
