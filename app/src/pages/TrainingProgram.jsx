// Reat and Material-UI
import PropTypes from "prop-types";
import { useState, useEffect, useMemo, memo } from "react";
import {
  Box,
  Tabs,
  Tab,
  Grid2,
  Backdrop,
  Typography,
  Modal,
  IconButton,
  Button,
} from "@mui/material";
import { CircularProgress } from "../components/CircularProgress.jsx";
import ProgramLoading from "../assets/ProgramLoading.gif";
import CloseIcon from "@mui/icons-material/Close";
// Gadgets Components
import { GadgetRoutineOfToday } from "../components/GadgetRoutineOfToday.jsx";
import { GadgetSchedule } from "../components/GadgetSchedule.jsx";
import { GadgetPremadeRoutineList } from "../components/GadgetPremadeRoutineList.jsx";
// Common Components
import { useAuth } from "../utils/AuthProvider.jsx";
import { setPageTitle } from "../utils/utils";
import { getAllPresetRoutines } from "../controllers/RoutineController";
import { getAllUserPrograms } from "../controllers/ProgramController";
import { generatePersonalizedProgram } from "../utils/generatePersonalizedProgram";
import axiosClient from "../utils/axiosClient";
// Prompts
import { useGenerateProgramPrompt } from "../utils/prompt/GenerateProgramPrompt";

const tabStyles = {
  "&.Mui-selected": {
    outline: "none",
    border: "none",
  },
  "&:focus": {
    outline: "none",
  },
};

const modalStyle = {
  // Layout and positioning
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // Box model
  width: 450,
  padding: 4,
  borderRadius: '15px',
  // Flexbox alignment
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  // Visual effects
  bgcolor: "background.paper",
  boxShadow: 24,
};

export const TrainingProgram = memo((props) => {
  const { user } = useAuth();
  const [presetRoutines, setPresetRoutines] = useState([]);
  const [activeProgram, setActiveProgram] = useState([]);
  const [programRoutines, setProgramRoutines] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [generating, setGenerating] = useState(false);
  const prompt = useGenerateProgramPrompt({});

  const handleTabChange = (event, value) => {
    setActiveTab(value);
  };

  // Initialization
  useEffect(() => {
    setPageTitle(props.title);
    loadData();
    fetchPrograms();
  }, []);

  // Generate a new personalized program for the user
  useEffect(() => {
    if (!generating) return;

    const generateProgram = async () => {
      await generatePersonalizedProgram(user.id, prompt);
      setGenerating(false);
    };
    generateProgram();
  }, [generating]);

  // Load a new program
  useEffect(() => {
    if (!generating) {
      setLoading(true);
      fetchPrograms();
      loadData();
    }
  }, [generating]);

  // Load program routines data
  const loadData = async () => {
    try {
      // Retrieve Preset Routines
      const presetRoutines = await getAllPresetRoutines();
      setPresetRoutines(presetRoutines);
  
      // Retrieve Program
      const programs = await getAllUserPrograms(user.id, true, false);
      // Find the first program without completed_at
      const activeProgram = programs.find((program) => !program.completed_at);
      if (activeProgram) {
        setActiveProgram(activeProgram);
        setProgramRoutines(activeProgram?.routines || []);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // Fetch programs and check if the user has an active program or not
  const fetchPrograms = async () => {
    try {
      const response = await axiosClient.get(`programs/user/${user.id}`);
      if (Number(response.status) === 200) {
        const programs = response.data.data || [];
        const hasIncompleteProgram = programs.rows.some(
          (program) => !program.completed_at
        );
  
        if (!hasIncompleteProgram) {
          console.log("No active program found. Generate a new one?");
          setOpenModal(true);
        } else {
          console.log("User has active program.");
        }
      } else {
        throw new Error("Failed to fetch programs");
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
      setGenerating(false);
    }
  };

  // Memoize the "My Program" tab content
  const myProgramTabContent = useMemo(() => {
    if (loading) {
      return;
    }
    return (
      <Grid2 container spacing={2}>
        {/* LEFT COLUMN */}
        <Grid2 size={{ xs: 12, md: 7 }}>
          <GadgetRoutineOfToday programRoutines={programRoutines} />
        </Grid2>
        {/* RIGHT COLUMN */}
        <Grid2 size={{ xs: 12, md: 5 }}>
          <GadgetSchedule
            program={activeProgram}
            programRoutines={programRoutines}
          />
        </Grid2>
      </Grid2>
    );
  }, [activeProgram, programRoutines, loading, generating]);

  // Memoize the "Premade Routines" tab content
  const premadeRoutinesTabContent = useMemo(() => {
    if (loading) {
      return;
    }
    return <GadgetPremadeRoutineList presetRoutines={presetRoutines} />;
  }, [presetRoutines, loading]);

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handleGenerateProgram = () => {
    setOpenModal(false);
    setGenerating(true);
  }
  
  return (
    <>
      {/* Backdrop for loading */}
      <Backdrop
        open={generating || loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box textAlign="center">
          {generating ? (
            <Box 
              component="img" 
              src={ ProgramLoading }
              alt="Loading"
              sx={{
                width: "450px",
              }}
            />
          ) : (
            <CircularProgress color="inherit" />
          )}
          <Typography variant="h6" sx={{ mt: 2, whiteSpace: "pre-line" }}>
            {generating ? "Generating personalized program...\nThis process may take about 30 seconds to 1 minute." : "Loading..."}
          </Typography>
        </Box>
      </Backdrop>

      {/* Tab Navigation */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="Program and Preset Routine tabs"
      >
        <Tab label="My Program" sx={tabStyles} />
        <Tab label="Premade Routines" sx={tabStyles} />
      </Tabs>

      <Box sx={{ marginTop: 2 }}>
        {/* MY PROGRAM TAB */}
        {activeTab === 0 &&
          (activeProgram ? (
            myProgramTabContent
          ) : (
            <Typography>No available program</Typography>
          ))}
        {/* PREMADE ROUTINES TAB */}
        {activeTab === 1 && premadeRoutinesTabContent}
      </Box>

      <Modal 
      open={openModal && !loading}
      onClose={handleCloseModal}
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
          onClick={handleCloseModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography textAlign="center">
          No active program found. Generate a new one?
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            width: '100%',
          }}
        >
          <Button variant="outlined" onClick={handleCloseModal} color="primary" fullWidth>
            Not now
          </Button>
          <Button variant="contained" onClick={handleGenerateProgram} color="primary" fullWidth>
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
    </>
  );
});

TrainingProgram.propTypes = {
  title: PropTypes.string,
};

TrainingProgram.displayName = "TrainingProgram";
