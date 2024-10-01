import PropTypes from "prop-types";
import { Box, Typography } from '@mui/material';
import { useEffect, useState, useRef } from 'react';

export const AngleMeter = ({ hipKneeAngle }) => {
  const [displayedAngle, setDisplayedAngle] = useState(180);
  const [heightPercentage, setHeightPercentage] = useState(0);
  const animationFrameRef = useRef(null);

  const updateHeightAndAngle = () => {
    // Normalize so that 170 degrees is the maximum and 90 degrees is the minimum.
    const normalizedHeight = ((Math.max(Math.min(Number(hipKneeAngle), 170), 90) - 90) / (170 - 90)) * 100;
    setHeightPercentage(normalizedHeight);

    setDisplayedAngle((prevAngle) => {
      const step = (hipKneeAngle - prevAngle) * 0.1;
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
  }, [hipKneeAngle]);

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ height: '200px', width: '30px', backgroundColor: '#ddd', position: 'relative' }}>
        {/* Progress Bar */}
        <Box
          sx={{
            height: `${heightPercentage}%`,
            width: '100%',
            backgroundColor: '#FF5722',
            position: 'absolute',
            bottom: 0,
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
  hipKneeAngle: PropTypes.number.isRequired,
};
