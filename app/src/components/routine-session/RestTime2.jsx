// Reat and Material-UI
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
// Custom Components for Routine Session
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useLandscapeMode } from "./useLandscapeMode";
// Icons & Images
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";

const modalStyle = {
  // Layout and positioning
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 1000,
  // Box model
  width: "100vw",
  height: "100vh",
  padding: 4,
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  // Flexbox alignment
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 2,
  // Visual effects
  color: "#fff",
};

export const RestTime2 = ({
  title = "Time for resting",
  trigger,
  duration,
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const isLandscapeMode = useLandscapeMode();

  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
      setIsPlaying(true);
    }
  }, [trigger]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleTimerComplete = () => {
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible) return null;

  return (
    <Modal open={trigger}>
      <Box sx={modalStyle}>
        <CountdownCircleTimer
          isPlaying={isPlaying}
          duration={duration}
          size={isLandscapeMode ? 80 : 110}
          strokeWidth={isLandscapeMode ? 6 : 8}
          colors="#FFFFFF"
          trailColor="transparent"
          onComplete={handleTimerComplete}
        >
          {({ remainingTime }) => (
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: isLandscapeMode ? "3rem" : "4rem",
              }}
            >
              {remainingTime}
            </Typography>
          )}
        </CountdownCircleTimer>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: isLandscapeMode ? "1.5rem" : "2rem",
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Pause & Play */}
          <IconButton
            onClick={togglePlayPause}
            onMouseDown={(e) => e.preventDefault()}
            style={{ fontSize: 50, color: "#fff" }}
          >
            {isPlaying ? (
              <PauseCircleOutlineIcon style={{ fontSize: 50 }} />
            ) : (
              <PlayCircleOutlineIcon style={{ fontSize: 50 }} />
            )}
          </IconButton>

          {/* Next Exercise */}
          <IconButton
            onClick={handleTimerComplete}
            onMouseDown={(e) => e.preventDefault()}
            style={{ fontSize: 50, color: "#fff" }}
          >
            <SkipNextOutlinedIcon style={{ fontSize: 50 }} />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

RestTime2.propTypes = {
  title: PropTypes.string,
  trigger: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
};
