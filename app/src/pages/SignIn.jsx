import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import { supabase } from "../utils/supabaseClient";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider.jsx";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import GoogleIcon from "@mui/icons-material/Google";
import bodybuddyLogo from "../assets/bodybuddy_logo_color.svg";
import { Onboarding } from "../components/Onboarding";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3000/";

export const SignIn = (props) => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Initialization
  useEffect(() => {
    setPageTitle(props.title);
  }, []);

  // Transition to Dashboard when user authentication is successful
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  
  const handleSignIn = async (e) => {
    e.preventDefault();
    localStorage.setItem("currentSlide", 0); // Reset onboarding slide to first slide

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setError(error.message);
      console.error("User failed to signed in", error);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    localStorage.setItem("currentSlide", 0); // Reset onboarding slide to first slide

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          prompt: "select_account", // For testing, always display consent page
          redirectTo: `${BASE_URL}dashboard`,
        },
      });

      if (error) {
        throw error;
      }
      
      console.log("User signed in with Google", data);
    } catch (error) {
      setError(error.message);
      console.error("User signed in with Google", error);
      navigate("/signin");
    }
  };

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

      {/* Right section with sign-in form */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 4,
          }}
        >
          <Box>
            {/* Logo */}
            <Box sx={{ mb: 1 }}>
              <img src={bodybuddyLogo} alt="BodyBuddy Logo" width={60} />
            </Box>

            {/* Welcome message */}
            <Typography>Welcome back!</Typography>

            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Sign In
            </Typography>

            {/* Google Sign In Button */}
            <Button
              variant="contained"
              fullWidth
              type="button"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </Button>

            {/* Divider */}
            <Divider sx={{ width: "100%", mt: 2 }}>or</Divider>

            {/* Email & Password Sign In Form */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSignIn}
              sx={{ mt: 1 }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                // autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <Typography color="error">{error}</Typography>}

              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              sx={{
                color: "text.secondary",
                justifyContent: "flex-start",
                width: "100%",
              }}
            /> */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              {/* Start Here link */}
              <Typography variant="body2">
                Don&apos;t have an account?{" "}
                <Button
                  variant="text"
                  color="primary"
                  component={NavLink}
                  to="/create-program"
                  onClick={() => localStorage.setItem("currentSlide", 0)} // Reset onboarding slide to first slide
                >
                  Start here
                </Button>
              </Typography>
            </Box>
          </Box>
        </Container>

        <Box sx={{ mx: 4 }}>
          {/* Disclaimer */}
          <Typography variant="body2">
            (*) BodyBuddy provides general fitness guidance and real-time
            feedback to help improve your workout form. It is not a substitute
            for professional medical advice, diagnosis, or treatment. Always
            consult your physician before starting a new exercise program,
            especially if you have any pre-existing medical conditions.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

SignIn.propTypes = {
  title: PropTypes.string,
};
