import PropTypes from "prop-types";
import { useState, useEffect, memo } from "react";
import { Box, Typography } from "@mui/material";
import { GadgetBase } from "./GadgetBase";
import { WeekPicker } from "./WeekPicker";
import { RoutinesList } from "./RoutinesList";
import { ErrorMessage } from "./ErrorMessage.jsx";
import {
  isWithinInterval,
  parseISO,
  startOfWeek,
  endOfWeek,
  addDays,
} from "date-fns";
import axiosClient from "../utils/axiosClient";
import { CircularProgress } from "../components/CircularProgress.jsx";

export const GadgetSchedule = memo(({ programRoutines = [] }) => {
  const today = new Date();
  const [selectedWeek, setSelectedWeek] = useState({
    start: startOfWeek(today, { weekStartsOn: 1 }).setHours(0, 0, 0, 0),
    end: endOfWeek(today, { weekStartsOn: 1 }).setHours(0, 0, 0, 0),
  });
  const [filteredRoutines, setFilteredRoutines] = useState([]);
  const [weeklyGoal, setWeeklyGoal] = useState("");
  const [loadingProgramRoutine, setloadingProgramRoutine] = useState(false);
  const [loadingWeeklyGoal, setloadingWeeklyGoal] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  // Create filtered routines by selected week
  useEffect(() => {
    if (programRoutines.length === 0) return;
    setloadingProgramRoutine(true);

    const filtered = programRoutines.filter((routine) => {
      const routineDate = parseISO(routine.scheduled_date);
      return isWithinInterval(routineDate, {
        start: selectedWeek.start,
        end: selectedWeek.end,
      });
    });
    setFilteredRoutines(filtered);
    setloadingProgramRoutine(false);
  }, [selectedWeek, programRoutines]);

  // Create Weekly Summary
  useEffect(() => {
    if (filteredRoutines.length === 0) return;
    setloadingWeeklyGoal(true);

    const summaryDetails = filteredRoutines
      .map((routine) => {
        const date = routine.scheduled_date;
        const exercises = routine.exercises
          .map((exercise) => {
            return `Exercise Name: ${exercise.name}, Sets: ${exercise.sets}, Reps: ${exercise.reps}`;
          })
          .join("\n");

        return `Routine Date: ${date}\n${exercises}`;
      })
      .join("\n\n");

    const prompt = `
      ${summaryDetails}
      Based on the routines information above, make a summary sentence describing the goal of workouts.
      *** Format ***
      {"summary" : "Your summary sentence here"}
    `;

    try {
      // Create Weekly Summary by OpenAI
      const createWeeklySummary = async () => {
        const response_openai = await axiosClient.post(`openai/`, {
          prompt: prompt,
        });
        const parsedContent = JSON.parse(
          response_openai.data.data.choices[0].message.content
        );
        setWeeklyGoal(parsedContent.summary);
      };
      createWeeklySummary();
    } catch (e) {
      console.log(e);
      setLoadingError(true);
    } finally {
      setloadingWeeklyGoal(false);
    }
  }, [filteredRoutines]);

  // Handle click next week
  const handleNextWeek = (newStartDate) => {
    const newEndDate = addDays(newStartDate, 6);
    setSelectedWeek({
      start: newStartDate,
      end: newEndDate,
    });
    setWeeklyGoal("");
    // setloadingProgramRoutine(true);
    // setloadingWeeklyGoal(true);
  };

  // Handle click previous week
  const handlePreviousWeek = (newStartDate) => {
    const newEndDate = addDays(newStartDate, 6);
    setSelectedWeek({
      start: newStartDate,
      end: newEndDate,
    });
    setWeeklyGoal("");
    // setloadingProgramRoutine(true);
    // setloadingWeeklyGoal(true);
  };

  // Create array of shceduled dates
  const scheduledDates = programRoutines.map(
    (routine) => routine.scheduled_date
  );

  return (
    <GadgetBase>
      <WeekPicker
        scheduledDates={scheduledDates}
        onClickNextWeek={handleNextWeek}
        onClickPreviousWeek={handlePreviousWeek}
      />
      {/* Program Schedule */}
      {loadingProgramRoutine || loadingWeeklyGoal ? (
        <Box textAlign="center">
          <CircularProgress color="inherit" />
          <Typography>Loading...</Typography>
        </Box>
      ) : loadingError ? (
        <ErrorMessage message="Error while loading schedule info..." />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            gap: 2,
            width: "100%",
          }}
        >
          <>
            {weeklyGoal ? (
              <Typography sx={{ fontWeight: "800" }}>
                This Week&apos;s Goal
              </Typography>
            ) : (
              ""
            )}

            {weeklyGoal && (
              <Typography sx={{ textAlign: "left" }}>{weeklyGoal}</Typography>
            )}
            <RoutinesList routines={filteredRoutines} />
          </>
        </Box>
      )}
    </GadgetBase>
  );
});

GadgetSchedule.propTypes = {
  programRoutines: PropTypes.array,
};

GadgetSchedule.displayName = "GadgetSchedule";
