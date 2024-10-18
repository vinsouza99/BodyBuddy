// React and Material-UI
import PropTypes from "prop-types";
import { Modal, Box, Typography, Button } from "@mui/material"
// Custom Components for Routine Session
import { MetricCard } from "./MetricCard";
import { useLandscapeMode } from "./useLandscapeMode";
// Icons & Images
import BodyBuddy from "../../assets/bodybuddy_logo_color.svg";

const modalStyle = {
  // Layout and positioning
  position: 'fixed',
  top: 0,
  left: 0,
  // Box model
  width: '100vw',
  height: '100vh',
  padding: 4,
  // Flexbox alignment
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  // Visual effects
  bgcolor: "background.paper",
  boxShadow: 24,
};

export const CompleteRoutineSessionModal = ( {open = false, onComplete = false } ) => {
  const isLandscapeMode = useLandscapeMode();

  const handleComplete = () => {
    onComplete();
  }

  return (
    <Modal 
      open={open}
    >
      <Box sx={modalStyle}>
        <Box
          component="img"
          src={BodyBuddy}
          alt="Completed Exercise"
          sx={{
            maxHeight: isLandscapeMode ? '80px' : '250px',
            objectFit: 'contain',
          }}
        />
        <Typography
          sx={{
            fontWeight: 'normal',
            fontSize: isLandscapeMode ? '1rem' : '1.2rem',
            textAlign: 'center',
            width: '450px',
          }}>
          Awesome! You&apos;e nailed the basics—now you&apos;re ready to take on more with confidence!
        </Typography>
        <Box 
          sx={{
            display: 'flex', 
            justifyContent: 'center', 
            gap: 4, 
            width: '450px',
          }}>
          <MetricCard title="Mins" color="black" />
          <MetricCard title="Calories" color="black" />
          <MetricCard title="Score" color="black" />
        </Box>
        <Button 
          variant="outlined" 
          sx={{
            width: '250px',
          }} 
          disabled
        >
          Check my upcoming schedule
        </Button>
        <Button
          variant="contained" 
          sx={{ 
            width: '250px',
          }} 
          onClick={handleComplete}
        >
          Home  
        </Button>
      </Box>
    </Modal>
  )
}

// Defining prop types
CompleteRoutineSessionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
}