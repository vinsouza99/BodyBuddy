import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Box, Typography, Modal, IconButton, Button, Divider } from "@mui/material";
import { getExercise } from "../controllers/ExerciseController";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";


const modalStyle = {
  // Layout and positioning
  position: "absolute",
  top: '50%',
  left: '50%',
  transform: "translate(-50%, -50%)",
  // Box model
  width: '90%',
  maxWidth: '800px',
  maxHeight: '90vh',
  overflowY: 'auto',
  overflowX: 'hidden',
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

export const RoutineExercisesList = ({ routineExercises = [], color = "primary.main" }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [selectedExercise, setselectedExercise] = useState('');
  const [focusAreas, setFocusAreas] = useState('');
  const [goals, setGoals] = useState('');
  const [showMore, setShowMore] = useState(false);

  // Load exercise detail data
  useEffect(() => {
    if (!selectedExercise?.id) return;

    const loadExerciseData = async () => {
      const exercise = await getExercise(selectedExercise?.id, true);
      console.log(exercise);
      const focusAreas = exercise?.muscleGroups?.map((group) => group.name).join(", ") || "None";
      setFocusAreas(focusAreas);
      const goals = exercise?.goals?.map((goal) => goal.name).join(", ") || "None";
      setGoals(goals);
    };
    loadExerciseData();
  }, [selectedExercise]);

  // Open Video Modal
  const handleOpenVideo = (exercise) => {
    setselectedExercise(exercise);
    setShowVideo(true);
  };

  // Close Video Modal
  const handleCloseVideo = () => {
    setShowVideo(false);
    setShowMore(false);
  };

  return (
    <>
      <Box sx={{boxSizing: 'border-box', width: '100%', display: 'flex', flexDirection: 'column', gap: 2}}>
        {routineExercises.map((exercise, index) => (
          <Box
            key={index}
            onClick={() => handleOpenVideo(exercise)}
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
            src={selectedExercise.demo_url}
            sx={{
              width: '60%',
              height: '60%',
              objectFit: 'contain', 
            }}
          />
          <Box
            sx={{
              display: "flex", 
              flexDirection: "row", 
              flexWrap: "wrap",
              justifyContent: "space-between", 
              alignItems: "center",
              width: '100%',
              gap: 2,
            }}
          >
            <Typography variant="h2" sx={{fontWeight: "bold"}}>{selectedExercise.name}</Typography>
            <Box sx={{ marginLeft: "auto" }}>
              <Button
                variant="contained"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore 
                ? 
                  <>
                    Show Less
                    <KeyboardArrowUpIcon/>
                  </>
                : 
                  <>
                    Show More
                    <KeyboardArrowDownIcon/>
                  </>
                }
              </Button>
            </Box>
          </Box>
          {showMore &&
            <Box
              sx={{display: "flex", flexDirection: "column", gap: 2, width: "100%"}}
            >
              <Divider></Divider>
              <Typography>{selectedExercise.description}</Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "1rem",
                  width: "100%",
                }}
              >
                {/* Display Focus Area */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "left",
                    borderColor: "text.primary",
                    color: "text.primary",
                    // minWidth: "180px",
                    width: "100%",
                    border: "1px solid",
                    borderRadius: "8px",
                    padding: "0.75rem",
                    gap: "0.5rem",
                  }}
                >
                  <AccessibilityIcon sx={{ color: "primary.main" }} />
                  <Box>
                    <Box
                      component="p"
                      sx={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        margin: "0",
                        fontSize: "1rem",
                      }}
                    >
                      Focus Areas
                    </Box>
                    <Box
                      component="p"
                      sx={{ lineHeight: "1.2", margin: "0", fontSize: "0.9rem" }}
                    >
                      {focusAreas}
                    </Box>
                  </Box>
                </Box>

                {/* Display Goals */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "left",
                    borderColor: "text.primary",
                    color: "text.primary",
                    // minWidth: "180px",
                    width: "100%",
                    border: "1px solid",
                    borderRadius: "8px",
                    padding: "0.75rem",
                    gap: "0.5rem",
                  }}
                >
                  <TrackChangesIcon sx={{ color: "primary.main" }} />
                  <Box>
                    <Box
                      component="p"
                      sx={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        margin: "0",
                        fontSize: "1rem",
                      }}
                    >
                      Goals
                    </Box>
                    <Box
                      component="p"
                      sx={{ lineHeight: "1.2", margin: "0", fontSize: "0.9rem" }}
                    >
                      {goals}
                    </Box>
                  </Box>
                </Box>
              </Box>

            </Box>
          }
        </Box>
      </Modal>
    </>
  )
}

RoutineExercisesList.propTypes = {
  routineExercises: PropTypes.array,
  color: PropTypes.string,
};