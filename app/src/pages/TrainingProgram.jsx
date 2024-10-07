import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import { getAllPresetRoutines } from "../controllers/RoutineController"; // Cocoy: Import the function to display Routines
import { getAllUserPrograms } from "../controllers/ProgramController"; // Teru: Import the function to display Programs
import { useAuth } from "../utils/AuthProvider.jsx";

import TrainingCard from "../components/TrainingCard"; // Cocoy: Load TrainingCard component
import { Typography, Grid } from "@mui/material";

export const TrainingProgram = (props) => {
  const { user, handleSignOut } = useAuth();
  const [programs, setPrograms] = useState([]); // Teru: Declare a state variable to hold the list of routines and a function to update it
  const [routines, setRoutines] = useState([]); // Cocoy: Declare a state variable to hold the list of routines and a function to update it

  useEffect(() => {
    setPageTitle(props.title);
    console.log(user.id);
    const loadData = async () => {
      const Allprograms = await getAllUserPrograms(user.id); // Teru: Load all programs
      setPrograms(Allprograms); // Teru: update the state with the loaded routines

      const presetRoutines = await getAllPresetRoutines(); // Cocoy: Load preset routines
      setRoutines(presetRoutines); // Cocoy: update the state with the loaded routines
    };

    loadData();
  }, [props.title]);

  return (
    <div padding="1rem">
      <h1>Training</h1>
      <div>
        <Typography variant="h4" align="left" marginTop="1rem">
          My Program
        </Typography>
      </div>

        {/* TrainingCard is alined horizontaly to use "Grid" */}
        {/* Create TrainingCard for program */}
      <Grid container spacing={2} justifyContent="flex-start">
        {programs
          ? programs.map((routine) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={routine.id}>
              <TrainingCard key={routine.id} routine={routine} />
            </Grid>
            ))
          : ""}
      </Grid>


      <div>
        <Typography variant="h4" align="left" marginTop="1rem">
          Routines
        </Typography>
      </div>

      <Grid container spacing={2} justifyContent="flex-start">
        {/* Create TrainingCard for each routine */}
        {routines
          ? routines.map((routine) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={routine.id}>
              <TrainingCard key={routine.id} routine={routine} />
            </Grid>
            ))
          : ""}
      </Grid>
    </div>
  );
};

TrainingProgram.propTypes = {
  title: PropTypes.string,
};
