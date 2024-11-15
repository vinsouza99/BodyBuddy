import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { StartRoutineSessionModal } from "./StartRoutineSessionModal";

export const TrainingCard = ({ routine }) => {
  const [open, setOpen] = useState(false);
  const [firstExerciseImage, setFirstExerciseImage] = useState("");

  // Access the theme for styling
  const theme = useTheme();

  // Open StartRoutineSessionModal
  const handleOpen = () => {
    setOpen(true);
  };

  // Close StartRoutineSessionModal
  const handleClose = () => {
    setOpen(false);
  };

  // Fetch the routine's first exercise gif
  useEffect(() => {
    if (routine.exercises && routine.exercises.length > 0) {
      const firstExercise = routine.exercises[0];
      // Fetch demo_url from first exercise
      const demoUrl = firstExercise.demo_url;
      if (demoUrl) {
        setFirstExerciseImage(demoUrl);
      } else {
        // Fallback image
        setFirstExerciseImage("https://i.pinimg.com/originals/57/cc/e0/57cce0afa73a4b4c9c8c139d08aec588.gif");
      }
    }
  }, [routine]);

  return (
    <>
      <Link to={`/training/${routine.id}`} style={{ textDecoration: "none" }}>
        <Card className="cardBorderHover" sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              backgroundSize: "cover",
              height: "240px",
              borderBottom: `1px solid ${theme.palette.background.light}`,
            }}
          >
            {/* Video will be displayed here */}
            <img
              src={firstExerciseImage}
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

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="h3"
                textAlign="left"
                sx={{ marginBottom: 1 }}
              >
                {routine.name ? routine.name : "Name is undefined"}
              </Typography>

              <Typography textAlign="left" sx={{ marginBottom: 1, color: "text.secondary" }}>
            {routine.description
              ? routine.description
              : "Description is undefined"}
          </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {/* Display routine duration chip */}
                {routine.duration ? (
                  <Chip
                    label={
                      routine.duration < 60000
                        ? `${Math.floor(routine.duration / 1000)} secs` // Display in seconds if less than 1 minute
                        : `${Math.floor(routine.duration / 60000)} mins` +
                          (Math.floor((routine.duration % 60000) / 1000) > 0
                            ? ` ${Math.floor((routine.duration % 60000) / 1000)} secs`
                            : "") // Only show seconds if > 0
                    }
                    variant="outlined"
                  />
                ) : (
                  <Chip label="No duration found" variant="outlined" /> // Display message if no duration
                )}

                {/* Display calories chip */}
                {routine.estimated_calories !== undefined &&
                routine.estimated_calories !== null ? (
                  <Chip
                    label={`${routine.estimated_calories} kCal`} // Display calories
                    variant="outlined"
                  />
                ) : (
                  <Chip label="No calories found" variant="outlined" /> // Display message if no calories
                )}

                {/* Display muscleGroups as chips */}
                {routine.exercises && routine.exercises.length > 0 ? (
                  // Collect all unique muscle group names from exercises
                  [
                    ...new Set(
                      routine.exercises.flatMap((exercise) =>
                        exercise.muscleGroups.map((mg) => mg.name)
                      )
                    ),
                  ].map((muscleGroup, index) => (
                    <Chip
                      key={index}
                      label={muscleGroup} // Display muscle group
                      variant="outlined"
                    />
                  ))
                ) : (
                  <Chip label="No muscle groups found" variant="outlined" /> // Display message if no muscleGroups
                )}

                {/* Display exercises as chips */}
                {/* {routine.exercises && routine.exercises.length > 0 ? (
                  routine.exercises.map((exercise, index) => (
                    <Chip
                      key={index}
                      label={exercise.name}
                      variant="outlined"
                    />
                  ))
                ) : (
                  <Typography>No exercises found</Typography>
                )} */}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignSelf: "end",
              }}
            >
              {/* <Link to={`/training/${routine.id}`}>
                <Button variant="contained">Learn More...</Button>
              </Link> */}
            </Box>
          </CardContent>
        </Card>
      </Link>

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
