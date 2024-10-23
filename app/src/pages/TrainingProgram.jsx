// Reat and Material-UI
import PropTypes from "prop-types";
import { useState, useEffect, useMemo, memo } from "react";
import {
  Box,
  Tabs,
  Tab,
  Grid2,
  Backdrop,
  CircularProgress,
  Typography,
} from "@mui/material";
// Gadgets Components
import { GadgetRoutineOfToday } from "../components/GadgetRoutineOfToday.jsx";
import { GadgetSchedule } from "../components/GadgetSchedule.jsx";
import { GadgetPremadeRoutineList } from "../components/GadgetPremadeRoutineList.jsx";
// Common Components
import { useAuth } from "../utils/AuthProvider.jsx";
import { setPageTitle } from "../utils/utils";
import {
  getAllPresetRoutines,
  getRoutinesFromProgram,
  getExercisesFromRoutine,
} from "../controllers/RoutineController";
import { getAllUserPrograms } from "../controllers/ProgramController";

// !!! WILL APPLY THIS CODE LATER TO GET USER PREFERENCES !!!
// import { useLocation } from "react-router-dom";
// import { generateProgram } from "../utils/openaiService.js";

const tabStyles = {
  "&.Mui-selected": {
    outline: "none", // Removes the blue border for the selected tab
    border: "none", // Removes border
  },
  "&:focus": {
    outline: "none", // Removes focus outline on keyboard focus
  },
};

export const TrainingProgram = memo((props) => {
  const { user } = useAuth();
  const [presetRoutines, setPresetRoutines] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [programRoutines, setProgramRoutines] = useState([]);
  // const [routineExercises, setRoutineExercises] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  // !!! WILL APPLY THIS CODE LATER TO GET USER PREFERENCES !!!
  // const location = useLocation();
  // const [userProgramPreferences, setUserProgramPreferences] = useState(null);

  const handleTabChange = (event, value) => {
    setActiveTab(value);
  };

  // Initialization
  useEffect(() => {
    setPageTitle(props.title);

    const loadData = async () => {
      try {
        // setUserProgramPreferences(
        //   location.state ? location.state.userResponses : null
        // );
        // if (userProgramPreferences) {
        //   const generatedProgramObj = await generateProgram(
        //     userProgramPreferences
        //   );
        //   await createProgram(user.id, generatedProgramObj);
        // }

        // Retrieve Preset Routines
        const presetRoutines = await getAllPresetRoutines();
        setPresetRoutines(presetRoutines);

        // Retrieve Program Routines
        const programs = await getAllUserPrograms(user.id);
        setPrograms(programs);
        setProgramRoutines(programs[0].routines);

        // const routines = await getRoutinesFromProgram(programs[0].id);
        // setProgramRoutines(routines);
        // console.log(routines);

        const exercises = await getExercisesFromRoutine(routines[0].id);
        setRoutineExercises(exercises);
        console.log(exercises);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Memoize the "My Program" tab content
  const myProgramTabContent = useMemo(() => {
    if (loading) {
      return;
    }
    return (
      <Grid2 container spacing={2}>
        {/* LEFT COLUMN */}
        <Grid2 size={{ xs: 12, md: 7 }}>
          <GadgetRoutineOfToday
            programRoutines={programRoutines}
            routineExercises={routineExercises}
          />
        </Grid2>
        {/* RIGHT COLUMN */}
        <Grid2 size={{ xs: 12, md: 5 }}>
          <GadgetSchedule
            programs={programs}
            programRoutines={programRoutines}
          />
        </Grid2>
      </Grid2>
    );
  }, [programs, programRoutines, routineExercises, loading]);

  // Memoize the "Premade Routines" tab content
  const premadeRoutinesTabContent = useMemo(() => {
    if (loading) {
      return;
    }
    return <GadgetPremadeRoutineList presetRoutines={presetRoutines} />;
  }, [presetRoutines, loading]);

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
        {activeTab === 0 && myProgramTabContent}
        {/* PREMADE ROUTINES TAB */}
        {activeTab === 1 && premadeRoutinesTabContent}
      </Box>
    </>
  );
});

TrainingProgram.propTypes = {
  title: PropTypes.string,
};

TrainingProgram.displayName = "TrainingProgram";
