import PropTypes from "prop-types";
import { GadgetBase } from "./GadgetBase"
import { Box, Typography } from "@mui/material"
import { TrainingCard } from "./TrainingCard"

export const GadgetPremadeRoutineList = ({presetRoutines = null }) => {
  return (
    <GadgetBase frame = {false} >
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {presetRoutines.length > 0
          ? presetRoutines.map((routine) => (
                <TrainingCard key={routine.id} routine={routine} />
            ))
          : (
            <Typography>No routines available</Typography>
        )}
      </Box>
    </GadgetBase>
  )
}

GadgetPremadeRoutineList.propTypes = {
  presetRoutines: PropTypes.array,
};