// Reat and Material-UI
import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
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

const modalStyle = {
  // Layout and positioning
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1000,
  // Box model
  width: '100vw',
  height: '100vh',
  padding: 4,
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  // Flexbox alignment
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 2,
  // Visual effects
  color: '#fff',
};

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
    <Modal 
      open={trigger}
    >
      <Box sx={modalStyle}>
        <Box
          sx={{
            width: '90%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography
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
            width: '90%',
            gap: 2,
          }}
        >
          {/* Left Column */}
          <Box
            sx={{
              flexBasis: '70%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box
              component="img"
              src={currentExerciseInfo.image}
              alt="exercise image"
              sx={{
                width: '100%',
                height: '50vh',
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
              }}
            >
              <Typography
                sx={{ fontWeight: "bold" }}
              >
                Next &gt;
              </Typography>
              <Typography
                sx={{ fontWeight: "bold" }}
              >
                {nextExerciseInfo ? nextExerciseInfo.name : 'N/A'}
              </Typography>
              <Typography
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
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: isLandscapeMode ? 1 : 2,
            }}
          >
            <CountdownCircleTimer
              key={timerKey}
              isPlaying={isPlaying}
              duration={duration}
              size={isLandscapeMode ? 100 : 180}
              strokeWidth={isLandscapeMode ? 6 : 8}
              colors={theme.palette.secondary.main}
              onComplete={handleTimerComplete}
            >
              {({ remainingTime }) => (
                <Typography
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
              textAlign="center"
              sx={{
                fontWeight: "bold", 
                fontSize: isLandscapeMode ? '1.0rem' : '2rem',
              }}
            >
              {currentExerciseInfo.name}
            </Typography>
            <Typography
              textAlign="center"
              sx={{
                fontWeight: "normal",
                fontSize: isLandscapeMode ? '1rem' : '1.5rem',
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
    </Modal>
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

