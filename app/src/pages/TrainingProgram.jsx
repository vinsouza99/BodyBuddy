import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import { getAllPresetRoutines } from "../controllers/RoutineController"; // Cocoy: Import the function to display Routines
import TrainingCard from "../components/TrainingCard"; // Cocoy: Load TrainingCard component
import { Typography } from "@mui/material";

export const TrainingProgram = (props) => {
  const [routines, setRoutines] = useState([]); // Cocoy: Declare a state variable to hold the list of routines and a function to update it

  useEffect(() => {
    setPageTitle(props.title);

    const loadRoutines = async () => {
      const presetRoutines = await getAllPresetRoutines(); // Cocoy: Load preset routines
      setRoutines(presetRoutines); // Cocoy: update the state with the loaded routines
    };

    loadRoutines();
  }, []);

  return (
    <div>
      <h1>Training</h1>
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
