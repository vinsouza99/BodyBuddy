// Reat and Material-UI
import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
// Custom Components for Routine Session
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useLandscapeMode } from './useLandscapeMode';
// Common Components
import { useTheme } from '@mui/material/styles';
// Icons & Images
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const DemoExercise = ({ trigger=false, duration=0, currentExerciseInfo=null, nextExerciseInfo=null, onComplete, skipExercise }) => {
  const theme = useTheme();
  const isLandscapeMode = useLandscapeMode();
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timerKey, setTimerKey] = useState(0); // to reset the timer

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

  const handleSkipExercise = () => {
    setTimerKey(prevKey => prevKey + 1);
    skipExercise();
  };
  
  if (!isVisible || currentExerciseInfo == null ) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        color: '#fff',
      }}
    >
      <Box
        sx={{
          width: '80%',
          display: 'flex',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <Typography
          // variant="h2" 
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: isLandscapeMode ? '1.2rem' : '2rem',
          }}
        >
          <ErrorOutlineIcon style={{ fontSize: 50, marginRight: 10 }} />
          Make sure your whole body is captured by the camera
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          width: '80%',
        }}
      >
        {/* Left Column */}
        <Box
          sx={{
            flexBasis: '70%',
            padding: 2,
          }}
        >
          <Box
            component="img"
            src={currentExerciseInfo.image}
            alt="exercise image"
            sx={{
              width: '100%',
              height: '40vh',
              objectFit: 'contain',
              backgroundColor: 'rgba(255, 255, 255)',
              borderRadius: '15px',
              alignItems: 'left',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              width: '100%',
              marginTop: 3,
            }}
          >
            <Typography
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              Next &gt;
            </Typography>
            <Typography
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {nextExerciseInfo ? nextExerciseInfo.name : 'N/A'}
            </Typography>
            <Typography
              component="div"
              sx={{ 
                fontWeight: "normal",
                display: isLandscapeMode ? 'none' : 'block',
              }}
            >
              {nextExerciseInfo ? nextExerciseInfo.goal : 'N/A'}
            </Typography>
            <Button
              onClick={handleSkipExercise}
              disabled={!nextExerciseInfo} 
              variant="contained"
              type="button"
              sx={{
                marginLeft: 'auto',
              }}
            >
              Skip to next movement
            </Button>
          </Box>
        </Box>

        {/* Right Column */}
        <Box
          sx={{
            flexBasis: '30%',
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CountdownCircleTimer
            key={timerKey}
            isPlaying={isPlaying}
            duration={duration}
            size={isLandscapeMode ? 100 : 180}
            colors={theme.palette.secondary.main}
            onComplete={handleTimerComplete}
          >
            {({ remainingTime }) => (
              <Typography
                component="div"
                sx={{ 
                  fontWeight: "bold",
                  fontSize: isLandscapeMode ? '1.5rem' : '3rem',
                }}
              >
                {remainingTime}
              </Typography>
            )}
          </CountdownCircleTimer>

          <Typography
            component="div"
            sx={{
              fontWeight: "bold", 
              mt: 2,
              fontSize: isLandscapeMode ? '1.5rem' : '2rem',
            }}
          >
            {currentExerciseInfo.name}
          </Typography>
          <Typography
            component="div"
            sx={{
              fontWeight: "normal",
              fontSize: isLandscapeMode ? '1rem' : '1.5rem',
              mt: 2,
              mb: 2,
            }}
          >
            {currentExerciseInfo.goal}
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
      </Box>
    </Box>
  );
};

DemoExercise.propTypes = {
  trigger: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  currentExerciseInfo: PropTypes.object.isRequired,
  nextExerciseInfo: PropTypes.object,
  onComplete: PropTypes.func.isRequired,
  skipExercise: PropTypes.func.isRequired,
};

