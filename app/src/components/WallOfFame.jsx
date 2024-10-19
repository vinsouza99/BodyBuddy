import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import badge1 from '../assets/badge_1.png';
import badge3 from '../assets/badge_3.png';

export const WallOfFame = () => {
  const badgeSets = [
    [...Array(5)].map((_, index) => ({ src: badge1, alt: `Badge ${index + 1}` })),
    [...Array(5)].map((_, index) => ({ src: badge3, alt: `Badge ${index + 6}` })),
  ];
  const [currentSet, setCurrentSet] = useState(0);

  const handleNext = () => {
    setCurrentSet((prevSet) => (prevSet + 1) % badgeSets.length);
  };

  const handlePrevious = () => {
    setCurrentSet((prevSet) => (prevSet - 1 + badgeSets.length) % badgeSets.length);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        gap: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Wall of Fame
      </Typography>
      <Box
        sx={{
          display: 'flex',
          direction: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <IconButton
          sx={{
            "&:focus": { outline: 'none' },
            "&:hover": { backgroundColor: 'transparent' },
          }}
          onClick={handlePrevious}
        >
          <ArrowBackIosNewIcon />
        </IconButton>        
        {badgeSets[currentSet].map((badge, index) => (
          <Box
            key={index}
            sx={{
              maxWidth: '15%',
              flex: '1 1 auto',
            }}
          >
            <img
              src={badge.src}
              alt={badge.alt}
              style={{ 
                width: '100%',
                maxWidth: '70px',
                height: 'auto',
                objectFit: 'contain',
              }} 
            />
          </Box>
        ))}
        <IconButton 
          onClick={handleNext}
          sx={{
            "&:focus": { outline: 'none' },
            "&:hover": { backgroundColor: 'transparent' },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>

      </Box>
      <Typography>
        Keep up with your exercise plan to earn new surprises
      </Typography>
    </Box>
  );
};