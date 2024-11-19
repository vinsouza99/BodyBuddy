// React and Material-UI
import PropTypes from "prop-types";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
// Icons & Images
import CloseIcon from "@mui/icons-material/Close";
import ExitConfirm from "/assets/exit_confirm.svg";

const modalStyle = {
  // Layout and positioning
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // Box model
  width: 450,
  padding: 4,
  borderRadius: "15px",
  // Flexbox alignment
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  // Visual effects
  bgcolor: "background.paper",
  boxShadow: 24,
};

export const ExitRoutineSessionModal = ({
  open = false,
  onClose = false,
  onComplete = false,
}) => {
  const handleClose = () => {
    onClose();
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        },
      }}
    >
      <Box sx={modalStyle}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <img src={ExitConfirm} alt="Exit confirmation" />
        <Typography textAlign="center">
          You haven&apos;t completed the routine yet. Save progress and continue
          later?
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleComplete}
            color="primary"
            fullWidth
          >
            Exit
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            color="primary"
            fullWidth
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// Defining prop types
ExitRoutineSessionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};
