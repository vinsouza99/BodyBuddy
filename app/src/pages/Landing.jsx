import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { NavLink } from "react-router-dom";
import { Onboarding } from "../components/Onboarding";
import bodybuddyLogo from "../assets/bodybuddy_logo_color.svg";
import thumbnail from "../assets/thumbnail.png";

export function Landing() {
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
            height: "100vh",
            padding: 4,
          }}
        >
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
              <img
                src={thumbnail}
                alt="Posture Correction"
                width={40}
                height={40}
              />
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
              variant="text"
              color="primary"
              component={NavLink}
              to="/signin"
            >
              Sign In
            </Button>
          </Typography>

          {/* Sign Up link */}
          <Typography variant="body2">
            Don't have an account? (for testing only){" "}
            <Button
              variant="text"
              color="primary"
              component={NavLink}
              to="/signup"
            >
              Sign Up
            </Button>
          </Typography>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Landing;
