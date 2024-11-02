// React and Material-UI
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Modal, Box, Typography, Button } from "@mui/material"
// Custom Components for Routine Session
import { MetricCard } from "./MetricCard";
import { useLandscapeMode } from "./useLandscapeMode";
// Icons & Images
import Completed from "../../assets/completed.png";
import Mins from "../../assets/mins.png";
import Calories from "../../assets/calories.png";
import Score from "../../assets/score.png";
import BG from "../../assets/bg_light.png";

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
  gap: 8,
  // Visual effects
  bgcolor: "background.paper",
  boxShadow: 24,
  backgroundImage: `url(${BG})`,
  backgroundSize: 'cover',
};

export const CompleteRoutineSessionModal = ( {open = false, onComplete = false, mins = 0, calorie = 0, score = 0 } ) => {
  const isLandscapeMode = useLandscapeMode();
  const navigate = useNavigate();

  const handleComplete = () => {
    onComplete();
    navigate("/training");
  }

  return (
    <Modal 
      open={open}
      
    >
      <Box sx={modalStyle}>
        <Box
          component="img"
          src={Completed}
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
            gap: 10, 
            width: '450px',
          }}>
          <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <img src={Mins} alt="mins" style={{ width: "45px", height: "45px", marginBottom: "4px" }}/>
            <MetricCard title="Mins" color="black" value={mins}/>
          </Box>
          <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <img src={Calories} alt="calories" style={{ width: "37px", height: "45px", marginBottom: "4px" }}/>
            <MetricCard title="Calories" color="black" value={calorie} />
          </Box>
          <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <img src={Score} alt="score" style={{ width: "45px", height: "45px", marginBottom: "4px" }}/>
            <MetricCard title="Score" color="black" value={score} />
          </Box>
        </Box>
        {/* <Button 
          variant="outlined" 
          sx={{
            width: '250px',
          }} 
          onClick={() => {navigate("/training")}}
        >
          View My Program
        </Button> */}
        <Button
          variant="contained" 
          sx={{ 
            width: '250px',
          }} 
          onClick={handleComplete}
        >
          View My Program 
        </Button>
      </Box>
    </Modal>
  )
}

// Defining prop types
CompleteRoutineSessionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  mins: PropTypes.number.isRequired,
  calorie: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
}