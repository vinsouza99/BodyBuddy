import React, { useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import {
  Box,
  Button,
  Typography,
  Container,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { NavLink } from "react-router-dom";
import { Onboarding } from "../components/Onboarding";
import bodybuddyLogo from "/assets/bodybuddy_logo_color.svg";
import CircleCheckIcon from "/assets/icon-circle-check.svg";

export function AuthenticationOptions(props) {
  useEffect(() => {
    setPageTitle(props.title);
  }, []);

  // Use useMediaQuery to define screen width
  const isMobile = useMediaQuery("(max-width:600px)");

  // Set the width based on screen size
  const setWidth = isMobile ? "100%" : "60%";

  return (
    <Grid container>
      {/* Left section with image slider */}
      <Grid
        size={{ sm: 12, md: 6 }}
        sx={{
          display: { xs: "none", md: "block" }, // Hide on extra small and small screens, show on medium and above
        }}
      >
        <Onboarding />
      </Grid>

      {/* Right section with Welcome content */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            padding: 4,
            boxSizing: "border-box",
            overflow: "auto",
          }}
        >
          {/* Logo */}
          <Box sx={{ marginBottom: 1 }}>
            <img src={bodybuddyLogo} alt="BodyBuddy Logo" width={60} />
          </Box>

          {/* Welcome message */}
          <Typography variant="h2" sx={{ marginBottom: 1 }}>
            Welcome to BodyBuddy
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            align="center"
            sx={{ width: setWidth, marginBottom: 3 }}
          >
            Get healthier and energetic everyday with easy exercises tailored
            for home workout enthusiasts and fitness beginners.
          </Typography>

          {/* Feature list */}
          <Box
            sx={{
              width: setWidth,
              display: "grid",
              justifyContent: "center",
              marginBottom: 1,
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
              <img
                src={CircleCheckIcon}
                alt="Posture Correction"
                width={60}
                height={60}
              />
              <Typography
                variant="body1"
                component="span"
                sx={{ marginLeft: 2 }}
              >
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
              <img
                src={CircleCheckIcon}
                alt="Workout Plan"
                width={60}
                height={60}
              />
              <Typography
                variant="body1"
                component="span"
                sx={{ marginLeft: 2 }}
              >
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
              <img
                src={CircleCheckIcon}
                alt="Demo Library"
                width={60}
                height={60}
              />
              <Typography
                variant="body1"
                component="span"
                sx={{ marginLeft: 2 }}
              >
                Exercise Demo Library to gain better exercise knowledge
              </Typography>
            </Box>
          </Box>

          {/* Button linking to CreateProgram.jsx */}
          <Button
            variant="contained"
            color="primary"
            sx={{ marginBottom: 1 }}
            component={NavLink}
            to="/create-program"
            onClick={() => localStorage.setItem("currentSlide", 0)} // Reset onboarding slide to first slide
          >
            Create My Exercise Plan
          </Button>

          {/* Sign In link */}
          <Typography variant="body2">
            Already have an account?{" "}
            <Button
              variant="text"
              color="primary"
              component={NavLink}
              to="/signin"
              sx={{
                color: "text.primary",
                fontWeight: 700,
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              Log In
            </Button>
          </Typography>
        </Container>
      </Grid>
    </Grid>
  );
}

export default AuthenticationOptions;
