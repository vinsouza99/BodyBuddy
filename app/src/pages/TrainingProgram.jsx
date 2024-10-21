// Reat and Material-UI
import PropTypes from "prop-types";
import { useState, useEffect, useMemo, memo } from "react";
import { Typography, Box, Tabs, Tab, Grid2 } from "@mui/material";
// Common Components
import { setPageTitle } from "../utils/utils";
import { GadgetRoutineOfToday } from "../components/GadgetRoutineOfToday.jsx";
import { GadgetSchedule } from "../components/GadgetSchedule.jsx";
import TrainingCard from "../components/TrainingCard";
import { getAllPresetRoutines } from "../controllers/RoutineController";

// !!! WILL APPLY THIS CODE LATER TO GET USER PREFERENCES !!!
// import { useLocation } from "react-router-dom";
// import { generateProgram } from "../utils/openaiService.js";

const tabStyles = {
  "&.Mui-selected": {
    outline: "none",  // Removes the blue border for the selected tab
    border: "none",   // Removes border
  },
  "&:focus": {
    outline: "none",  // Removes focus outline on keyboard focus
  },
};

export const TrainingProgram = memo((props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [routines, setRoutines] = useState([]);

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
        const presetRoutines = await getAllPresetRoutines();
        setRoutines(presetRoutines);
      } catch (e) {
        console.log(e);
      }
    };
    loadData();
  }, [props.title]);

  // Memoize the "My Program" tab content
  const myProgramTabContent = useMemo(() => {
    return (
      <Grid2 container spacing={2} >
        {/* LEFT COLUMN */}
        <Grid2 size={{xs:12, md:8}} >
          <GadgetRoutineOfToday />
        </Grid2>
        {/* RIGHT COLUMN */}
        <Grid2 size={{xs:12, md:4}} >
          <GadgetSchedule />          
        </Grid2>
      </Grid2>
    );
  }, []); 

  // Memoize the "Premade Routines" tab content
  const premadeRoutinesTabContent = useMemo(() => {
    return (
      <Grid2 container spacing={2}>
        {routines.length > 0
          ? routines.map((routine) => (
              <Grid2 key={routine.id} size={{ xs: 12, md: 6 }}>
                <TrainingCard routine={routine} />
              </Grid2>
            ))
          : (
            <Typography>No routines available</Typography>
          )}
      </Grid2>
    );
  }, [routines]);

  return (
    <>
      {/* Tab Navigation */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="Program and Preset Routine tabs"
      >
        <Tab label="My Program" sx={ tabStyles } />
        <Tab label="Premade Routines" sx={ tabStyles } />
      </Tabs>

      <Box
        sx={{
          marginTop: 2,
        }}
      >
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

TrainingProgram.displayName = 'TrainingProgram';
