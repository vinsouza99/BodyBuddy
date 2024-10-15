import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import { supabase } from "../utils/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Container,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import GoogleIcon from "@mui/icons-material/Google";
import bodybuddyLogo from "../assets/bodybuddy_logo_color.svg";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3000/";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © BodyBuddy "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle(props.title);
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      console.error("User failed to signed in", error);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          prompt: "select_account", // For testing, always display consent page
          redirectTo: `${BASE_URL}dashboard/`,
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
    <>
      <Grid size={{ xs: 12, md: 8 }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 4,
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSignIn}
            sx={{ mt: 1 }}
          >
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

            {/* Sign In link */}
            <Typography variant="body2">
              Don't have an account?{" "}
              <Button
                onClick={() => setIsSignIn(true)} // Set state to true when Sign In is clicked
                variant="text"
                color="primary"
                component={NavLink}
                to="/create-program"
              >
                Start here
              </Button>
            </Typography>
          </Box>
        </Container>
      </Grid>
      <Box>
        {/* Disclaimer */}
        <Typography variant="body2">
          (*) BodyBuddy provides general fitness guidance and real-time feedback
          to help improve your workout form. It is not a substitute for
          professional medical advice, diagnosis, or treatment. Always consult
          your physician before starting a new exercise program, especially if
          you have any pre-existing medical conditions.
        </Typography>
      </Box>
    </>
  );
};

SignIn.propTypes = {
  title: PropTypes.string,
};
