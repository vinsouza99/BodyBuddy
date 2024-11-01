import React, { useState, useEffect, useMemo } from "react";
import { setPageTitle } from "../utils/utils";
import {
  getExercisesFromRoutine,
  getRoutine,
} from "../controllers/RoutineController.js";
import { RoutineExercisesList } from "../components/RoutineExercisesList";
import {
  Box,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
  Divider,
  Paper,
} from "@mui/material";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { useNavigate, useParams } from "react-router-dom";

export const PremadeRoutine = (props) => {
  const { routine_id } = useParams();
  const navigate = useNavigate();
  const [routine, setRoutine] = useState({});
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true); // New state for video loading

  useEffect(() => {
    setPageTitle(props.title);

    const loadData = async () => {
      try {
        const routineData = await getRoutine(routine_id);
        routineData.exercises = await getExercisesFromRoutine(routine_id);
        setRoutine(routineData);
        console.log(routineData);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Set loading to false when routine data is available
  useEffect(() => {
    if (routine) {
      setLoading(false);
    }
  }, [routine]);

  // Get names from muscleGroups and goals arrays
  const focusAreas =
    routine?.muscleGroups?.map((group) => group.name).join(", ") || "None";
  const goals = routine?.goals?.map((goal) => goal.name).join(", ") || "None";

  // Memoize the iframe using useMemo
  const MemoizedIframe = useMemo(() => {
    return (
      <iframe
        // src={routine.demo_url ? routine.demo_url : "Demo URL"}
        // src={routine.video_tutorial_url ? routine.video_tutorial_url : "Video Tutorial URL"}
        src="https://www.youtube.com/embed/l83R5PblSMA?si=lPsYf1Jg3kfviBzM" // TEMPORARY VIDEO PLACEHOLDER
        title={routine?.name || "Routine Name"}
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
  }, [routine?.name]);

  function redirectToSession() {
    navigate("/routine", { state: { id: routine.id, idType: "routine" } });
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
            href="/training"
            sx={{
              alignSelf: "flex-start",
              marginBottom: 2,
              padding: "0",
              color: "text.primary",
              fontSize: "1.1rem",
            }}
          >
            &lt; Back to Training
          </Button>

          {/* Routine Video and Details */}
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
            <Box sx={{ textAlign: "left", padding: "1rem" }}>
              <Typography
                variant="h2"
                sx={{ fontWeight: "bold", marginBottom: "1rem" }}
              >
                {routine?.name || "Routine Name"}
              </Typography>

              <Divider
                sx={{
                  backgroundColor: "background.light",
                  height: "2px",
                  marginBottom: "1rem",
                }}
              />
              <RoutineExercisesList
                routineExercises={routine.exercises}
                color="primary.main"
              />
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
