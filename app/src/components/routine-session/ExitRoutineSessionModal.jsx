// React and Material-UI
import PropTypes from "prop-types";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material"
// Icons & Images
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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

export const ExitRoutineSessionModal = ( {open = false, onClose = false, onComplete = false } ) => {
  const handleClose = () => {
    onClose();
  }

  const handleComplete = () => {
    onComplete();
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
        <ErrorOutlineIcon style={{ fontSize: 50 }} />
        <Typography textAlign="center">
          You haven&apos;t completed the routine yet. Save progress and continue later?
        </Typography>
        <Button variant="outlined" color="secondary" fullWidth disabled>
          Save and continue later
        </Button>
        <Button variant="contained" onClick={handleComplete} color="primary" fullWidth>
          Exit
        </Button>
      </Box>
    </Modal>
  )
}

// Defining prop types
ExitRoutineSessionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
}