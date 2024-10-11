import PropTypes from "prop-types";
import { Box, Typography } from '@mui/material';
import { useEffect, useState, useRef } from 'react';

export const AngleMeter2 = ({ angle = 180, minAngle = 90, maxAngle = 170 }) => {
  const [displayedAngle, setDisplayedAngle] = useState(maxAngle);
  const [widthPercentage, setWidthPercentage] = useState(0);
  const animationFrameRef = useRef(null);

  const updateWidthAndAngle = () => {
    // Normalize based on the maxAngle and minAngle props
    const normalizedWidth = ((Math.max(Math.min(Number(displayedAngle), maxAngle), minAngle) - minAngle) / (maxAngle - minAngle)) * 100;
    setWidthPercentage(normalizedWidth);

    setDisplayedAngle((prevAngle) => {
      const step = (angle - prevAngle) * 0.1;
      return prevAngle + step;
    });
  };

  useEffect(() => {
    const animate = () => {
      updateWidthAndAngle();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Clean up
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [angle, maxAngle, minAngle]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        height: '100%',
      }}
    >
      <Typography
        variant="h2"
        component="div"
        sx={{ 
          fontWeight: 'bold', 
          color: 'white',
          textAlign: 'left',
        }}
      >
        {`${Math.round(widthPercentage)}% Posture corrects`}
      </Typography>
      <Box 
        sx={{ 
          position: 'relative', 
          display: 'inline-flex', 
          flexDirection: 'row',
          alignItems: 'center', 
          width: '100%',
          border: '1px solid #ccc',
        }}
      >
        {/* Progress Bar */}
        <Box 
          sx={{ 
            width: '100%',
            height: '15px',
            position: 'relative', 
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start'
          }}
        >
          <Box
            sx={{
              width: `${widthPercentage}%`,
              height: '100%',
              backgroundColor: '#FF5722',
              transition: 'width 0.1s ease',
            }}
          />
        </Box>
      </Box>
    </Box>          
  );
};

AngleMeter2.propTypes = {
  title: PropTypes.string,
  angle: PropTypes.number.isRequired,
  maxAngle: PropTypes.number,
  minAngle: PropTypes.number,
};