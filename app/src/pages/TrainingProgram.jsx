import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import { getAllPresetRoutines } from "../controllers/RoutineController"; // Cocoy: Import the function to display Routines
import { getAllUserPrograms } from "../controllers/ProgramController"; // Teru: Import the function to display Programs

import TrainingCard from "../components/TrainingCard"; // Cocoy: Load TrainingCard component
import { Typography } from "@mui/material";

import { useAuth } from "../utils/AuthProvider.jsx";

export const TrainingProgram = (props) => {
  const [programs, setPrograms] = useState([]); // Teru: Declare a state variable to hold the list of routines and a function to update it
  const [routines, setRoutines] = useState([]); // Cocoy: Declare a state variable to hold the list of routines and a function to update it

  const { user } = useAuth();
  console.log(user);
  

  useEffect(() => {
    setPageTitle(props.title);

    const loadData = async () => {
      const Allprograms = await getAllUserPrograms(user.id); // Teru: Load all programs
      setPrograms(Allprograms); // Teru: update the state with the loaded routines

      const presetRoutines = await getAllPresetRoutines(); // Cocoy: Load preset routines
      setRoutines(presetRoutines); // Cocoy: update the state with the loaded routines
    };

    loadData();
  }, [props.title]);

  return (
    <div>
      <h1>Training</h1>
      <div>
        <Typography variant="h4" align="left">
          My Program
        </Typography>
        {/* Create TrainingCard for program */}
        {programs.map((routine) => (
          <TrainingCard key={routine.id} routine={routine} />
        ))}
      </div>


      <div>
        <Typography variant="h4" align="left">
          Routines
        </Typography>
        {/* Create TrainingCard for each routine */}
        {routines.map((routine) => (
          <TrainingCard key={routine.id} routine={routine} />
        ))}
      </div>
    </div>
  );
};

TrainingProgram.propTypes = {
  title: PropTypes.string,
};
