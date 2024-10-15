import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import { supabase } from "../utils/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Divider,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
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
            <Divider sx={{ width: "100%", my: 2 }}>or</Divider>

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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{
                  color: "text.secondary",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link to="/signup">
                    Don&apos;t have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box mt={5}>
            <Copyright />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

SignIn.propTypes = {
  title: PropTypes.string,
};
