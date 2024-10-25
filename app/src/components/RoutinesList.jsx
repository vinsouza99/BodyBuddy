import PropTypes from "prop-types";
import { Box, Typography, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { format, isSameDay, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { RoutineExercisesList } from "./RoutineExercisesList";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const RoutinesList = ({ routines }) => {
  const timeZone = 'America/Vancouver';
  const today = new Date();

  return (
    <>
      {routines && routines.length > 0
        ? routines
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
                  {routine.name ? routine.name : "Name is undefined"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* <Typography>
                  {routine.description ? routine.description : "Description is undefined"}
                </Typography> */}
                <RoutineExercisesList
                  routineExercises={routine.exercises} 
                  color={isSameDay(parseISO(routine.scheduled_date), today) ? 'secondary.main' : 'primary.main'}
                />
              </AccordionDetails>
            </Accordion>
          ))
        : <Typography>No available routines</Typography>    
      }
    </>
  );
};

RoutinesList.propTypes = {
  routines: PropTypes.array.isRequired,
};

