import PropTypes from "prop-types";
import { useState, useEffect, useMemo } from "react";
import { setPageTitle } from "../utils/utils";
import {
  getExercise,
  getExerciseGoals,
  getExerciseMuscleGroups,
  getExerciseTypes,
} from "../controllers/ExerciseController.js";
import {
  Box,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
  Paper,
} from "@mui/material";
import { ExerciseDetails } from "../components/ExerciseDetails";
import { StartRoutineSessionModal } from "../components/StartRoutineSessionModal";
import { useParams, useLocation } from "react-router-dom";

export const LearnExercise = (props) => {
  const { exercise_id } = useParams();
  const [exercise, setExercise] = useState({});
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true); // New state for video loading
  const [openSessionModal, setOpenSessionModal] = useState(false);
  const { exerciseInitialData } = useLocation();

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
          setPageTitle("Learn | " + exerciseData.name);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
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
      <Backdrop
        open={loading} // Control when to show the overlay
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box textAlign="center">
          <CircularProgress color="inherit" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Box>
      </Backdrop>

      {!loading && (
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
            &lt; Back to Exercises
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
              backgroundColor: "background.paper",
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

            {/* NOTE: The following code move to ExerciseDetails.jsx component */}
            {/* <Divider
              sx={{
                backgroundColor: "background.light",
                height: "2px",
                marginBottom: "1rem",
              }}
            />

            <List>
              {exercise.execution_steps
                ? exercise.execution_steps.map((step, index) => (
                    <ListItem
                      sx={{ padding: "0", marginBottom: "1rem" }}
                      key={index}
                    >
                      <Box
                        component="span"
                        sx={{
                          display: "inline-flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "24px",
                          height: "24px",
                          minWidth: "24px",
                          minHeight: "24px",
                          border: "1px solid",
                          borderRadius: "50%",
                          marginRight: "0.75rem",
                        }}
                      >
                        {index + 1}
                      </Box>
                      <Typography component="span">{step}</Typography>
                    </ListItem>
                  ))
                : ""}
            </List>
            
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                padding: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "left",
                  borderColor: "text.primary",
                  color: "text.primary",
                  minWidth: "180px",
                  border: "1px solid",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  gap: "0.5rem",
                }}
              >
                <AccessibilityIcon sx={{ color: "primary.main" }} />
                <Box>
                  <Box
                    component="p"
                    sx={{
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      margin: "0",
                      fontSize: "1rem",
                    }}
                  >
                    Focus Areas
                  </Box>
                  <Box
                    component="p"
                    sx={{ lineHeight: "1.2", margin: "0", fontSize: "0.9rem" }}
                  >
                    {focusAreas}
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "left",
                  borderColor: "text.primary",
                  color: "text.primary",
                  minWidth: "180px",
                  border: "1px solid",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  gap: "0.5rem",
                }}
              >
                <TrackChangesIcon sx={{ color: "primary.main" }} />
                <Box>
                  <Box
                    component="p"
                    sx={{
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      margin: "0",
                      fontSize: "1rem",
                    }}
                  >
                    Goals
                  </Box>
                  <Box
                    component="p"
                    sx={{ lineHeight: "1.2", margin: "0", fontSize: "0.9rem" }}
                  >
                    {goals}
                  </Box>
                </Box>
              </Box>
            </Box> */}
          </Paper>

          {/* Practice Button */}
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => setOpenSessionModal(true)}
            sx={(theme) => ({
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              boxShadow: "0 5px 10px rgba(0, 0, 0, 0.5)",
              color: "text.primary",
              background: `linear-gradient(${theme.palette.success.light} 30%, ${theme.palette.success.dark} 90%)`,
              textTransform: "uppercase",
            })}
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
