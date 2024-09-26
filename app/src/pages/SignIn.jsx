import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container, Card, CardContent, Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';

const theme = createTheme({
  palette: {
    primary: {
      main: '#37474F',
    },
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © BodyBuddy '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }

      console.log('SUCCESS: User signed in', data);
      navigate('/dashboard');

    } catch (error) {
      setError(error.message);
      console.log('ERROR: User signed in', error);
    }
  };
  
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          prompt: 'select_account'  // For testing, always disokay consent page
        }
      });
      
      if (error) {
        throw error;
      }
      console.log('SUCCESS: User signed in with Google', data);
      navigate('/dashboard');

    } catch (error) {
      setError(error.message);
      console.log('ERROR: User signed in with Google', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card sx={{ boxShadow: 3 }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
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
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#4285F4',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#357ae8',
                  },
                }}
              >
                Sign in with Google
              </Button>

              {/* Divider */}
              <Divider sx={{ width: '100%', my: 2 }}>or</Divider>

              {/* Email & Password Sign In Form */}
              <Box component="form" noValidate onSubmit={handleSignIn} sx={{ mt: 1 }}>
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
                    color: 'text.secondary',
                    justifyContent: 'flex-start',
                    width: '100%',
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
    </ThemeProvider>
  );
};
