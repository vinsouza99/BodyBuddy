import PropTypes from "prop-types";
import { useState, useEffect, useMemo } from "react";
import { setPageTitle } from "../utils/utils";
import {
  getExercise,
  getExerciseGoals,
  getExerciseMuscleGroups,
  getExerciseTypes,
} from "../controllers/ExerciseController.js";
import { Box, Button, Typography, Paper, Skeleton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { CircularProgress } from "../components/CircularProgress.jsx";
import { LoadingBackdrop } from "../components/LoadingBackdrop.jsx";
import { ExerciseDetails } from "../components/ExerciseDetails";
import { StartRoutineSessionModal } from "../components/StartRoutineSessionModal";
import { useParams, useLocation } from "react-router-dom";
import { exerciseCounterLoader } from "../utils/motionDetectLogic/exerciseCounterLoader";

export const LearnExercise = (props) => {
  const { exercise_id } = useParams();
  const [exercise, setExercise] = useState({});
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true); // New state for video loading
  const [openSessionModal, setOpenSessionModal] = useState(false);
  const { exerciseInitialData } = useLocation();
  const isExerciseValid = exercise_id in exerciseCounterLoader;

  useEffect(() => {
    setPageTitle(props.title);
    const loadData = async () => {
      try {
        if (exerciseInitialData) {
          setPageTitle("Learn | " + exerciseInitialData.name);
          setExercise(exerciseInitialData);
          setLoading(false);
          exerciseInitialData.types = await getExerciseTypes(
            exerciseInitialData.id
          );
          exerciseInitialData.goals = await getExerciseGoals(
            exerciseInitialData.id
          );
          exerciseInitialData.muscleGroups = await getExerciseMuscleGroups(
            exerciseInitialData.id
          );
          setExercise(exerciseInitialData);
        } else {
          const exerciseData = await getExercise(exercise_id, true);
          setExercise(exerciseData);
          setPageTitle(exerciseData.name);
          setLoading(false);
        }
      } catch (e) {
        navigate("/error", {
          errorDetails:
            "There was an error while loading  the exercises' information... try again later.",
        });
      }
    };
    loadData();
  }, []);

  // Set loading to false when exercise data is available
  useEffect(() => {
    if (exercise) {
      setLoading(false);
    }
  }, [exercise]);

  // Close StartRoutineSessionModal
  const handleClose = () => {
    setOpenSessionModal(false);
  };

  // Memoize the iframe using useMemo
  const MemoizedIframe = useMemo(() => {
    return (
      <>
        {exercise.video_tutorial_url ? (
          <iframe
            src={exercise?.video_tutorial_url}
            title={exercise?.name || "Exercise Name"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={() => setVideoLoading(false)} // Set video loading to false when iframe loads
            style={{
              width: "100%",
              maxWidth: "900px",
              height: "auto",
              aspectRatio: "16 / 9",
              border: "none",
            }}
          ></iframe>
        ) : null}
      </>
    );
  }, [exercise?.name]);

  return (
    <>
      {/* Backdrop for loading */}
      <LoadingBackdrop loading={loading} />

      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <Skeleton
            animation="wave"
            variant="rectangular"
            height={400}
            display="flex"
            flexGrow={1}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          {/* Back Button */}
          <Button
            href="/learning"
            sx={{
              alignSelf: "flex-start",
              marginBottom: 2,
              padding: "0",
              color: "text.primary",
              fontSize: "1.1rem",
            }}
          >
            <KeyboardArrowLeftIcon /> Back to Exercises
          </Button>

          {/* Exercise Video and Details */}
          <Paper
            sx={{
              width: "100%",
              maxWidth: "900px",
              textAlign: "center",
              borderRadius: "20px",
              overflow: "hidden",
              marginBottom: "1rem",
              position: "relative", // Add position relative for absolute children
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              border: "2px solid white",
            }}
          >
            {/* Show spinner while video is loading */}
            {videoLoading && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  zIndex: 1,
                }}
              >
                <CircularProgress />
              </Box>
            )}

            {/* Render memoized iframe */}
            {MemoizedIframe}

            <Box sx={{ textAlign: "left", padding: 4 }}>
              <Typography
                variant="h2"
                sx={{ fontWeight: "bold", marginBottom: "1rem" }}
              >
                {exercise?.name || "Exercise Name"}
              </Typography>

              <ExerciseDetails exercise={exercise} />
            </Box>
          </Paper>

          {/* Practice Button */}
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpenSessionModal(true)}
            sx={(theme) => ({
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              boxShadow: "0 5px 10px rgba(0, 0, 0, 0.5)",
              color: isExerciseValid ? "white" : theme.palette.action.disabled,
              background: isExerciseValid
                ? "linear-gradient(180deg, #2d90e0, #ff118c 50%, #ef3897 60%, #2d90e0)"
                : theme.palette.action.disabledBackground,
              fontSize: "1.2rem",
              fontWeight: "bold",
              boxSizing: "border-box",
              backgroundSize: "200% 200%",
              backgroundPosition: "0% 0%",
              transition: "all 0.4s ease-in-out",
              "&:hover": {
                backgroundPosition: "0% 120%",
                transition: "all 0.4s ease-in-out",
              },
            })}
            disabled={!isExerciseValid} // Disable if exercise ID is invalid
          >
            Practice
          </Button>
        </Box>
      )}

      {/* Transition to session screen */}
      {exercise.id && (
        <StartRoutineSessionModal
          open={openSessionModal}
          id={exercise.id}
          idType="exercise"
          onClose={handleClose}
        />
      )}
    </>
  );
};

LearnExercise.propTypes = {
  title: PropTypes.string,
};
