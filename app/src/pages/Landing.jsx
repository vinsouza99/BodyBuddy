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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { NavLink, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/bodybuddy.svg";
import AppPreview from "../assets/main-app-preview.png";
import FeaturesImg1 from "../assets/landingpage_features_image_1.png";
import FeaturesImg2 from "../assets/landingpage_features_image_2.png";
import feature1IconSrc from "../assets/feature1Icon.svg";
import feature2IconSrc from "../assets/feature2Icon.svg";
import feature3IconSrc from "../assets/feature3Icon.svg";
import CheckIcon from "@mui/icons-material/Check";
import yosukePicture from "../assets/teammembers/yosuke.png";
import vinPicture from "../assets/teammembers/vin.png";
import cocoyPicture from "../assets/teammembers/cocoy.png";
import teruPicture from "../assets/teammembers/teru.png";
import taraPicture from "../assets/teammembers/tara.png";
import calvinPicture from "../assets/teammembers/calvin.png";
import jasonPicture from "../assets/teammembers/jason.png";
import violaPicture from "../assets/teammembers/viola.png";
import liezelPicture from "../assets/teammembers/liezel.png";

import "./Landing.css";

export function Landing() {
  const [menuActive, setMenuActive] = useState(false);
  const [isOnTop, setIsOnTop] = useState(true);
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
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
      picture: yosukePicture,
      linkedin: "",
      role: "Project Manager / Full Stack Developer",
    },
    {
      name: "Vinicius Souza",
      picture: vinPicture,
      linkedin: "",
      role: "Lead Developer / Full Stack Developer",
    },
    ,
    {
      name: "Cocoy Suguitan",
      picture: cocoyPicture,
      linkedin: "",
      role: "Frontend Developer",
    },
    {
      name: "Teru Mori",
      picture: teruPicture,
      linkedin: "",
      role: "Frontend Developer",
    },
    {
      name: "Trang Nguyen",
      picture: taraPicture,
      linkedin: "",
      role: "Co-PM / UI/UX Designer",
    },
    {
      name: "Calvin Tsai",
      picture: calvinPicture,
      linkedin: "",
      role: "Lead Designer / UI/UX Designer",
    },
    {
      name: "Jason Yang",
      picture: jasonPicture,
      linkedin: "",
      role: "UI/UX Designer",
    },
    {
      name: "Viola Sun",
      picture: violaPicture,
      linkedin: "",
      role: "UI/UX Designer",
    },
    {
      name: "Liezel Sagayadoro",
      picture: liezelPicture,
      linkedin: "",
      role: "UI/UX Designer",
    },
  ];
  const isMobile = useMediaQuery("(max-width:600px)");
  const featuresImgSrc = isMobile ? FeaturesImg2 : FeaturesImg1;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to API or display a success message)
    console.log("Form Data:", formData);
  };
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
                  to="#contact"
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
            <Box>
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
                      <Box sx={{ width: "100%" }}>
                        <img
                          src={feature1IconSrc}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </Box>
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
                      <Box sx={{ width: "100%" }}>
                        <img
                          src={feature2IconSrc}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </Box>
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
                      <Box sx={{ width: "100%" }}>
                        <img
                          src={feature3IconSrc}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </Box>
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
                <img src={featuresImgSrc} id="app-preview" />
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
                      <Typography
                        variant="h4"
                        fontSize="1.2rem"
                        fontWeight="700"
                      >
                        Starter
                      </Typography>
                      <Typography variant="h5" fontSize="1.8rem">
                        Free
                      </Typography>
                      <Typography variant="body3">
                        Everything you need to get started
                      </Typography>
                      <List dense="true">
                        <ListItem>
                          <ListItemIcon>
                            <CheckIcon />
                          </ListItemIcon>
                          <ListItemText primary="2 months exercise plan generation" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckIcon />
                          </ListItemIcon>
                          <ListItemText primary="20 exercises unlocked" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckIcon />
                          </ListItemIcon>
                          <ListItemText primary="2GB storage for recording videos" />
                        </ListItem>
                      </List>
                      <Box>
                        <Link to="/enter">
                          <Button variant="contained">Sign Up</Button>
                        </Link>
                      </Box>
                      <Typography variant="body3">Unlimited Trial</Typography>
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
                      <Typography
                        variant="h4"
                        fontSize="1.2rem"
                        fontWeight="700"
                      >
                        Pro
                      </Typography>
                      <Box>
                        <Typography variant="h5" fontSize="1.8rem">
                          CAD$4.99
                        </Typography>
                        <Typography variant="body3">/user/month</Typography>
                      </Box>
                      <Typography variant="body3">
                        Explore all features without limit
                      </Typography>
                      <List dense="true">
                        <ListItem>
                          <ListItemIcon>
                            <CheckIcon />
                          </ListItemIcon>
                          <ListItemText primary="Unlimited exercise plan generation" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckIcon />
                          </ListItemIcon>
                          <ListItemText primary="Unlimited exercises unlocked" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckIcon />
                          </ListItemIcon>
                          <ListItemText primary="Unlimited storage for recording videos" />
                        </ListItem>
                      </List>
                      <Box>
                        <Link to="/enter">
                          <Button variant="contained">Sign Up</Button>
                        </Link>
                      </Box>
                      <Typography variant="body3">
                        Comes with 21-day trial
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
                      <Typography
                        variant="h4"
                        fontSize="1.2rem"
                        fontWeight="700"
                      >
                        Enterprise
                      </Typography>
                      <Typography variant="h5" fontSize="1.8rem">
                        Custom Needs
                      </Typography>
                      <Typography variant="body3">
                        Valuable custom package for organization
                      </Typography>
                      <List dense="true">
                        <ListItem>
                          <ListItemIcon>
                            <CheckIcon />
                          </ListItemIcon>
                          <ListItemText primary="Custom group exercise plan" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckIcon />
                          </ListItemIcon>
                          <ListItemText primary="Progress tracking and report for organization" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckIcon />
                          </ListItemIcon>
                          <ListItemText primary="Stay motivated and healthy together!" />
                        </ListItem>
                      </List>
                      <Box>
                        <Link
                          color="primary"
                          to="#contact"
                          onClick={() => scrollToSection(contactRef)}
                        >
                          <Button variant="contained">Contact us</Button>
                        </Link>
                      </Box>
                      <Typography variant="body3">
                        Always happy to chat!
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
          <Grid padding={"1.5rem"} spacing={2}>
            <Grid container spacing={2} justifyContent={"center"}>
              {teamMembers.slice(0, 5).map((member, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Container>
                    <Box
                      sx={{
                        width: "120px",
                        aspectRatio: "1/1",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={member.picture}
                        alt={member.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
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
              {teamMembers.slice(5, 10).map((member, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Container>
                    <Box
                      sx={{
                        width: "120px",
                        aspectRatio: "1/1",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={member.picture}
                        alt={member.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
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
          </Grid>
        </Box>
        <Box component="section" id="contact" ref={contactRef}>
          <Grid container>
            <Grid size={{ sm: 12, md: 5 }}>
              <Box textAlign="left">
                <img src={logo} sx={{ width: "100%", maxWidth: "450px" }} />
              </Box>
            </Grid>
            <Grid
              size={{ xs: 12, md: 7 }}
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Box
                component="form"
                noValidate
                textAlign="left"
                sx={{
                  width: "100%",
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
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    Your name
                  </Typography>
                  <TextField
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    Email
                  </Typography>
                  <TextField
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    type="email"
                  />
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    Leave us a few words
                  </Typography>
                  <TextField
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    fullWidth
                    required
                    multiline
                    rows={4}
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        component="footer"
        sx={{ backgroundColor: "#212121", width: "100%", padding: "1rem" }}
      >
        <Container>
          <Typography variant="body2" color="primary.contrastText">
            BodyBuddy 2024 &copy; All right reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default Landing;
