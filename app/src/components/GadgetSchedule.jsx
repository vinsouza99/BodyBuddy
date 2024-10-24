import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { memo } from "react";
import { Box, Typography } from "@mui/material";
import { GadgetBase } from './GadgetBase';
import { WeekPicker } from "./WeekPicker";
import { RoutinesList } from "../components/RoutinesList";
import { isWithinInterval, parseISO, startOfWeek, endOfWeek, addDays } from 'date-fns';

export const GadgetSchedule = memo(({ programs = null, programRoutines = null }) => {
  const today = new Date();
  const [selectedWeek, setSelectedWeek] = useState({
    start: startOfWeek(today, { weekStartsOn: 1 }),
    end: endOfWeek(today, { weekStartsOn: 1 }),
  });
  const [filteredRoutines, setFilteredRoutines] = useState([]);

  const handleNextWeek = (newStartDate) => {
    const newEndDate = addDays(newStartDate, 6);
    setSelectedWeek({
      start: newStartDate,
      end: newEndDate,
    });
  };

  const handlePreviousWeek = (newStartDate) => {
    const newEndDate = addDays(newStartDate, 6);
    setSelectedWeek({
      start: newStartDate,
      end: newEndDate,
    });
  };

  useEffect(() => {
    if (programRoutines.length > 0) {
      const filtered = programRoutines.filter((routine) => {
        const routineDate = parseISO(routine.scheduled_date);
        return isWithinInterval(routineDate, { start: selectedWeek.start, end: selectedWeek.end });
      });
      setFilteredRoutines(filtered);
    }
  }, [selectedWeek, programRoutines]);

  // Create array of shceduled dates
  const scheduledDates = programRoutines.map((routine) => routine.scheduled_date);

  return (
    <GadgetBase>
      <WeekPicker
        scheduledDates={scheduledDates}
        onClickNextWeek={handleNextWeek}
        onClickPreviousWeek={handlePreviousWeek}
      />
      {/* Program Schedule */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          gap: 2,
        }}
      >
        {programs[0] 
          ? 
            <>
              <Typography sx={{ fontWeight: "800"}}>
                {programs[0].name}
              </Typography>
              <Typography 
                sx={{ textAlign: "left" }}
              >
                {programs[0].description ? programs[0].description : "Description is undefined"}
              </Typography>
            </>
          : <Typography>No available program</Typography>
        }
        <RoutinesList routines={filteredRoutines} />
      </Box>
    </GadgetBase>
  );
});

GadgetSchedule.propTypes = {
  programs: PropTypes.array,
  programRoutines: PropTypes.array,
};

GadgetSchedule.displayName = 'GadgetSchedule';