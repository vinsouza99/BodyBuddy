import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import {
  getExercisesFromRoutine,
  getRoutine,
} from "../controllers/RoutineController.js";
import { RoutineExercisesList } from "../components/RoutineExercisesList";
import {
  Box,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { StartRoutineSessionModal } from "../components/StartRoutineSessionModal";

export const PremadeRoutine = (props) => {
  const { routine_id } = useParams();
  const [routine, setRoutine] = useState({});
  const [loading, setLoading] = useState(true);
  const [openSessionModal, setOpenSessionModal] = useState(false);

  useEffect(() => {
    setPageTitle(props.title);

    const loadData = async () => {
      try {
        const routineData = await getRoutine(routine_id);
        routineData.exercises = await getExercisesFromRoutine(routine_id);
        setRoutine(routineData);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Close StartRoutineSessionModal
  const handleClose = () => {
    setOpenSessionModal(false);
  };

  return (
    <>
      {/* Backdrop for loading */}
      <Backdrop
        open={loading} // Control when to show the overlay
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box textAlign="center">
          <CircularProgress color="inherit" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Box>
      </Backdrop>

      {!loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          {/* Back Button */}
          <Button
            href="/training"
            sx={{
              alignSelf: "flex-start",
              marginBottom: 2,
              padding: "0",
              color: "text.primary",
              fontSize: "1.1rem",
            }}
          >
            &lt; Back to Training
          </Button>

          {/* Routine Video and Details */}
          <Paper
            sx={{
              width: "100%",
              maxWidth: "900px",
              textAlign: "center",
              borderRadius: "20px",
              overflow: "hidden",
              marginBottom: "1rem",
              position: "relative", // Add position relative for absolute children
              backgroundColor: "background.paper",
            }}
          >
            <Box
              sx={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{ width: "100%", textAlign: "left" }}
              >
                {routine?.name || ""}
              </Typography>

              <RoutineExercisesList
                routineExercises={routine.exercises}
                color="primary.main"
              />

              {/* Practice Button */}
              <Button
                onClick={() => setOpenSessionModal(true)}
                sx={{
                  width: "150px",
                  height: "150px",
                  color: "text.primary",
                  backgroundColor: "#4DC53C",
                  borderRadius: "50%",
                  padding: 0,
                  minWidth: "unset",
                  fontSize: "1.2rem",
                  marginTop: "0.8rem",
                  marginBottom: "0.8rem",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
                }}
              >
                GET
                <br />
                STARTED
              </Button>
            </Box>
          </Paper>
        </Box>
      )}

      {/* Transition to session screen */}
      <StartRoutineSessionModal
        open={openSessionModal}
        id={routine_id}
        idType="routine"
        onClose={handleClose}
      />
    </>
  );
};

PremadeRoutine.propTypes = {
  title: PropTypes.string,
};
