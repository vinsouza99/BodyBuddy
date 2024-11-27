// React and Material-UI
import PropTypes from "prop-types";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
// Icons & Images
import CloseIcon from "@mui/icons-material/Close";
import RotateConfirm from "/assets/rotate_confirm.svg";

const modalStyle = {
  // Layout and positioning
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // Box model
  width: "90%",
  maxWidth: "450px",
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

export const RotateConfirmationModal = ({ open = false, onClose = false }) => {
  const handleClose = () => {
    onClose();
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
        <img src={RotateConfirm} alt="Exit confirmation" />
        <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>
          Please rotate your phone to start exercising
        </Typography>
        <Typography textAlign="center">
          Some information will not be displayed as there is mobile screen size
          limit. We recommend using your desktop browser to have the best
          experience.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={handleClose}
            color="primary"
          >
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// Defining prop types
RotateConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
