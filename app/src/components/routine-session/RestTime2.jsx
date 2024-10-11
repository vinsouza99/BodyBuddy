import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useTheme } from '@mui/material/styles';

export const RestTime2 = ({ title = "Time for resting", trigger, duration, onComplete }) => {
  const [count, setCount] = useState(duration);
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    console.log(`Rest timer triggered: ${duration} seconds`);
    if (trigger) {
      setIsVisible(true);
      setCount(duration);
    }
  }, [trigger]);

  useEffect(() => {
    let timer;
    if (isVisible && count > 0) {
      timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else if (count === 0 && isVisible) {
      setIsVisible(false);
      // Notify the parent component that the countdown is complete
      onComplete(); 
    }

    return () => clearTimeout(timer);
  }, [count, isVisible, onComplete]);

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
      <Typography
        variant="h6" 
        component="div"
        sx={{ fontWeight: "bold", mb: 5 }}
      >
        {title}
      </Typography>
      <CountdownCircleTimer
        isPlaying={trigger}
        duration={duration}
        colors={theme.palette.secondary.main}
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
    </Box>
  );
};

RestTime2.propTypes = {
  title: PropTypes.string,
  trigger: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
};

