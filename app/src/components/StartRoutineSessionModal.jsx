// React and Material-UI
import PropTypes from "prop-types";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Modal, Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button, IconButton } from "@mui/material"
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

export const StartRoutineSessionModal = ( {open = false, routineId = null, onClose = false } ) => {
  const navigate = useNavigate();
  const [record, setRecord] = useState(false);

  const handleChange = (event) => {
    setRecord(event.target.value === 'true');
  };

  const handleClose = () => {
    setRecord(false);
    onClose();
  }

  const handleStartRoutine = () => {
    navigate(`/routine/${routineId}`, { state: { record: record } });
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
        <Box textAlign="center">
          {record ? <PhotoCameraIcon fontSize="large" /> : <NoPhotographyIcon fontSize="large" />}
        </Box>
        <Typography textAlign="center">
          Would you like to record your exercise session?
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
          The recordings will be saved in your history for  your personal progress tracking
        </Typography>
        <Button
          variant="contained"
          type="button"
          onClick={() => handleStartRoutine()}
        >
          Start
        </Button>
      </Box>
    </Modal>
  )
}

// Defining prop types
StartRoutineSessionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  routineId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}