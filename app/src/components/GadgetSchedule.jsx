import PropTypes from "prop-types";
import { memo } from "react";
import { GadgetBase } from './GadgetBase';
import { WeekPicker } from "./WeekPicker";
import { Box, Typography } from "@mui/material";
import { RoutineCard } from "../components/RoutineCard";

export const GadgetSchedule = memo(({ programs = null, programRoutines = null }) => {
  return (
    <GadgetBase>
      <WeekPicker />
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
              <Typography
                sx={{ fontVariationSettings: "'wght' 800"}}
              >
                {programs[0].name}
              </Typography>
              <Typography 
                sx={{ textAlign: "left" }}
              >
                {programs[0].description ? programs[0].description : "Description is undefined"}
              </Typography>
            </>
          : <Typography>No programs available</Typography>
        }

        {programRoutines
          ? programRoutines.map((routine) => (
              <RoutineCard key={routine.id} routine={routine} />
            ))
          : <Typography>No routines available</Typography>
        }

      </Box>
    </GadgetBase>
  );
});

GadgetSchedule.propTypes = {
  programs: PropTypes.array,
  programRoutines: PropTypes.array,
};

GadgetSchedule.displayName = 'GadgetSchedule';