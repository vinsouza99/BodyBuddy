import PropTypes from "prop-types";
import { useState, memo, useEffect } from "react";
import { Button, Typography, Box, CircularProgress } from "@mui/material";
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
      if (routine)
        routine.exercises = await getExercisesFromRoutine(routine.id);
      setTodayRoutine(routine);
      setLoading(false);
    }
    loadRoutineData();
  }, []);

  // Note: Now just showing the first routine, not considering the schedule. To be updated.
  return (
    <GadgetBase>
      <Typography
        variant="h6"
        sx={{ width: "100%", textAlign: "left", fontWeight: "800" }}
      >
        Today&apos;s Routine
      </Typography>


      {(loading) ? ( 
        <Box textAlign="center">
          <CircularProgress color="inherit" />
          <Typography>
            Loading...
          </Typography>
        </Box>
      ) : ( 
        todayRoutine && todayRoutine.exercises.length > 0 ? (
          <>
            <Typography variant="h6" sx={{ width: "100%", textAlign: "left" }}>
              {todayRoutine.name}
            </Typography>
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
              sx={{
                width: "150px",
                height: "150px",
                color: "text.primary",
                backgroundColor: "#4DC53C",
                borderRadius: "50%",
                padding: 0,
                minWidth: "unset",
                fontSize: "1.2rem",
                marginTop: "0.8rem",
                marginBottom: "0.8rem",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
              }}
            >
              GET
              <br />
              STARTED
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
