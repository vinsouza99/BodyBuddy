import React from "react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Modal from "@mui/material/Modal"; // import QuiltedImageList from "../components/ImageLists";

const LearningCard = ({ exercise, exercise_type }) => {
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
    ? `http://img.youtube.com/vi/${videoURL.split("/embed/")[1]}/sddefault.jpg`
    : null;
  console.log("THE VIDEO THUMBNAIL IS " + videoThumbnail);

  // Memoize the iframe using useMemo
  const memoizedIframe = useMemo(() => {
    return (
      <iframe
        src={videoThumbnail ? videoThumbnail : "Video Thumbnail"}
        title={exercise.name ? exercise.name : "Exercise Name"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        onLoad={() => setLoading(false)} // Set loading to false when the video has loaded
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      ></iframe>
    );
  }, [exercise.name]);

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          position: "relative",
          // width: "100%",
          // paddingTop: "56.25%",

          // Temporary styles for gif
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          // padding: "10px",
          // backgroundSize: "cover",
          height: "240px",
        }}
      >
        {/* Temporary styles for gif */}
        <img
          src={videoThumbnail ? videoThumbnail : "Video Thumbnail"}
          alt={exercise.name ? exercise.name : "Exercise Name"}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            height: "auto",
            display: "block",
            borderRadius: "8px",
            backgroundSize: "cover",
            overflow: "hidden",
          }}
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

        {/* Use the memoized iframe */}
        {memoizedIframe}
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
          {/* Log exercise object */}
          {/*console.log("Exercise object:", exercise)*/}

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

// The URL to extract the ID from
// const url = "https://www.youtube.com/embed/Zqc_lc93hak";

// Extract the ID from the URL
// const videoId = url.split("/embed/")[1];

// Use the ID to create the full video URL
// const videoUrl = `https://www.youtube.com/embed/${videoId}`;

// Assuming you have an `exercise` object
// const src = exercise.video_tutorial_url ? exercise.video_tutorial_url : videoUrl;

// console.log(src);
