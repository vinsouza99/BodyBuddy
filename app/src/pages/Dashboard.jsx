// Reat and Material-UI
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Grid2, Box, Typography } from '@mui/material';
// Gadgets Components
import { GadgetSchedule } from '../components/GadgetSchedule';
import { GadgetFavourite } from '../components/GadgetFavourite';
import { GadgetAchievement } from '../components/GadgetAchievement';
import { GadgetHistory } from '../components/GadgetHistory';
// Common Components
import { useAuth } from "../utils/AuthProvider.jsx";
import { setPageTitle } from "../utils/utils";

export const Dashboard = (props) => {
  const { user } = useAuth(); // For session management
  const navigate = useNavigate();

  // Initialization
  useEffect(() => {
    setPageTitle(props.title);
  }, []);

  // Remove hash from URL after Google OAuth redirect
  useEffect(() => {
    if (window.location.href.includes('#')) {
      navigate(window.location.pathname, { replace: true });
    }
  }, [navigate]);

  return (
    <>
    <Grid2 container spacing={2} >
      {/* LEFT COLUMN */}
      <Grid2 size={{xs:12, md:6}} >
        <Box
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 2,
          }
        }>
          {/* ADD GADGETS HERE */}
          <Box
            sx={{ 
              display: 'flex', 
              flexDirection: 'row',
              gap: 2,
              alignItems: 'center',}}
          >
            <img src={user.user_metadata.avatar_url} alt="avatar" style={{width: '100px', height: '100px', borderRadius: '50%'}} />
            <Typography variant="h2" textAlign="left" >Hi, {user.user_metadata.full_name}!</Typography>
          </Box>
          
          <GadgetSchedule />
          <GadgetFavourite />
        </Box>
      </Grid2>

      {/* EIGHT COLUMN */}
      <Grid2 size={{xs:12, md:6}} >
        <Box
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 2,
          }
        }>
          {/* ADD GADGETS HERE*/}
          <GadgetAchievement />
          <GadgetHistory />
        </Box>
      </Grid2>
    </Grid2>
    </>
  );
};

Dashboard.propTypes = {
  title: PropTypes.string,
};
