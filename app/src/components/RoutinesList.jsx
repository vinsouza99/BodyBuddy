import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Box, Typography, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { format, isSameDay, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { getExercisesFromRoutine } from "../controllers/RoutineController";
import { RoutineExercisesList } from "./RoutineExercisesList";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CircularProgress } from "../components/CircularProgress.jsx";

export const RoutinesList = ({ routines = [] }) => {
  const [updatedRoutines, setUpdatedRoutines] = useState([]);
  const [loadingRoutineList, setLoadingRoutineList] = useState(true);
  const timeZone = 'America/Vancouver';
  const today = new Date();

  useEffect(() => {
    const fetchExercises = async () => {
      const routinesWithExercises = await Promise.all(
        routines.map(async (routine) => {
          const routineExercises = await getExercisesFromRoutine(routine.id);
          return { ...routine, exercises: routineExercises };
        })
      );
      setUpdatedRoutines(routinesWithExercises);
      setLoadingRoutineList(false);
    };
    fetchExercises();
  }, [routines]);

  return (
    <>
      {loadingRoutineList ? 
        (
          <Box textAlign="center">
            <CircularProgress color="inherit" />
            <Typography>
              Loading...
            </Typography>
          </Box>
        ) : updatedRoutines.length === 0 ? (
          <Typography textAlign="center">No available routines</Typography>
        ) : (
          updatedRoutines
          .sort((a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date)) // Sort by date
          .map((routine) => (
            <Accordion
              key={routine.id}
              elevation={2}
              disableGutters={true}
              square={true}
              sx={{
                textAlign: 'left',
                borderLeft: '3px solid', 
                borderColor: isSameDay(parseISO(routine.scheduled_date), today) ? 'secondary.main' : 'primary.main',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ height: '80px' }}
              >
                <Typography sx={{ fontWeight: 'bold' }}>
                <Box component="span" sx={{ marginRight: '1rem' }}>
                  {format(toZonedTime(routine.scheduled_date, timeZone), 'MMM d')}:
                </Box>
                  {routine.name ? routine.name : "Routine name is undefined"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <RoutineExercisesList
                  routineExercises={routine.exercises} 
                  color={isSameDay(parseISO(routine.scheduled_date), today) ? 'secondary.main' : 'primary.main'}
                />
              </AccordionDetails>
            </Accordion>
          ))
        )
      }
    </>
  );
};

RoutinesList.propTypes = {
  routines: PropTypes.array.isRequired,
};

