import PropTypes from "prop-types";
import { useState } from "react";
import { Paper, Box, Grid2, Typography, Button } from "@mui/material";
import { StartRoutineSessionModal } from "./StartRoutineSessionModal";

const TrainingCard = ({ routine }) => {
  const [open, setOpen] = useState(false);

  // Open StartRoutineSessionModal
  const handleOpen = () => {
    setOpen(true);
  };

  // Close StartRoutineSessionModal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid2 xs={3}>
      <Paper elevation={5}>
        <Box
          sx={{
            display: "inline",
            textAlign: "center",
            padding: "1.5rem",
          }}
        >
          <Typography 
            component="h3" 
            align="center"
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold"
            }}
          >
            {routine.name ? routine.name : "Name is undefined"}
          </Typography>
          <Typography align="center">
            {routine.description ? routine.description : "Description is undefined"}
          </Typography>
          <Box>
            <Button onClick={handleOpen}>Learn More...</Button>
          </Box>
        </Box>
      </Paper>
      <StartRoutineSessionModal open={open} id={routine.id} idType="routine" onClose={handleClose} />
    </Grid2>
  );
};

export default TrainingCard;

TrainingCard.propTypes = {
  routine: PropTypes.object.isRequired,
};

