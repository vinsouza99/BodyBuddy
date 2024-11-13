import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import { supabase } from "../utils/supabaseClient";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import bodybuddyLogo from "../assets/bodybuddy_logo_color.svg";
import { Onboarding } from "../components/Onboarding";
import { updateUser } from "../controllers/UserController";
import { useAuth } from "../utils/AuthProvider";
import { sendTokenToServer } from "../utils/authUtils";

export const SignUp = (props) => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [userResponses, setUserResponses] = useState({});
  const [isTokenSet, setIsTokenSet] = useState(false);

  // Initialization
  useEffect(() => {
    setPageTitle(props.title);
    setUserResponses(location.state.userResponses);
    console.log(userResponses);
  }, []);

  // Transition to Dashboard when user authentication is successful
  useEffect(() => {
    if (user) {
      // navigate("/dashboard");
      navigate("/dashboard", { state: userResponses });
    }
  }, [user, navigate, isTokenSet]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        throw error;
      }
      console.log(userResponses);

      const { session } = await supabase.auth.getSession();
      if (session?.access_token) {
        await sendTokenToServer(session.access_token);
        setIsTokenSet(true);
      }

      const newUser = {
        id: data.user.id,
        name: name,
        picture: data.user_metadata.profile_picture_url,
        birthday: userResponses.birthday,
        gender: userResponses.gender,
        weight: userResponses.weight,
        weight_unit: userResponses.weight_unit,
        settings: userResponses,
        schedule: userResponses.schedule,
      };
      updateUser(newUser.id, newUser)
        .then((response) => {
          console.log("SUCCESS: User signed up", data, response);
          // navigate("/dashboard", {state : userResponses});
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      setError(error.message);
      console.log("ERROR: User signed up", error);
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

      {/* Right section with sign-up form */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            {/* Logo */}
            <Box sx={{ mb: 1 }}>
              <img src={bodybuddyLogo} alt="BodyBuddy Logo" width={60} />
            </Box>

            {/* Welcome message */}
            <Typography variant="h4" sx={{ width: "60%", margin: "0 auto", marginBottom: 2 }}>
              Sign up to unlock a personalized exercise plan just for you!
            </Typography>

            <Typography component="h1" variant="h3" sx={{ marginBottom: 1 }}>
              Sign Up
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSignUp}
              sx={{ width: "40%", margin: "0 auto" }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
                value={name}
                sx={{ marginTop: 1 }}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                sx={{ marginTop: 1 }}
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
                sx={{ marginTop: 1 }}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <Typography color="error">{error}</Typography>}
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
        <Box sx={{ mx: 4 }}>
          {/* Start Here link */}
          <Typography variant="body2" sx={{ whiteSpace: "nowrap", marginBottom: 1 }}>
            Already have an account?{" "}
            <Button
              variant="text"
              color="primary"
              component={NavLink}
              to="/signin"
              sx={{
                color: "text.primary",
                fontWeight: 700,
                margin: "0",
                padding: "0",
              }}
            >
              Log In
            </Button>
          </Typography>

          {/* Disclaimer */}
          <Typography
            variant="body2"
            sx={{ lineHeight: 1.3, marginLeft: 2, marginRight: 2 }}
          >
            BodyBuddy provides general fitness guidance and real-time feedback
            for form improvement. It is not a substitute for professional
            medical advice, diagnosis, or treatment. Always consult your
            physician before starting a new exercise program, especially if you
            have any pre-existing medical conditions.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

SignUp.propTypes = {
  title: PropTypes.string,
};
