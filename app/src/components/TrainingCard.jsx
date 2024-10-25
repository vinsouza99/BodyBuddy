import PropTypes from "prop-types";
import { useState } from "react";
import { Card, CardContent, Typography, Button, Chip, Box } from "@mui/material";
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
      <Card>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            backgroundSize: "cover",
            height: "240px",
          }}
        >
          {/* Video will be displayed here */}
          <img
          src="https://i.pinimg.com/originals/57/cc/e0/57cce0afa73a4b4c9c8c139d08aec588.gif" // Temporary image
          alt="Exercise Name"
          style={{
            maxWidth: "100%", // Responsive image
            maxHeight: "100%", // Responsive image
            height: "auto",
            display: "block",
            borderRadius: "8px",
          }}
        />
        </Box>

        <CardContent>
          <Typography variant="h3" textAlign="left" sx={{ marginBottom: 2 }}>
            {routine.name ? routine.name : "Name is undefined"}
          </Typography>

          {/* <Typography textAlign="left" sx={{ marginBottom: 1 }}>
            {routine.description
              ? routine.description
              : "Description is undefined"}
          </Typography> */}

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {/* Display exercises as chips */}
            {routine.exercises && routine.exercises.length > 0 ? (
              routine.exercises.map((exercise, index) => (
                <Chip key={index} label={exercise.name} variant="outlined" />
              ))
            ) : (
              <Typography>No exercises found</Typography>
            )}
          </Box>

          <Box sx={{ textAlign: "right" }}>
            <Button variant="contained" onClick={handleOpen}>
              Learn More...
            </Button>
          </Box>
        </CardContent>
      </Card>

      <StartRoutineSessionModal
        open={open}
        id={routine.id}
        idType="routine"
        onClose={handleClose}
      />
    </>
  );
};

TrainingCard.propTypes = {
  routine: PropTypes.object.isRequired,
};
