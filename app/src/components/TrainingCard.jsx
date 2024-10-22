import PropTypes from "prop-types";
import { useState } from "react";
import { Paper, Box, Typography, Button, Grid2 } from "@mui/material";
import { StartRoutineSessionModal } from "./StartRoutineSessionModal";

export const TrainingCard = ({ routine }) => {
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
    <>
      <Paper elevation={3}>
        <Grid2 container spacing={2}>
          <Grid2 size={{xs:12, md:6}}>
            <Typography>Video will be displayed here.</Typography>
          </Grid2>
          <Grid2 size={{xs:12, md:6}}>
            <Box sx={{width: '100%'}}>
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
              <Typography align="left">
                {routine.description ? routine.description : "Description is undefined"}
              </Typography>
              <Typography align="left">
                {routine.exercises.map((exercise) => (
                  <Typography key={exercise.id}>{exercise.name}</Typography>
                ))}
              </Typography>
              <Box>
                <Button onClick={handleOpen}>Learn More...</Button>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Paper>
      <StartRoutineSessionModal open={open} id={routine.id} idType="routine" onClose={handleClose} />
    </>
  );
};

TrainingCard.propTypes = {
  routine: PropTypes.object.isRequired,
};

