import PropTypes from "prop-types";
import { Box, Typography } from '@mui/material';
import { useEffect, useState, useRef } from 'react';

export const AngleMeter = ({ angle = 180, minAngle = 90, maxAngle = 170 }) => {
  const [displayedAngle, setDisplayedAngle] = useState(maxAngle);
  const [heightPercentage, setHeightPercentage] = useState(0);
  const animationFrameRef = useRef(null);

  const updateHeightAndAngle = () => {
    // Normalize based on the maxAngle and minAngle props
    const normalizedHeight = ((Math.max(Math.min(Number(angle), maxAngle), minAngle) - minAngle) / (maxAngle - minAngle)) * 100;
    setHeightPercentage(normalizedHeight);

    setDisplayedAngle((prevAngle) => {
      const step = (angle - prevAngle) * 0.1;
      return prevAngle + step;
    });
  };

  useEffect(() => {
    const animate = () => {
      updateHeightAndAngle();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Clean up
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [angle, maxAngle, minAngle]);

  return (
    <Box 
      sx={{ 
        position: 'relative', 
        display: 'inline-flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        height: '100%',
        justifyContent: 'space-between'
      }}
    >
      {/* Progress Bar */}
      <Box 
        sx={{ 
          height: '300px',
          width: '30px', 
          backgroundColor: '#ddd', 
          position: 'relative', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}
      >
        <Box
          sx={{
            height: `${heightPercentage}%`,
            width: '100%',
            backgroundColor: '#FF5722',
            transition: 'height 0.1s ease',
          }}
        />
      </Box>
      {/* Angle (Number) */}
      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: 'bold', color: 'white', mt: 2 }}
      >
        {`${Math.round(displayedAngle)}°`}
      </Typography>
    </Box>
  );
};

AngleMeter.propTypes = {
  angle: PropTypes.number.isRequired,
  maxAngle: PropTypes.number,
  minAngle: PropTypes.number,
};

