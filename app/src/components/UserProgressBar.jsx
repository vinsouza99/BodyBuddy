import PropTypes from "prop-types";
import { Box, Typography, Avatar, LinearProgress } from '@mui/material';
import { useAuth } from "../utils/AuthProvider.jsx";

export const UserProgressBar = ({ level = 0, levelProgress = 0 }) => {
  const { user } = useAuth();

  return (
    <Box
      sx={{ 
        display: 'flex', 
        flexDirection: 'row',
        width: '100%',
        gap: 2,
        alignItems: 'center',
        marginTop: 2.5, // Adjustment
        marginBottom: 2.5, // Adjustment
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{ display: 'flex', marginBottom: 1, flexDirection: { xs: 'column', lg: 'row' }, justifyContent: 'space-between' }}
        >
          <Typography textAlign="left" sx={{ fontWeight: "800" }}>Level {level}</Typography>
          <Typography textAlign="left" >Earn {100-levelProgress} points to level up</Typography>
        </Box>
        <Box sx={{ width: '100%', position: 'relative'}}>
          <LinearProgress
            variant="determinate"
            value={levelProgress}
            valueBuffer={100}
            sx={{
              '--LinearProgress-radius': '8px',
              '--LinearProgress-progressThickness': '30px',
              height: '20px',
              boxShadow: 'sm',
              borderRadius: '15px',
              '& .MuiLinearProgress-bar': {
                backgroundImage: 'linear-gradient(to right, #2d90e0, #abd3f3)',
              },
              backgroundColor: 'grey.300',
            }}
          >
          </LinearProgress>
          <Typography
            color="text.primary"
            sx={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              textAlign: 'center',
              lineHeight: '20px',
            }}
          >
            {`${levelProgress} / 100`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

UserProgressBar.propTypes = {
  level: PropTypes.number,
  levelProgress: PropTypes.number,
};