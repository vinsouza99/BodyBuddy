import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const LearningCard = ({ exercise, exercise_type }) => {
  // Access the theme for styling
  const theme = useTheme();

  // Initialize useNavigate
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Cocoy: Pass exercises property to TrainingCard
  const [open, setOpen] = useState(false);

  // Cocoy: Declare a state variable to hold the currently selected exercise for the modal and initialize it to null
  const [selectedExercise, setSelectedExercise] = useState(null);

  // If modal will be used
  const handleOpen = () => {
    // Cocoy: Set the selected exercise to the passed exercise and open the modal
    setSelectedExercise(exercise);
    setOpen(true);
  };

  // If modal will be used
  const handleClose = () => {
    setOpen(false);

    // Cocoy: reset the selected exercise to null
    setSelectedExercise(null);
  };

  // Navigate to the exercise page with the specific ID
  const handleStartExercise = (id) => {
    navigate(`/exercise/${id}`);
  };

  // Extract the video thumbnail
  const videoURL = exercise.video_tutorial_url;
  const videoThumbnail = videoURL
    ? `http://img.youtube.com/vi/${videoURL.split("/embed/")[1]}/maxresdefault.jpg`
    : null;

  return (
    <Card
      className="cardBorderHover"
      sx={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Box>
        <img
          src={videoThumbnail ? videoThumbnail : "Video Thumbnail"}
          alt={exercise.name ? exercise.name : "Exercise Name"}
          style={{
            width: "100%",
            borderBottom: `1px solid ${theme.palette.background.light}`,
          }}
          onLoad={() => setLoading(false)} // Set loading to false when the image has loaded
        />

        {/* Show loading spinner until video loads */}
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              zIndex: 1,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3" textAlign="left" sx={{ marginBottom: 2 }}>
          {/* Display exercise name */}
          {exercise.name ? exercise.name : "Name is undefined or null"}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* COCOY TODO: Display exercise types */}
          {exercise && exercise.types && exercise.types.length > 0 ? (
            exercise.types.map((type, index) => (
              <Chip key={index} label={type.name} variant="outlined" />
            ))
          ) : (
            // Message if no exercise type
            <Chip label="No exercise type" variant="outlined" />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default LearningCard;
