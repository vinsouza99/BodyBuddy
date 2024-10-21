import PropTypes from "prop-types";
import { format } from 'date-fns';
import { Box, Typography, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const RoutineCard = ({ routine }) => {
  const today = new Date();
  return (
    <>
      <Accordion
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
            {format(today, 'MMM d')}:
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
    </>
  );
};

RoutineCard.propTypes = {
  routine: PropTypes.object.isRequired,
};

