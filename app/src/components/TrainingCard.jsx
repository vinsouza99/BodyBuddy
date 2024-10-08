import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal"; // import QuiltedImageList from "../components/ImageLists";

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        { props: { variant: "body2" }, style: { fontSize: 11 } },
        { props: { variant: "body3" }, style: { fontSize: 9 } },
      ],
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TrainingCard = ({ routine }) => {
  // Initialize useNavigate
  const navigate = useNavigate();
  // Cocoy: Pass routines property to TrainingCard
  const [open, setOpen] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null); // Cocoy: Declare a state variable to hold the currently selected routine for the modal and initialize it to null

  // const handleOpen = () => setOpen(true);
  const handleOpen = () => {
    // Cocoy: Set the selected routine to the passed routine and open the modal
    setSelectedRoutine(routine);
    setOpen(true);
  };

  // const handleClose = () => setOpen(false);
  const handleClose = () => {
    setOpen(false);
    setSelectedRoutine(null); // Cocoy: reset the selected routine to null
  };

  // Navigate to the Routine page with the specific ID
  const handleStartRoutine = (id) => {
    //console.log(`LOADING ROUTINE WITH ID: ${id}`, selectedRoutine);
    navigate(`/routine/${id}`);
  };

  return (
    <Grid item xs={3}>
      <ThemeProvider theme={theme}>
        <Paper elevation={5}>
          <Box
            sx={{
              display: "inline",
              textAlign: "center",
              padding: "1.5rem",
            }}
          >
            <Typography variant="h6" component="h3" align="center">
              {/* Cocoy: ternary to display routine name */}
              {routine.name ? routine.name : "Name is undefined or null"}{" "}
            </Typography>
            <Typography variant="p" align="center">
              {/* Cocoy: ternary to display routine description */}
              {routine.description
                ? routine.description
                : "Description is undefined or null"}{" "}
            </Typography>
            <div>
              <Button onClick={handleOpen}>Learn More...</Button>
            </div>
            <div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography variant="h6" component="h3" align="center">
                    {/* Cocoy: display the routine description */}
                    {selectedRoutine?.name}
                  </Typography>
                  <div>
                    <Typography align="center">
                      {/* Cocoy: display the routine name */}
                      {selectedRoutine?.description}
                    </Typography>

                    <Typography variant="body2" align="center">
                      {/*
                        Cocoy: Check if the selected routine has exercises.
                        If it does, map through them and display each exercise name.
                        Otherwise, display "No exercises available".
                      */}
                      {selectedRoutine?.exercises?.length
                        ? selectedRoutine.exercises.map((exercise, index) => (
                            <div key={index}>{exercise.name}</div>
                          ))
                        : "No exercises available"}
                    </Typography>
                    <Box display="flex" justifyContent="center">
                      <Button onClick={() => handleStartRoutine(routine.id)}>
                        Start Routine
                      </Button>
                    </Box>
                  </div>
                </Box>
              </Modal>
            </div>
          </Box>
        </Paper>
      </ThemeProvider>
    </Grid>
  );
};

export default TrainingCard;
