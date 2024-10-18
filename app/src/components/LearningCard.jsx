import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Modal from "@mui/material/Modal"; // import QuiltedImageList from "../components/ImageLists";

const LearningCard = ({ exercise }) => {
  // Initialize useNavigate
  const navigate = useNavigate();

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

  return (
    <Card>
      <Box
        sx={{
          // Uncomment this when YoutTube Videos are available
          // position: "relative",
          // width: "100%",
          // paddingTop: "56.25%", // Aspect ratio 16:9

          // Temporary styles for gif
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {/* Uncomment this when YoutTube Videos are available */}
        {/* iframe to hold YouTube video */}
        {/* <iframe
          src={exercise.demo_url ? exercise.demo_url : "Demo URL"}
          title={exercise.name ? exercise.name : "Exercise Name"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        ></iframe> */}

        {/* Temporary styles for gif */}
        <img
          src={exercise.demo_url ? exercise.demo_url : "Demo URL"}
          alt={exercise.name ? exercise.name : "Exercise Name"}
          style={{
            maxWidth: "100%",
            height: "auto", // Ensure GIF scales correctly
            borderRadius: "8px", // Optional styling for appearance
          }}
        />
      </Box>

      <CardContent>
        <Typography variant="h3" textAlign="left" sx={{ marginBottom: 2 }}>
          {/* Display exercise name */}
          {exercise.name ? exercise.name : "Name is undefined or null"}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* Log exercise object */}
          {console.log("Exercise object:", exercise)}

          {exercise && exercise.type ? (
            exercise.type.map((type, index) => (
              <Chip key={index} label={type} variant="outlined" />
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
