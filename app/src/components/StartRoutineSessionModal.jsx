// React and Material-UI
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import theme from "../theme";
// Icons & Images
import CloseIcon from "@mui/icons-material/Close";
import Camera_On from "/assets/camera_on.svg";
import Camera_Off from "/assets/camera_off.svg";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { RotateConfirmationModal } from "./routine-session/RotateConfirmationModal";

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

export const StartRoutineSessionModal = ({
  open = false,
  id = null,
  idType = "routine",
  onClose = false,
}) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [record, setRecord] = useState(false);
  const [openRotateConfirmation, setOpenRotateConfirmation] = useState(true);

  // Immediately start routine if idType is 'exercise'
  useEffect(() => {
    if (
      idType === "exercise" &&
      open &&
      (!isMobile || !openRotateConfirmation)
    ) {
      handleStartRoutine();
    }
  }, [idType, open, isMobile, openRotateConfirmation]);

  const handleChange = (event) => {
    setRecord(event.target.value === "true");
  };

  const handleClose = () => {
    setRecord(false);
    onClose();
  };

  const handleStartRoutine = () => {
    const stateData = { record, id, idType };
    navigate(`/routine`, { state: stateData });
  };

  return (
    <>
      {open && isMobile && openRotateConfirmation && (
        <RotateConfirmationModal
          open={isMobile}
          onClose={() => {
            setOpenRotateConfirmation(false);
          }}
        />
      )}

      {idType === "routine" &&
        open &&
        (!isMobile || !openRotateConfirmation) && (
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

              {idType === "routine" && (
                <>
                  <Box textAlign="center">
                    {record ? (
                      <img src={Camera_On} alt="Camera On" />
                    ) : (
                      <img src={Camera_Off} alt="Camera Off" />
                    )}
                  </Box>
                  <Typography textAlign="center">
                    Would you like to record your{" "}
                    {idType === "exercise" ? "exercise" : "routine"} session?
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="options"
                      name="radio-buttons-group"
                      value={record}
                      onChange={handleChange}
                      row
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Typography textAlign="center" sx={{fontSize: "0.8rem"}}>
                    The recordings will be saved in your history for your
                    personal progress tracking.
                  </Typography>
                  <Button
                    variant="contained"
                    type="button"
                    onClick={handleStartRoutine}
                  >
                    <PlayArrowIcon sx={{ marginRight: "0.5rem" }} />
                    Start
                  </Button>
                </>
              )}
            </Box>
          </Modal>
        )}
    </>
  );
};

// Defining prop types
StartRoutineSessionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  idType: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
