// React and Material-UI
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Box, Typography, Button, Grid2 as Grid } from "@mui/material";
// Custom Components for Routine Session
import { VideoModal } from "../VideoModal";
import { MetricCard } from "./MetricCard";
import { useLandscapeMode } from "./useLandscapeMode";
// Icons & Images
import Completed from "/assets/completed.svg";
import Mins from "/assets/mins.svg";
import Calories from "/assets/calories.svg";
import Score from "/assets/score.svg";
import BG from "/assets/bg_light.png";

const modalStyle = {
  // Layout and positioning
  position: "fixed",
  top: 0,
  left: 0,
  // Box model
  width: "100vw",
  height: "100vh",
  padding: 4,
  // Flexbox alignment
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  // Visual effects
  bgcolor: "background.paper",
  boxShadow: 24,
  backgroundImage: `url(${BG})`,
  backgroundSize: "cover",
};

export const CompleteRoutineSessionModal = ({
  open = false,
  sessionType = "routine",
  onComplete = false,
  mins = 0,
  calorie = 0,
  score = 0,
  videoURL = "",
}) => {
  const isLandscapeMode = useLandscapeMode();
  const navigate = useNavigate();
  const [isOpenVideoModal, setIsOpenVideoModal] = useState(false);

  const handleComplete = () => {
    onComplete();
    navigate("/training");
  };

  return (
    <>
      <Modal open={open}>
        <Box sx={{ ...modalStyle, gap: isLandscapeMode ? 2 : 5 }}>
          <Grid
            container
            justifyContent={"center"}
            flexDirection={"column"}
            gap={3}
          >
            <Box
              component="img"
              src={Completed}
              alt="Completed Exercise"
              sx={{
                maxHeight: isLandscapeMode ? "80px" : "100px",
                objectFit: "contain",
              }}
            />
            <Typography
              sx={{
                fontWeight: "normal",
                fontSize: isLandscapeMode ? ".9rem" : "1.1rem",
                textAlign: "center",
                width: "450px",
              }}
            >
              {sessionType == "routine" ? (
                <>
                  {"Yay! You’ve completed exercising"}
                  <br />
                  {" Let’s see what you’ve achieved today!"}
                </>
              ) : (
                "Awesome! You’ve nailed the basics — now you’re ready to take on more with confidence!"
              )}
            </Typography>
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              width: "450px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={Mins}
                alt="mins"
                style={{ width: "45px", height: "45px", marginBottom: "4px" }}
              />
              <MetricCard title="Mins" color="black" value={mins} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={Calories}
                alt="calories"
                style={{ width: "37px", height: "44px", marginBottom: "4px" }}
              />
              <MetricCard title="Calories" color="black" value={calorie} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={Score}
                alt="score"
                style={{ width: "45px", height: "45px", marginBottom: "4px" }}
              />
              <MetricCard title="Score" color="black" value={score} />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 4,
            }}
          >
            {videoURL && (
              <Button
                variant="outlined"
                sx={{ width: "250px" }}
                onClick={() => setIsOpenVideoModal(true)}
              >
                View Recording
              </Button>
            )}
            <Button
              variant="contained"
              sx={{ width: "250px" }}
              onClick={handleComplete}
            >
              View My Program
            </Button>
          </Box>
        </Box>
      </Modal>
      <VideoModal
        open={isOpenVideoModal}
        onclose={() => setIsOpenVideoModal(false)}
        videoURL={videoURL}
      />
    </>
  );
};

// Defining prop types
CompleteRoutineSessionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  mins: PropTypes.number.isRequired,
  calorie: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  videoURL: PropTypes.string,
};
