import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Box, Typography, Modal, IconButton, Button } from "@mui/material";
import { ExerciseDetails } from "./ExerciseDetails";
import { getExercise } from "../controllers/ExerciseController";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const modalStyle = {
  // Layout and positioning
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // Box model
  width: "90%",
  maxWidth: "800px",
  maxHeight: "90vh",
  overflowY: "auto",
  overflowX: "hidden",
  padding: 4,
  borderRadius: "15px",
  // Flexbox alignment
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  gap: 2,
  // Visual effects
  bgcolor: "background.paper",
  boxShadow: 24,
};

export const RoutineExercisesList = ({
  routineExercises = [],
  color = "primary.main",
}) => {
  const [orderedRoutineExercises, setOrderedRoutineExercises] = useState([]);
  const [selectedExercise, setselectedExercise] = useState("");
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [showVideo, setShowVideo] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // Order exercises
  useEffect(() => {
    if (routineExercises.length === 0) return;

    // Order routine exercises by specified order
    const orderedRoutineExercises = [...routineExercises].sort(
      (a, b) => a.order - b.order
    );
    setOrderedRoutineExercises(orderedRoutineExercises);
  }, []);

  // Load exercise detail data
  useEffect(() => {
    if (!selectedExercise?.id) return;

    const loadExerciseData = async () => {
      const exerciseDetail = await getExercise(selectedExercise?.id, true);
      setExerciseDetail(exerciseDetail);
    };
    loadExerciseData();
  }, [selectedExercise]);

  // Open Video Modal
  const handleOpenVideo = (exercise) => {
    setselectedExercise(exercise);
    setShowVideo(true);
  };

  // Close Video Modal
  const handleCloseVideo = () => {
    setShowVideo(false);
    setShowMore(false);
  };

  return (
    <>
      <Box
        sx={{
          boxSizing: "border-box",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {orderedRoutineExercises.map((exercise, index) => (
          <Box
            key={index}
            onClick={() => handleOpenVideo(exercise)}
            sx={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: "50px",
              width: "100%",
              minWidth: "80px",
              height: "80px",
              boxShadow: 3,
            }}
          >
            <Box
              component="img"
              src={exercise.demo_url}
              alt={exercise.name}
              sx={{
                display: "block",
                border: "2px solid",
                borderColor: color,
                borderRadius: "50px",
                width: "100%",
                maxWidth: "80px",
                aspectRatio: "1",
                height: "100%",
                objectFit: "cover",
                marginRight: "1rem",
              }}
            />
            <Typography sx={{ width: "100%", textAlign: "left" }}>
              {exercise.name}
            </Typography>
            <Typography sx={{ width: "100%", textAlign: "right" }}>
              {exercise.reps !== 0
                ? `${exercise.reps} Reps`
                : `${exercise.duration / 1000} Secs`}
            </Typography>
            <Typography sx={{ width: "100%", textAlign: "center" }}>
              {exercise.sets} Sets
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Show video model */}
      <Modal
        open={showVideo}
        onClose={handleCloseVideo}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
          },
        }}
      >
        <Box sx={modalStyle} className="custom-scrollbar">
          <IconButton
            aria-label="close"
            onClick={handleCloseVideo}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={selectedExercise.demo_url}
            sx={{
              width: "45%",
              height: "45%",
              objectFit: "contain",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              gap: 2,
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              {selectedExercise.name}
            </Typography>
            <Box sx={{ marginLeft: "auto" }}>
              <Button
                variant="contained"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? (
                  <>
                    Show Less
                    <KeyboardArrowUpIcon />
                  </>
                ) : (
                  <>
                    Show More
                    <KeyboardArrowDownIcon />
                  </>
                )}
              </Button>
            </Box>
          </Box>
          {showMore && <ExerciseDetails exercise={exerciseDetail} />}
        </Box>
      </Modal>
    </>
  );
};

RoutineExercisesList.propTypes = {
  routineExercises: PropTypes.array,
  color: PropTypes.string,
};
