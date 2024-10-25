import PropTypes from "prop-types";
import { GadgetBase } from "./GadgetBase";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { TrainingCard } from "./TrainingCard";

export const GadgetPremadeRoutineList = ({ presetRoutines = null }) => {
  return (
    <GadgetBase frame={false}>
      <Box
        sx={{
          display: "flex",
          // flexDirection: "column",
          // gap: 2,
          alignItems: "flex-start",
        }}
      >
        <Grid container spacing={3}>
          {presetRoutines && presetRoutines.length > 0 ? (
            presetRoutines.map((routine) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TrainingCard key={routine.id} routine={routine} />
              </Grid>
            ))
          ) : (
            <Typography>No available routines</Typography>
          )}
        </Grid>
      </Box>
    </GadgetBase>
  );
};

GadgetPremadeRoutineList.propTypes = {
  presetRoutines: PropTypes.array,
};
