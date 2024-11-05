// React and Material-UI
import PropTypes from "prop-types";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Modal, Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button, IconButton, TextField } from "@mui/material"
// Icons & Images
import CloseIcon from "@mui/icons-material/Close";
import Camera_On from '../assets/camera_on.png';
import Camera_Off from '../assets/camera_off.png';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const modalStyle = {
  // Layout and positioning
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // Box model
  width: 450,
  padding: 4,
  borderRadius: '15px',
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

export const StartRoutineSessionModal = ( {open = false, id = null, idType = "routine", onClose = false } ) => {
  const navigate = useNavigate();
  const [record, setRecord] = useState(false);
  const [reps, setReps] = useState(''); // when exercise type is specified
  const [step, setStep] = useState(1); // step 1 for rep setting, step 2 for recording confirmation

  const handleChange = (event) => {
    setRecord(event.target.value === 'true');
  };

  const handleClose = () => {
    setRecord(false);
    setReps(''); // Reset reps on close
    setStep(1); // Reset step on close
    onClose();
  }

  const handleNextStep = () => {
    setStep(2);
  }

  const handleStartRoutine = () => {
    const stateData = { record, id, idType };

    // If exercise, add sets and reps to the state
    if (idType === 'exercise') {
      stateData.reps = reps;
      stateData.idType = 'exercise';
    }

    navigate(`/routine`, { state: stateData });
  }

  return (
    <Modal 
      open={open}
      onClose={handleClose}
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
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Step 1: If type is exercise, ask for reps */}
        {idType === 'exercise' && step === 1 && (
          <>
            <Typography textAlign="center">
              Please specify the reps for this exercise:
            </Typography>
            <TextField
              label="Reps"
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              type="button"
              onClick={handleNextStep}
              disabled={!reps}
            >
              Next
            </Button>
          </>
        )}

        {/* Step 2: Recording confirmation for both exercise and routine */}
        {(idType === 'routine' || step === 2) && (
          <>
            <Box textAlign="center">
              { record ? <img src={Camera_On} alt="Camera On" /> : <img src={Camera_Off} alt="Camera Off" /> }
            </Box>
            <Typography textAlign="center">
              Would you like to record your {idType === 'exercise' ? 'exercise' : 'routine'} session?
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="options"
                name="radio-buttons-group"
                value={record}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <Typography textAlign="center">
              The recordings will be saved in your history for your personal progress tracking.
            </Typography>
            <Button
              variant="contained"
              type="button"
              onClick={handleStartRoutine}
            >
              <PlayArrowIcon sx={{ marginRight: "0.5rem" }}/>
              Start
            </Button>
          </>
        )}

      </Box>
    </Modal>
  )
}

// Defining prop types
StartRoutineSessionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  idType: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}