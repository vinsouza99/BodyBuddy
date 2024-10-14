// Reat and Material-UI
import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
// Custom Components for Routine Session
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
// Common Components
import { useTheme } from '@mui/material/styles';
// Icons & Images
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";

export const RestTime2 = ({ title = "Time for resting", trigger, duration, onComplete }) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
      setIsPlaying(true);
    }
  }, [trigger]);

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const handleTimerComplete = () => {
    setIsVisible(false);
    onComplete();
  };
  
  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        color: '#fff',
      }}
    >
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        colors={theme.palette.secondary.main}
        onComplete={handleTimerComplete}
      >
        {({ remainingTime }) => (
          <Typography
            variant="h1"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {remainingTime}
          </Typography>
        )}
      </CountdownCircleTimer>
      <Typography
        variant="h6" 
        component="div"
        sx={{ fontWeight: "bold", mt: 5 }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Puase & Play */}
        <IconButton 
          onClick={togglePlayPause}
          onMouseDown={(e) => e.preventDefault()}
          style={{ fontSize: 50, color: "#fff" }}>
          {isPlaying ? (
            <PauseCircleOutlineIcon style={{ fontSize: 50 }} />
          ) : (
            <PlayCircleOutlineIcon style={{ fontSize: 50 }} />
          )}
        </IconButton>

        {/* Next Exercise */}
        <IconButton 
          onClick={handleTimerComplete}
          onMouseDown={(e) => e.preventDefault()}
          style={{ fontSize: 50, color: "#fff" }}>
          <SkipNextOutlinedIcon style={{ fontSize: 50 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

RestTime2.propTypes = {
  title: PropTypes.string,
  trigger: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
};

