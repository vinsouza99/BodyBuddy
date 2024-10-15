import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import bodybuddyLogo from "../assets/bodybuddy_logo_color.svg";
import onboarding1 from "../assets/onboarding1.png";
import onboarding2 from "../assets/onboarding2.png";
import onboarding3 from "../assets/onboarding3.png";
import thumbnail from "../assets/thumbnail.png";

export function Landing() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // State to track whether to show the SignIn or Landing page content
  const [isSignIn, setIsSignIn] = useState(false);

  // Define onboarding slides for left panel
  const images = [onboarding1, onboarding2, onboarding3];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval); // Cleanup on unmount
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <Grid container>
      {/* Left section with image slider (hide on mobile) */}
      {!isMobile && (
        <Grid size={{ sm: 12, md: 6 }}>
          <Box
            sx={{
              position: "relative",
              height: "100vh",
              width: "100%",
              overflow: "hidden",
            }}
          >
            {images.map((image, index) => (
              <Box
                key={index}
                component="img"
                src={image}
                alt={`Slide ${index + 1}`}
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: currentSlide === index ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                }}
              />
            ))}

            {/* Dots */}
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 1,
              }}
            >
              {images.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => handleDotClick(index)} 
                  sx={{
                    position: "relative",
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: currentSlide === index ? "2px solid white" : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: currentSlide === index ? "white" : "none",
                      border: currentSlide === index ? "none" : "1px solid white",
                      transition: "background-color 0.3s",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      )}

      {/* Right section with content */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            padding: 4,
          }}
        >
          {isSignIn ? (
            <SignIn title="Sign In" /> // Render SignIn component if state is true
          ) : (
            <>
              {/* Logo */}
              <Box sx={{ marginBottom: 1 }}>
                <img src={bodybuddyLogo} alt="BodyBuddy Logo" width={60} />
              </Box>

              {/* Welcome message */}
              <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Welcome to BodyBuddy
              </Typography>

              {/* Description */}
              <Typography variant="body1" align="center" sx={{ marginBottom: 4 }}>
                Get healthier and energetic everyday with easy exercises tailored
                for home workout enthusiasts and fitness beginners.
              </Typography>

              {/* Feature list */}
              <Box
                sx={{
                  width: "100%",
                  display: "grid",
                  justifyContent: "center",
                  marginBottom: 4,
                }}
              >
                {/* Feature 1 */}
                <Box
                  sx={{
                    display: "flex",
                    textAlign: "left",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <img src={thumbnail} alt="Posture Correction" width={40} height={40} />
                  <Typography variant="body2" component="span" sx={{ marginLeft: 2 }}>
                    Real-time posture corrections while exercising
                  </Typography>
                </Box>

                {/* Feature 2 */}
                <Box
                  sx={{
                    display: "flex",
                    textAlign: "left",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <img src={thumbnail} alt="Workout Plan" width={40} height={40} />
                  <Typography variant="body2" component="span" sx={{ marginLeft: 2 }}>
                    Personalized workout plan based on your goal and fitness level
                  </Typography>
                </Box>

                {/* Feature 3 */}
                <Box
                  sx={{
                    display: "flex",
                    textAlign: "left",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <img src={thumbnail} alt="Demo Library" width={40} height={40} />
                  <Typography variant="body2" component="span" sx={{ marginLeft: 2 }}>
                    Exercise Demo Library to gain better exercise knowledge
                  </Typography>
                </Box>
              </Box>

              {/* Button linking to CreateProgram.jsx */}
              <Button
                variant="contained"
                color="primary"
                sx={{ marginBottom: 2 }}
                component={NavLink}
                to="/create-program"
              >
                Create my exercise plan
              </Button>

              {/* Sign In link */}
              <Typography variant="body2">
                Already have an account?{" "}
                <Button
                  onClick={() => setIsSignIn(true)} // Set state to true when Sign In is clicked
                  variant="text"
                  color="primary"
                >
                  Sign In
                </Button>
              </Typography>
            </>
          )}
        </Container>
      </Grid>
    </Grid>
  );
}

export default Landing;
