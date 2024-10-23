import PropTypes from "prop-types";
import { format } from 'date-fns';
import { Box, Typography, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { toZonedTime } from 'date-fns-tz';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const RoutinesList = ({ routines }) => {
  const timeZone = 'America/Vancouver';

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
                borderColor: 'primary.main'
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ height: '80px'}}
              >
                <Typography>
                <Box component="span" sx={{ marginRight: '1rem' }}>
                  {format(toZonedTime(routine.scheduled_date, timeZone), 'MMM d')}:
                </Box>
                  {routine.name ? routine.name : "Name is undefined"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {routine.description ? routine.description : "Description is undefined"}
                </Typography>
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

