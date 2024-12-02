import PropTypes from "prop-types";
import { GadgetBase } from "./GadgetBase";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { TrainingCard } from "./TrainingCard";

export const GadgetPremadeRoutineList = ({ presetRoutines = null }) => {
  return (
    <GadgetBase frame={false} sx={{ border: 0 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <Grid container spacing={3} sx={{ width: "100%" }}>
          {presetRoutines && presetRoutines.length > 0 ? (
            presetRoutines.map((routine) => (
              <Grid key={routine.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <TrainingCard routine={routine} />
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
