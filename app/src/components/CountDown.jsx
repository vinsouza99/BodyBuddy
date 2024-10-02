import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

export const CountDown = ({ trigger, onComplete }) => {
  const [count, setCount] = useState(3);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
      setCount(3);
    }
  }, [trigger]);

  useEffect(() => {
    let timer;
    if (isVisible && count > 0) {
      timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else if (count === 0) {
      setIsVisible(false);
      // Notify the parent component that the countdown is complete
      onComplete(); 
    }

    return () => clearTimeout(timer);
  }, [count, isVisible]);

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        color: '#fff',
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '10rem' }}>
        {count}
      </Typography>
    </Box>
  );
};

CountDown.propTypes = {
  trigger: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
};

