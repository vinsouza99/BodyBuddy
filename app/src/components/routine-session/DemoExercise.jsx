// Reat and Material-UI
import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
// Custom Components for Routine Session
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
// Common Components
import { useTheme } from '@mui/material/styles';
// Icons & Images
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const DemoExercise = ({ trigger, duration, currentExerciseInfo, nextExerciseInfo, onComplete, skipExercise }) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timerKey, setTimerKey] = useState(0); // to reset the timer

  useEffect(() => {
    console.log(`Rest timer triggered: ${duration} seconds`);
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
      <Box
        sx={{
          width: '80%',
          display: 'flex',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <Typography
          variant="h2" 
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
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
              height: '500px',
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
              gap: 2,
              width: '100%',
              marginTop: 3,
            }}
          >
            <Typography
              variant="h6" 
              component="div"
              sx={{ fontWeight: "bold", mr: 5 }}
            >
              Next &gt;
            </Typography>
            <Typography
              variant="h6" 
              component="div"
              sx={{ fontWeight: "bold", mr: 5 }}
            >
              {nextExerciseInfo ? nextExerciseInfo.name : 'No Exercise Available'}
            </Typography>
            <Typography
              variant="h6" 
              component="div"
              sx={{ fontWeight: "normal", mr: 5 }}
            >
              {nextExerciseInfo ? nextExerciseInfo.goal : 'No Exercise Available'}
            </Typography>
            <Button
              onClick={handleSkipExercise}
              disabled={!nextExerciseInfo} 
              variant="contained"
              type="button"
              sx={{
                fontSize: theme.typography.h6.fontSize,
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
            variant="h1" 
            component="div"
            sx={{ fontWeight: "bold", mt: 5 }}
          >
            {currentExerciseInfo.name}
          </Typography>
          <Typography
            variant="h6" 
            component="div"
            sx={{ fontWeight: "normal", mt: 2, mb: 5 }}
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
  nextExerciseInfo: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  skipExercise: PropTypes.func.isRequired,
};

