import PropTypes from "prop-types";
import { useState, memo } from "react";
import { Button, Typography } from "@mui/material";
import { GadgetBase } from './GadgetBase';
import { RoutineExercisesList } from './RoutineExercisesList';
import { StartRoutineSessionModal } from "./StartRoutineSessionModal";

export const GadgetRoutineOfToday = memo(({ programRoutines = null, routineExercises = null }) => {
  const [open, setOpen] = useState(false);

  // Open StartRoutineSessionModal
  const handleOpen = () => {
    setOpen(true);
  };

  // Close StartRoutineSessionModal
  const handleClose = () => {
    setOpen(false);
  };
  
  // Note: Now just showing the first routine, not considering the schedule. To be updated.
  return (
    <GadgetBase>
      <Typography
        variant="h6"
        sx={{ width: '100%', textAlign: 'left', fontVariationSettings: "'wght' 800" }}
      >
        Today&apos;s Routine
      </Typography>
        <>
          <Typography sx={{ width: '100%', textAlign: 'left' }}>{programRoutines[0].name}</Typography>
          {routineExercises.length > 0 ? (
            <RoutineExercisesList routineExercises = { routineExercises }/>
          ) : (
            <Typography>No routines found.</Typography>
          )}
          <Button
            onClick={handleOpen}
            sx={{
              // backgroundColor: theme.palette.primary.main,
              backgroundColor: '#94DC8A',
              color: 'text.secondary',
              borderRadius: '50%',
              width: '150px',
              height: '150px',
              padding: 0,
              minWidth: 'unset',
              fontSize: '1.2rem',
              fontVariationSettings: "'wght' 800",
              marginTop: '0.8rem',
              marginBottom: '0.8rem',
            }}
          >
            Get<br />Started
          </Button>
          <StartRoutineSessionModal
            open={open}
            id={programRoutines.length > 0 ? programRoutines[0].id : null}
            idType="routine"
            onClose={handleClose}
          />
        </>
    </GadgetBase>
  );
});

GadgetRoutineOfToday.propTypes = {
  programRoutines: PropTypes.array,
  routineExercises: PropTypes.array,
};

GadgetRoutineOfToday.displayName = 'GadgetRoutineOfToday';