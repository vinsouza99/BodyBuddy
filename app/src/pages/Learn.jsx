import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, memo } from "react";
import { setPageTitle } from "../utils/utils";
import { useAuth } from "../utils/AuthProvider.jsx";
import { getAllExercises } from "../controllers/ExerciseController.js";
import {
  getAllGoals,
  getAllMuscleGroups,
} from "../controllers/LocalTablesController.js";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Tabs,
  Tab,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Backdrop,
  CircularProgress,
  Typography,
} from "@mui/material";
import LearningCard from "../components/LearningCard";

// Custom tab panel to display content conditionally based on the selected tab
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

// Defining prop types for the CustomTabPanel component
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export const Learn = memo((props) => {
  const { user, handleSignOut } = useAuth();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]); // Cocoy: Declare a state variable to hold the list of exercises and a function to update it
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedMuscleGroupID, setSelectedMuscleGroupID] = useState("");
  const [selectedGoalID, setSelectedGoalID] = useState("");
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPageTitle(props.title); // Set the page title

    // Log user id
    console.log(user.id);

    const loadData = async () => {
      try {
        // Cocoy: Load exercises
        const response = await getAllExercises();

        // Log the full response
        //console.log("Loaded exercises:", response);

        // Access exercises from the response.data property
        const exercisesData = response;

        // Log the exercises data
        //console.log("Exercises Data:", exercisesData);

        // Update the state with the loaded routines
        setExercises(exercisesData);
        setFilteredExercises(exercisesData);
        const muscleGroupsData = await getAllMuscleGroups();
        setMuscleGroups(muscleGroupsData);

        const fitnessGoalsData = await getAllGoals();
        setGoals(fitnessGoalsData);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [props.title, user.id]);

  const [value, setValue] = React.useState(0); // State for managing which tab is selected
  const handleChange = (event, newValue) => {
    setValue(newValue); // Update selected tab
  };
  useEffect(() => {
    filterExercisesByMuscleGroup(selectedMuscleGroupID);
  }, [selectedMuscleGroupID]);

  useEffect(() => {
    filterExercisesByGoal(selectedGoalID);
  }, [selectedGoalID]);

  const handleSelectMuscleGroup = (event) => {
    setSelectedMuscleGroupID(event.target.value);
  };
  const handleSelectGoal = (event) => {
    setSelectedGoalID(event.target.value);
  };
  const filterExercisesByMuscleGroup = (muscleGroupID) => {
    const filteredArray = exercises.filter((exercise) =>
      exercise.hasMuscleGroup(muscleGroupID)
    );
    setFilteredExercises(filteredArray);
  };
  const filterExercisesByGoal = (goalID) => {
    const filteredArray = exercises.filter((exercise) =>
      exercise.hasGoal(goalID)
    );

    setFilteredExercises(filteredArray);
  };
  // Memoize the exercises grid
  const exercisesGrid = useMemo(() => {
    return (
      <Grid container spacing={3}>
        {filteredExercises.length > 0
          ? filteredExercises.map((exercise, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={index}
                onClick={() => navigate(`/learn/${exercise.id}`)}
              >
                <Link to={`/learn/${exercise.id}`}>
                  <LearningCard exercise={exercise} />
                </Link>
              </Grid>
            ))
          : null}
      </Grid>
    );
  }, [filteredExercises, loading]);

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

      <Box display="flex" alignItems="flex-start">
        {/* Tabs for selecting categories (Muscle or Goal) */}
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Exercises by Muscle" />
          <Tab label="Exercises by Goal" />
        </Tabs>
      </Box>

      {/* Tab for Exercises by Muscle */}
      <CustomTabPanel value={value} index={0}>
        <Box
          display="flex"
          gap={1}
          flexWrap="wrap"
          sx={{ marginTop: 2, marginBottom: 4 }}
        >
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="muscle-group-label">MuscleGroup</InputLabel>
            <Select
              labelId="muscle-group-label"
              id="muscle-group-select"
              value={selectedMuscleGroupID}
              label="Muscle Group"
              onChange={handleSelectMuscleGroup}
            >
              {muscleGroups.map((muscleGroup) => (
                <MenuItem value={muscleGroup.id}>{muscleGroup.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* Grid to display LearningCard components */}
        {exercisesGrid}
      </CustomTabPanel>

      {/* Tab for Exercises by Goal */}
      <CustomTabPanel value={value} index={1}>
        <Box
          display="flex"
          gap={1}
          flexWrap="wrap"
          sx={{ marginTop: 2, marginBottom: 4 }}
        >
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="goal-label">Goals</InputLabel>
            <Select
              labelId="goal-label"
              id="goal-select"
              value={selectedGoalID}
              label="Goal"
              onChange={handleSelectGoal}
            >
              {goals.map((goal) => (
                <MenuItem value={goal.id}>{goal.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* Grid to display LearningCard components */}
        {exercisesGrid}
      </CustomTabPanel>
    </>
  );
});
