import PropTypes from "prop-types";
import { useState, memo, useEffect } from "react";
import { Button, Typography, Box, Chip } from "@mui/material";
import { CircularProgress } from "../components/CircularProgress.jsx";
import { isSameDay, parseISO } from "date-fns";
import { GadgetBase } from "./GadgetBase";
import { RoutineExercisesList } from "./RoutineExercisesList";
import { StartRoutineSessionModal } from "./StartRoutineSessionModal";
import { getExercisesFromRoutine } from "../controllers/RoutineController";

export const GadgetRoutineOfToday = memo(({ programRoutines = [] }) => {
  const [open, setOpen] = useState(false);
  const [todayRoutine, setTodayRoutine] = useState({});
  const [loading, setLoading] = useState(true);
  const today = new Date();

  // Open StartRoutineSessionModal
  const handleOpen = () => {
    setOpen(true);
  };

  // Close StartRoutineSessionModal
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function loadRoutineData() {
      const routine =
        programRoutines?.find((routine) =>
          isSameDay(parseISO(routine.scheduled_date), today)
        ) || null;
      if (routine) {
        routine.exercises = await getExercisesFromRoutine(routine.id);
      }
      setTodayRoutine(routine);
      setLoading(false);
    }
    loadRoutineData();
  }, [programRoutines]);

  // Note: Now just showing the first routine, not considering the schedule. To be updated.
  return (
    <GadgetBase>
      {(loading) ? ( 
        <Box textAlign="center">
          <CircularProgress color="inherit" />
          <Typography>
            Loading...
          </Typography>
        </Box>
      ) : ( 
        todayRoutine && todayRoutine?.exercises?.length > 0 ? (
          <>
            <Box 
              sx={{ 
                display: "flex", 
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                gap: 2, 
                width: "100%" 
              }}
            >
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  variant="h6"
                  sx={{ width: "100%", textAlign: "left", fontWeight: "800", whiteSpace: "nowrap" }}
                >
                  Today&apos;s Routine
                </Typography>
                <Typography variant="h6" sx={{ width: "100%", textAlign: "left" }}>
                  {todayRoutine.name}
                </Typography>
              </Box>
              <Box 
                sx= {{ 
                  display: "flex", 
                  flexDirection: "row",
                  justifyContent: "flex-end", 
                  alignSelf: "start",
                  flexWrap: "wrap", 
                  gap: 1,
                }}
              >
                {todayRoutine.exercises && todayRoutine.exercises.length > 0 ? (
                  <>
                    {todayRoutine.duration > 0 ? (
                      <Chip
                        label={
                          todayRoutine.duration < 60000
                            ? `${Math.floor(todayRoutine.duration / 1000)} secs` // Display in seconds if less than 1 minute
                            : `${Math.floor(todayRoutine.duration / 60000)} mins` +
                              (Math.floor((todayRoutine.duration % 60000) / 1000) > 0
                                ? ` ${Math.floor((todayRoutine.duration % 60000) / 1000)} secs`
                                : "") // Only show seconds if > 0
                        }
                        variant="outlined"
                      />
                    ) : ""}
                    <Chip
                      label={`${todayRoutine.estimated_calories || "--"} Kcal`}
                      variant="outlined"
                    />
                    {/* Collect all unique muscle group names from exercises */}
                    {[...new Set(
                      todayRoutine.exercises.flatMap((exercise) =>
                        exercise.muscleGroups.map((mg) => mg.name)
                      )
                    )].map((muscleGroup, index) => (
                      <Chip
                        key={index}
                        label={muscleGroup} // Display muscle group
                        variant="outlined"
                      />
                    ))}
                  </>
                ) : (
                  ""
                )}
              </Box>
            </Box>

            {todayRoutine.exercises && todayRoutine.exercises.length > 0 ? (
              <RoutineExercisesList
                routineExercises={todayRoutine.exercises}
                color={
                  isSameDay(parseISO(todayRoutine.scheduled_date), today)
                    ? "secondary.main"
                    : "primary.main"
                }
              />
            ) : (
              <Typography>No routines found.</Typography>
            )}
            <Button
              onClick={handleOpen}
              size="large"
              sx={{
                width: "150px",
                height: "150px",
                color: "white",
                background: "linear-gradient(180deg, #2d90e0, #ff118c 50%, #ef3897 60%, #2d90e0)",
                borderRadius: "50%",
                padding: 0,
                minWidth: "unset",
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginTop: "0.8rem",
                marginBottom: "0.8rem",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
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
              START
            </Button>

            {/* Transition to session screen */}
            <StartRoutineSessionModal
              open={open}
              id={todayRoutine.id}
              idType="routine"
              onClose={handleClose}
            />
          </>
        ) : (
          <Typography sx={{ width: "100%", textAlign: "left" }}>
            No available routine for today.
          </Typography>
        )
      )}
    </GadgetBase>
  );
});

GadgetRoutineOfToday.propTypes = {
  programRoutines: PropTypes.array,
};

GadgetRoutineOfToday.displayName = "GadgetRoutineOfToday";
