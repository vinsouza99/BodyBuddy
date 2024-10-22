import PropTypes from "prop-types";
import { useState, useMemo, memo } from "react";
import { Box, Button, Typography } from "@mui/material";
import { GadgetBase } from './GadgetBase';
import { StartRoutineSessionModal } from "./StartRoutineSessionModal";

export const GadgetRoutineOfToday = memo(({ programRoutines = null, routineExercises = null }) => {
  const [open, setOpen] = useState(false);

  // Memoized Exercise List
  const memoizedExerciseList = useMemo(() => {
    return (
      <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', gap: 2}}>
        {routineExercises.map((exercise, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: '50px',
              width: '100%',
              height: '80px',
              boxShadow: 3,
            }}
          >
            <Box
              component="img"
              src={exercise.demo_url}
              alt={exercise.name}
              sx={{
                border: '2px solid',
                borderColor: 'secondary.main',
                borderRadius: '50px',
                width: '80px',
                objectFit: 'cover',
                marginRight: '1rem',
              }}
            />
            <Typography sx={{ width: '100%', textAlign: 'left' }}>
              {exercise.name}
            </Typography>
            <Typography sx={{ width: '100%', textAlign: 'right' }}>
              {exercise.reps} Reps
            </Typography>
            <Typography sx={{ width: '100%', textAlign: 'center' }}>
              {exercise.sets} Sets
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }, [routineExercises]);


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
      {/* {!loading && ( */}
        <>
          <Typography sx={{ width: '100%', textAlign: 'left' }}>{programRoutines[0].name}</Typography>
          {routineExercises.length > 0 ? (
            memoizedExerciseList
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
      {/* )} */}
    </GadgetBase>
  );
});

GadgetRoutineOfToday.propTypes = {
  programRoutines: PropTypes.array,
  routineExercises: PropTypes.array,
};

GadgetRoutineOfToday.displayName = 'GadgetRoutineOfToday';