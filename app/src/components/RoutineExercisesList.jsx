import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Typography, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  // Layout and positioning
  position: "absolute",
  top: '50%',
  left: '50%',
  transform: "translate(-50%, -50%)",
  // Box model
  width: '600px',
  height: '450px',
  padding: 4,
  borderRadius: '15px',
  // Flexbox alignment
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  // Visual effects
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export const RoutineExercisesList = ({ routineExercises = null, color = "primary.main" }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  // Open Video Modal
  const handleOpenVideo = (videoUrl) => {
    setVideoUrl(videoUrl);
    setShowVideo(true);
  };

  // Close Video Modal
  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  return (
    <>
      <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', gap: 2}}>
        {routineExercises.map((exercise, index) => (
          <Box
            key={index}
            onClick={() => handleOpenVideo(exercise.demo_url)}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: '50px',
              width: '100%',
              height: '80px',
              boxShadow: 3,
            }}
          >
            <Box
              component="img"
              src={exercise.demo_url}
              alt={exercise.name}
              sx={{
                border: '2px solid',
                borderColor: color,
                borderRadius: '50px',
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                marginRight: '1rem',
              }}
            />
            <Typography sx={{ width: '100%', textAlign: 'left' }}>
              {exercise.name}
            </Typography>
            <Typography sx={{ width: '100%', textAlign: 'right' }}>
              {exercise.reps} Reps
            </Typography>
            <Typography sx={{ width: '100%', textAlign: 'center' }}>
              {exercise.sets} Sets
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Show video model */}
      <Modal 
        open={showVideo}
        onClose={handleCloseVideo}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
            },
          },
        }}
      >
        <Box sx={modalStyle}>
          <IconButton
            aria-label="close"
            onClick={handleCloseVideo}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            component="img"
            src={videoUrl}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain', 
            }}
          />
          {/* <ReactPlayer url={"https://youtu.be/4KmY44Xsg2w?si=0w5wBdkHskQ1OfIF"} controls={true} /> */}
        </Box>
      </Modal>
    </>
  )
}

RoutineExercisesList.propTypes = {
  routineExercises: PropTypes.array,
  color: PropTypes.string,
};