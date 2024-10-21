import PropTypes from "prop-types";
import { useState } from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
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
    <>
      <Paper 
        elevation={3} 
        sx={{
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          padding: 2, 
          borderRadius: '15px',
          backgroundColor: 'white'
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
      </Paper>
      <StartRoutineSessionModal open={open} id={routine.id} idType="routine" onClose={handleClose} />
    </>
  );
};

export default TrainingCard;

TrainingCard.propTypes = {
  routine: PropTypes.object.isRequired,
};

