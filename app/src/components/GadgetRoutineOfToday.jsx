import { useState, useEffect, useRef, useMemo, memo } from "react";
import { Box, Button, Typography } from "@mui/material";
import { GadgetBase } from './GadgetBase';
import { useAuth } from "../utils/AuthProvider.jsx";
import { getRoutinesFromProgram } from "../controllers/RoutineController";
import { getAllUserPrograms } from "../controllers/ProgramController";
import { getExercisesFromRoutine } from "../controllers/RoutineExerciseController.js";
import { StartRoutineSessionModal } from "./StartRoutineSessionModal";
import theme from '../theme';

export const GadgetRoutineOfToday = memo(() => {
  const { user } = useAuth();
  const [programRoutines, setProgramRoutines] = useState([]);
  const [routineExercises, setRoutineExercises] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // For data cashing
  const dataCacheRef = useRef({
    userId: null,
    programRoutines: null,
    routineExercises: null,
  });

  // Initialization
  useEffect(() => {
    // Check if the data is already loaded
    if (
      dataCacheRef.current.userId === user.id &&
      dataCacheRef.current.programRoutines &&
      dataCacheRef.current.routineExercises
    ) {
      setProgramRoutines(dataCacheRef.current.programRoutines);
      setRoutineExercises(dataCacheRef.current.routineExercises);
      setLoading(false);
      console.log("Data loaded from cache");
      return;
    }

    const loadData = async () => {
      try {
        const programs = await getAllUserPrograms(user.id);
        const routines = await getRoutinesFromProgram(programs[0].id);
        setProgramRoutines(routines);
        const exercises = await getExercisesFromRoutine(routines[0].id);
        setRoutineExercises(exercises);

        // Cache the data
        dataCacheRef.current = {
          userId: user.id,
          programRoutines: routines,
          routineExercises: exercises,
        };

      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Memoized Exercise List
  const memoizedExerciseList = useMemo(() => {
    return routineExercises.map((exercise, index) => (
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
            border: `1px solid ${theme.palette.secondary.main}`,
            borderRadius: '50px',
            width: '80px',
            objectFit: 'cover',
          }}
        />
        <Typography sx={{ width: '100%', textAlign: 'center' }}>
          {exercise.name}
        </Typography>
        <Typography sx={{ width: '100%', textAlign: 'center' }}>
          {exercise.reps} Reps
        </Typography>
        <Typography sx={{ width: '100%', textAlign: 'center' }}>
          {exercise.sets} Sets
        </Typography>
      </Box>
    ));
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
      {!loading && (
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
              color: theme.palette.text.secondary,
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
      )}
    </GadgetBase>
  );
});

GadgetRoutineOfToday.displayName = 'GadgetRoutineOfToday';