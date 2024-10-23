import PropTypes from "prop-types";
import { memo } from "react";
import { Box, Typography } from "@mui/material";
import { GadgetBase } from './GadgetBase';
import { WeekPicker } from "./WeekPicker";
import { RoutinesList } from "../components/RoutinesList";

export const GadgetSchedule = memo(({ programs = null, programRoutines = null }) => {
  // Create array of shceduled dates
  const scheduledDates = programRoutines.map((routine) => routine.scheduled_date);
  console.log(scheduledDates);

  return (
    <GadgetBase>
      <WeekPicker scheduledDates={scheduledDates}/>
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
        <RoutinesList routines={programRoutines} />
      </Box>
    </GadgetBase>
  );
});

GadgetSchedule.propTypes = {
  programs: PropTypes.array,
  programRoutines: PropTypes.array,
};

GadgetSchedule.displayName = 'GadgetSchedule';