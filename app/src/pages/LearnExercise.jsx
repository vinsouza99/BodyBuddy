import React, { useState, useEffect, useMemo } from "react";
import { setPageTitle } from "../utils/utils";
import { getExercise } from "../controllers/ExerciseController.js";
import {
  Box,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
  Divider,
  Paper,
  List,
  ListItem,
} from "@mui/material";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { useNavigate, useParams } from "react-router-dom";

export const LearnExercise = (props) => {
  const { exercise_id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState({});
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true); // New state for video loading

  useEffect(() => {
    setPageTitle(props.title);

    const loadData = async () => {
      try {
        const exerciseData = await getExercise(exercise_id, true);
        setExercise(exerciseData);
        console.log(exerciseData);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
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

  // Get names from muscleGroups and goals arrays
  const focusAreas =
    exercise?.muscleGroups?.map((group) => group.name).join(", ") || "None";
  const goals = exercise?.goals?.map((goal) => goal.name).join(", ") || "None";

  // Memoize the iframe using useMemo
  const MemoizedIframe = useMemo(() => {
    return (
      <iframe
        // src={exercise.demo_url ? exercise.demo_url : "Demo URL"}
        src={exercise.video_tutorial_url ? exercise.video_tutorial_url : "Video Tutorial URL"}
        // src="https://www.youtube.com/embed/l83R5PblSMA?si=lPsYf1Jg3kfviBzM"
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
    );
  }, [exercise?.name]);

  function redirectToSession() {
    navigate("/routine", { state: { id: exercise.id, idType: "exercise" } });
  }
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
            href="/learn"
            sx={{
              alignSelf: "flex-start",
              marginBottom: 2,
              padding: "0",
              color: "text.primary",
              fontSize: "1.1rem",
            }}
          >
            &lt; Back to Exercises by Muscle
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

            <Box sx={{ textAlign: "left", padding: "1rem" }}>
              <Typography
                variant="h2"
                sx={{ fontWeight: "bold", marginBottom: "1rem" }}
              >
                {exercise?.name || "Exercise Name"}
              </Typography>

              <Divider
                sx={{
                  backgroundColor: "background.light",
                  height: "2px",
                  marginBottom: "1rem",
                }}
              />

              <List>
                {/* EXERCISE STEP 1 */}
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
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                padding: "1rem",
              }}
            >
              {/* Display Focus Area */}
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

              {/* Display Goals */}
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
            </Box>
          </Paper>

          {/* Practice Button */}
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => redirectToSession()}
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
    </>
  );
};
