import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import { supabase } from "../utils/supabaseClient";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import bodybuddyLogo from "../assets/bodybuddy_logo_color.svg";
import { Onboarding } from "../components/Onboarding";
import { createUser, updateUser } from "../controllers/UserController";
import { useAuth } from "../utils/AuthProvider";

export const SignUp = (props) => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [userResponses, setUserResponses] = useState({});

  // Initialization
  useEffect(() => {
    setPageTitle(props.title);
    setUserResponses(location.state.userResponses);
    console.log(userResponses);
  }, []);

  // Transition to Dashboard when user authentication is successful
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

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
      console.log(data);
      const newUser = {
        id: data.user.id,
        name: name,
        profile_picture_URL: data.profile_picture_url,
        birthday: userResponses.birthday,
        gender: userResponses.gender,
        weight: userResponses.weight,
        weight_unit: userResponses.weight_unit,
        settings: userResponses,
      };
      updateUser(newUser.id, newUser)
        .then((response) => {
          console.log("SUCCESS: User signed up", data, response);
          navigate("/training", userResponses);
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
      <Grid item size={{ xs: 12, md: 6 }}>
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
            <Typography>
              We have created a perfect exercise plan for you!
            </Typography>

            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Sign Up
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSignUp}
              sx={{ mt: 1 }}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>

              {/* Start Here link */}
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

SignUp.propTypes = {
  title: PropTypes.string,
};
