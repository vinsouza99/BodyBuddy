import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

export const RestTime = ({ title = "Rest Timer", trigger, duration, onComplete }) => {
  const [count, setCount] = useState(duration);
  const [isVisible, setIsVisible] = useState(false);

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
        top: '50%',
        left: '50%',
        width: '30%',
        height: '30%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        color: '#fff',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Typography
        variant="h6" 
        component="div"
        sx={{ fontWeight: "bold" }}
      >
        {title}
      </Typography>
      <Typography 
        variant="h4" 
        component="div"
        sx={{ fontWeight: "bold" }}
      >
        {count}
      </Typography>
    </Box>
  );
};

RestTime.propTypes = {
  title: PropTypes.string,
  trigger: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
};

