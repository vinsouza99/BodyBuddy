// React and Material-UI
import PropTypes from "prop-types";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Modal, Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button, IconButton, TextField } from "@mui/material"
// Icons & Images
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';

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

    // TEST
    stateData.id = "0cc22f75-7d4d-4d50-9cdd-4ae3c731c517";
    // stateData.id = "ed999b28-ae50-4009-b29c-c7f6a28857c9";

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
              {record ? <PhotoCameraIcon fontSize="large" /> : <NoPhotographyIcon fontSize="large" />}
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
              onClick={handleStartRoutine} // ルーチンの開始
            >
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