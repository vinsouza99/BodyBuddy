import PropTypes from "prop-types";
import { useState, useEffect, useRef } from 'react';
import { Box, Typography, IconButton, Modal, Button } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BadgePlaceholder from '../assets/badge_placeholder.png';
import Badge1 from '../assets/badge_id_01.png';

const modalStyle = {
  // Layout and positioning
  position: "absolute",
  top: '50%',
  left: '50%',
  transform: "translate(-50%, -50%)",
  // Box model
  width: '85%',
  height: '85%',
  padding: 4,
  borderRadius: '15px',
  overflowY: 'auto',
  // Flexbox alignment
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'start',
  justifyContent: 'center',
  columnGap: 8,
  rowGap: 4,
  // Visual effects
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export const WallOfFame = ({ userInfo = {} }) => {
  const [showAllBadges, setshowAllBadges] = useState(false);
  const [badges, setBadges] = useState([]); // Add badge user already earned to this array
  const [itemsToShow, setItemsToShow] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const boxRef = useRef(null); // for ResizeObserver

  useEffect(() => {
    // Add badge user already earned to badges array    
    if (userInfo?.achievements) {
      const earnedBadges = userInfo.achievements.map((achievement) => ({
        id: achievement?.achievement_id,
        name: achievement?.name,
        src: Badge1,
        alt: achievement?.name,
      }));
      console.log(earnedBadges);
      setBadges(earnedBadges);
    }
    // ResizeObserver to adjust the number of items to show
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      setItemsToShow(width < 500 ? 3 : 5);
    });

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, [userInfo]);

  const canNavigate = badges.length > itemsToShow;

  const handleNext = () => {
    if (canNavigate) {
      setCurrentIndex((prevIndex) => (prevIndex + itemsToShow) % badges.length);
    }
  };

  const handlePrevious = () => {
    if (canNavigate) {
      setCurrentIndex((prevIndex) => (prevIndex - itemsToShow + badges.length) % badges.length);
    }
  };

  // Close AllBadges Modal
  const handleCloseAllBadges = () => {
    setshowAllBadges(false);
  };

  const displayBadges = badges
  .slice(currentIndex, currentIndex + itemsToShow)
  .concat(
    Array(Math.max(0, itemsToShow - badges.slice(currentIndex, currentIndex + itemsToShow).length))
      .fill({ id: '', name: '', src: '', alt: 'Placeholder' })
  );

  const numberOfAllBadges = 30;
  const displayAllBadges = badges
    .slice(0, numberOfAllBadges)
    .concat(
      Array(Math.max(0, numberOfAllBadges - badges.length))
        .fill({ id: '', name: '', src: BadgePlaceholder, alt: 'Placeholder' })
    )
    .slice(0, numberOfAllBadges);

  return (
    <>
      <Box
        ref={boxRef}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: 4,
        }}
      >
        <Typography variant="h6">
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
              padding: 0,
              "&:focus": { outline: 'none' },
              "&:hover": { backgroundColor: 'transparent' },
            }}
            onClick={handlePrevious}
            disabled={!canNavigate}
          >
            <ArrowBackIosNewIcon />
          </IconButton>        
          {displayBadges.map((badge, index) => (
            <Box
              key={index}
              sx={{
                maxWidth: '15%',
                flex: '1 1 auto',
                opacity: badge.src ? 1 : 0.8,
              }}
            >
              <img
                src={badge.src || BadgePlaceholder}
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
            sx={{
              padding: 0,
              "&:focus": { outline: 'none' },
              "&:hover": { backgroundColor: 'transparent' },
            }}
            onClick={handleNext}
            disabled={!canNavigate}
          >
            <ArrowForwardIosIcon />
          </IconButton>

        </Box>
        <Typography>
          Keep up with your exercise plan to earn new surprises
        </Typography>
        <Button
          variant="contained" 
          sx={{ 
            width: '50%',
          }}
          onClick={() => {
            badges.map((badge) => (
              console.log(`Badges: ${badge}`)
            ));
            setshowAllBadges(true)}
          }
        >
          View All
        </Button>        
      </Box>

      {/* Show all badges model */}
      <Modal 
        open={showAllBadges}
        onClose={handleCloseAllBadges}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
            },
          },
        }}
      >
        <Box sx={modalStyle}>
          <IconButton
            aria-label="close"
            onClick={handleCloseAllBadges}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          
          <Box sx={{width: "100%", textAlign: "center"}}>
            <Typography variant="h6" gutterBottom>
              Wall of Fame
            </Typography>
            <Typography>
              Keep up with your exercise plan to earn new surprised
            </Typography>
          </Box>

          {/* Listed All Badges */}
          {displayAllBadges.map((badge, index) => (
            <Box key={index}>
              <img
                src={badge.src || BadgePlaceholder}
                alt={badge.alt}
              />
              <Typography sx={{textAlign: "center"}}>
                {badge.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Modal>
    </>
  );
};

WallOfFame.propTypes = {
  userInfo: PropTypes.object,
};