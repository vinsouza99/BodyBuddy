import PropTypes from "prop-types";
import { Typography, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import theme from '../theme';

export const RoutineCard = ({ routine }) => {
  return (
    <>
      <Accordion
        elevation={2}
        disableGutters={true}
        square={true}
        sx={{
          textAlign: "left",
          borderLeft: `5px solid ${theme.palette.primary.main}`,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
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

