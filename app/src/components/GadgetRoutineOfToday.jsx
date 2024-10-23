import PropTypes from "prop-types";
import { useState, memo } from "react";
import { Button, Typography } from "@mui/material";
import { GadgetBase } from './GadgetBase';
import { RoutineExercisesList } from './RoutineExercisesList';
import { StartRoutineSessionModal } from "./StartRoutineSessionModal";

export const GadgetRoutineOfToday = memo(({ programRoutines = null }) => {
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
      {programRoutines && programRoutines.length > 0 ? (
        <>
          <Typography sx={{ width: '100%', textAlign: 'left' }}>
            {programRoutines[0].name}
          </Typography>
          {programRoutines[0].exercises && programRoutines[0].exercises.length > 0 ? (
            <RoutineExercisesList routineExercises = { programRoutines[0].exercises }/>
          ) : (
            <Typography>No routines found.</Typography>
          )}
          <Button
            onClick={handleOpen}
            sx={{
              width: '150px',
              height: '150px',
              color: 'text.primary',
              backgroundColor: '#4DC53C',
              borderRadius: '50%',
              padding: 0,
              minWidth: 'unset',
              fontSize: '1.2rem',
              fontVariationSettings: "'wght' 800",
              marginTop: '0.8rem',
              marginBottom: '0.8rem',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
            }}
          >
            Get<br />Started
          </Button>
          <StartRoutineSessionModal
            open={open}
            id={programRoutines && programRoutines.length > 0 ? programRoutines[0].id : null}
            idType="routine"
            onClose={handleClose}
          />
        </>
      ) : (
        <Typography sx={{ width: '100%', textAlign: 'left' }}>
          No available routine for today.
        </Typography>
      )}
    </GadgetBase>
  );
});

GadgetRoutineOfToday.propTypes = {
  programRoutines: PropTypes.array,
  // routineExercises: PropTypes.array,
};

GadgetRoutineOfToday.displayName = 'GadgetRoutineOfToday';