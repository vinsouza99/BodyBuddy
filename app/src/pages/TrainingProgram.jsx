import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { setPageTitle } from "../utils/utils";
// import { useLocation } from "react-router-dom";
import { getAllPresetRoutines } from "../controllers/RoutineController";
import {
  getAllUserPrograms,
  // createProgram,
} from "../controllers/ProgramController";
import { getRoutinesFromProgram } from "../controllers/RoutineController";
// import { generateProgram } from "../utils/openaiService.js";
import { useAuth } from "../utils/AuthProvider.jsx";
import TrainingCard from "../components/TrainingCard";
import { Typography, Tabs, Tab } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

const tabStyles = {
  "&.Mui-selected": {
    outline: "none",  // Removes the blue border for the selected tab
    border: "none",   // Removes border
  },
  "&:focus": {
    outline: "none",  // Removes focus outline on keyboard focus
  },
};

export const TrainingProgram = (props) => {
  const { user } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [programRoutines, setprogramRoutines] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
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
        const allPrograms = await getAllUserPrograms(user.id);
        setPrograms(allPrograms);

        const allProgramRoutines = await getRoutinesFromProgram(allPrograms[0].id);
        setprogramRoutines(allProgramRoutines);

        const presetRoutines = await getAllPresetRoutines();
        setRoutines(presetRoutines);
      } catch (e) {
        console.log(e);
      }
    };
    loadData();
  }, []);

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

      {/* MY PROGRAM TAB */}
      {activeTab === 0 && (
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {programs
            ? programs.map((program) => (
                <Typography
                  key={program.id}
                  variant="h2"
                  sx={{
                    fontVariationSettings: "'wght' 800",
                    marginBottom: 2,
                  }}
                >
                  {program.name}
                </Typography>
              ))
            : <Typography>No programs available</Typography>
          }

          <Grid container spacing={2}>
            {programRoutines
              ? programRoutines.map((routine) => (
                  <Grid key={routine.id} size={{xs:12, md:6}} >
                    <TrainingCard routine={routine} />
                  </Grid>
                ))
              : <Typography>No routines available</Typography>
            }
          </Grid>
        </Box>
      )}

      {/* PREMADE ROUTINES TAB */}
      {activeTab === 1 && (
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            {routines
              ? routines.map((routine) => (
                  <Grid key={routine.id} size={{xs:12, md:6}} >
                    <TrainingCard routine={routine} />
                  </Grid>
                ))
              : <Typography>No routines available</Typography>}
          </Grid>
        </Box>
      )}
    </>
  );
  // return (
  //   <div>
  //     <h1>Training</h1>

  //     {/* MY PROPGRAM Section */}
  //     <div>
  //       <Typography variant="h4" align="left">
  //         My Program
  //       </Typography>
  //     </div>

  //     {/* TrainingCard is alined horizontaly to use "Grid" */}
  //     {/* Create TrainingCard for program */}
  //     <Grid container spacing={2}>
  //       {programs
  //         ? programs.map((routine) => (
  //             <Grid size={{ xs: 12, sm: 6, md: 4 }} key={routine.id}>
  //               <TrainingCard key={routine.id} routine={routine} />
  //             </Grid>
  //           ))
  //         : ""}
  //     </Grid>

  //     {/* ROUTINE Section */}
  //     <Box>
  //       <Typography variant="h4" align="left">
  //         Routines
  //       </Typography>
  //     </Box>

  //     <Grid container spacing={2}>
  //       {routines
  //         ? routines.map((routine) => (
  //             <Grid size={{ xs: 12, sm: 6, md: 4 }} key={routine.id}>
  //               <TrainingCard key={routine.id} routine={routine} />
  //             </Grid>
  //           ))
  //         : ""}
  //     </Grid>
  //   </div>
  // );
};

TrainingProgram.propTypes = {
  title: PropTypes.string,
};
