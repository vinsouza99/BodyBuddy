import PropTypes from "prop-types";
import { useState, useEffect, useMemo, memo } from "react";
import { Box, Button, Typography } from "@mui/material";
import { GadgetBase } from './GadgetBase';
// import { useAuth } from "../utils/AuthProvider.jsx";
// import { getRoutinesFromProgram } from "../controllers/RoutineController";
// import { getAllUserPrograms } from "../controllers/ProgramController";
// import { getExercisesFromRoutine } from "../controllers/RoutineExerciseController.js";
import { StartRoutineSessionModal } from "./StartRoutineSessionModal";

export const GadgetRoutineOfToday = memo(({ programRoutines = null, routineExercises = null }) => {
  console.log(programRoutines);
  console.log(routineExercises);
  // const { user } = useAuth();
  // const [programRoutines, setProgramRoutines] = useState([]);
  // const [routineExercises, setRoutineExercises] = useState([]);
  const [open, setOpen] = useState(false);
  // const [loading, setLoading] = useState(true);

  // For data cashing
  // const dataCacheRef = useRef({
  //   userId: null,
  //   programRoutines: null,
  //   routineExercises: null,
  // });

  // Initialization
  useEffect(() => {
    // Check if the data is already loaded
    // if (
    //   dataCacheRef.current.userId === user.id &&
    //   dataCacheRef.current.programRoutines &&
    //   dataCacheRef.current.routineExercises
    // ) {
    //   setProgramRoutines(dataCacheRef.current.programRoutines);
    //   setRoutineExercises(dataCacheRef.current.routineExercises);
    //   setLoading(false);
    //   console.log("Data loaded from cache");
    //   return;
    // }

    // const loadData = async () => {
    //   try {
    //     const programs = await getAllUserPrograms(user.id);
    //     const routines = await getRoutinesFromProgram(programs[0].id);
    //     setProgramRoutines(routines);
    //     const exercises = await getExercisesFromRoutine(routines[0].id);
    //     setRoutineExercises(exercises);

    //     // Cache the data
    //     dataCacheRef.current = {
    //       userId: user.id,
    //       programRoutines: routines,
    //       routineExercises: exercises,
    //     };

    //   } catch (e) {
    //     console.log(e);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // loadData();
  }, []);

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