import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import {
  getExercisesFromRoutine,
  getRoutine,
} from "../controllers/RoutineController.js";
import { RoutineExercisesList } from "../components/RoutineExercisesList";
import { Box, Button, Typography, Paper, Chip } from "@mui/material";
import { LoadingBackdrop } from "../components/LoadingBackdrop";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useParams } from "react-router-dom";
import { StartRoutineSessionModal } from "../components/StartRoutineSessionModal";

export const PremadeRoutine = (props) => {
  const { routine_id } = useParams();
  const [routine, setRoutine] = useState({});
  const [loading, setLoading] = useState(true);
  const [openSessionModal, setOpenSessionModal] = useState(false);

  useEffect(() => {
    setPageTitle(props.title);

    const loadData = async () => {
      try {
        const routineData = await getRoutine(routine_id);
        routineData.exercises = await getExercisesFromRoutine(routine_id);
        setRoutine(routineData);
        setPageTitle(routine.name);
      } catch (e) {
        navigate("/error", {
          errorDetails:
            "There was an error while loading the routines' information... try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Close StartRoutineSessionModal
  const handleClose = () => {
    setOpenSessionModal(false);
  };

  return (
    <>
      {/* Backdrop for loading */}
      <LoadingBackdrop loading={loading} />

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
            <KeyboardArrowLeftIcon /> Back to Training
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
            <Box
              sx={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="h6">{routine?.name || ""}</Typography>
                <Typography variant="body1">
                  {routine?.description || ""}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                {/* Display routine duration chip */}
                {routine.duration ? (
                  <Chip
                    label={
                      routine.duration < 60000
                        ? `${Math.floor(routine.duration / 1000)} secs` // Display in seconds if less than 1 minute
                        : `${Math.floor(routine.duration / 60000)} mins` +
                          (Math.floor((routine.duration % 60000) / 1000) > 0
                            ? ` ${Math.floor((routine.duration % 60000) / 1000)} secs`
                            : "") // Only show seconds if > 0
                    }
                    variant="outlined"
                  />
                ) : (
                  <Chip label="No duration found" variant="outlined" /> // Display message if no duration
                )}

                {/* Display calories chip */}
                {routine.estimated_calories !== undefined &&
                routine.estimated_calories !== null ? (
                  <Chip
                    label={`${routine.estimated_calories} kCal`} // Display calories
                    variant="outlined"
                  />
                ) : (
                  <Chip label="No calories found" variant="outlined" /> // Display message if no calories
                )}

                {/* Display muscleGroups as chips */}
                {routine.exercises && routine.exercises.length > 0 ? (
                  // Collect all unique muscle group names from exercises
                  [
                    ...new Set(
                      routine.exercises.flatMap((exercise) =>
                        exercise.muscleGroups.map((mg) => mg.name)
                      )
                    ),
                  ].map((muscleGroup, index) => (
                    <Chip
                      key={index}
                      label={muscleGroup} // Display muscle group
                      variant="outlined"
                    />
                  ))
                ) : (
                  <Chip label="No muscle groups found" variant="outlined" /> // Display message if no muscleGroups
                )}
              </Box>
              <RoutineExercisesList
                routineExercises={routine.exercises}
                color="primary.main"
              />

              {/* Practice Button */}
              <Button
                onClick={() => setOpenSessionModal(true)}
                sx={{
                  width: "150px",
                  height: "150px",
                  color: "white",
                  background:
                    "linear-gradient(180deg, #2d90e0, #ff118c 50%, #ef3897 60%, #2d90e0)",
                  borderRadius: "50%",
                  padding: 0,
                  minWidth: "unset",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginTop: "0.8rem",
                  marginBottom: "0.8rem",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
                  textTransform: "uppercase",
                  boxSizing: "border-box",
                  backgroundSize: "200% 200%",
                  backgroundPosition: "0% 0%",
                  transition: "all 0.4s ease-in-out",
                  "&:hover": { 
                    backgroundPosition: "0% 120%",
                    transition: "all 0.4s ease-in-out",
                  },
                }}
              >
                Start
              </Button>
            </Box>
          </Paper>
        </Box>
      )}

      {/* Transition to session screen */}
      <StartRoutineSessionModal
        open={openSessionModal}
        id={routine_id}
        idType="routine"
        onClose={handleClose}
      />
    </>
  );
};

PremadeRoutine.propTypes = {
  title: PropTypes.string,
};
