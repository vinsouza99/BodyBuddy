import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import { useAuth } from "../utils/AuthProvider.jsx";
import { getAllExercises } from "../controllers/ExerciseController.js";
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Defining prop types for the CustomTabPanel component
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export const Learn = (props) => {
  const { user, handleSignOut } = useAuth();
  const [exercises, setExercises] = useState([]); // Cocoy: Declare a state variable to hold the list of exercises and a function to update it

  useEffect(() => {
    setPageTitle(props.title); // Set the page title

    // Log user id
    console.log(user.id);

    const loadData = async () => {
      // Cocoy: Load exercises
      const response = await getAllExercises();

      // Log the full response
      console.log("Loaded exercises:", response);

      // Access exercises from the response.data property
      const exercisesData = response;

      // Log the exercises data
      console.log("Exercises Data:", exercisesData);

      // Update the state with the loaded routines
      setExercises(exercisesData);
    };

    loadData();
  }, [props.title, user.id]);

  const [value, setValue] = React.useState(0); // State for managing which tab is selected
  const [difficulty, setDifficulty] = React.useState(""); // State for managing selected difficulty level

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update selected tab
    setDifficulty(event.target.value); // Update selected difficulty level
  };

  return (
    <>
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
        <Box display="flex" gap={1} sx={{ marginTop: 2, marginBottom: 4 }}>
          {/* <FormControl sx={{ width: 200 }}> */}
            {/* Dropdown for selecting difficulty */}
            {/* <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={difficulty}
              label="Difficulty"
              onChange={handleChange}
            >
              <MenuItem value={10}>All Levels</MenuItem>
              <MenuItem value={20}>Beginner</MenuItem>
              <MenuItem value={30}>Intermediate</MenuItem>
              <MenuItem value={30}>Advanced</MenuItem>
            </Select>
          </FormControl> */}

          {/* Buttons for filtering exercises by muscle groups */}
          <Button variant="contained">Shoulders</Button>
          <Button variant="contained">Chest</Button>
          <Button variant="contained">Back</Button>
          <Button variant="contained">Arms</Button>
          <Button variant="contained">Core</Button>
          <Button variant="contained">Hips</Button>
          <Button variant="contained">Legs</Button>
        </Box>

        {/* Grid to display LearningCard components */}
        <Grid container spacing={3}>
          {exercises.length > 0
            ? exercises.map((exercise, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <LearningCard exercise={exercise} />
                </Grid>
              ))
            : null}
        </Grid>
      </CustomTabPanel>

      {/* Tab for Exercises by Goal */}
      <CustomTabPanel value={value} index={1}>
        <Box display="flex" gap={1} sx={{ marginTop: 2, marginBottom: 4 }}>
          {/* <FormControl sx={{ width: 200 }}> */}
            {/* Dropdown for selecting difficulty */}
            {/* <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={difficulty}
              label="Difficulty"
              onChange={handleChange}
            >
              <MenuItem value={10}>All Levels</MenuItem>
              <MenuItem value={20}>Beginner</MenuItem>
              <MenuItem value={30}>Intermediate</MenuItem>
              <MenuItem value={30}>Advanced</MenuItem>
            </Select>
          </FormControl> */}
          {/* Buttons for filtering exercises by fitness goals */}
          <Button variant="contained">Gain Muscle</Button>
          <Button variant="contained">Lose Body Fat</Button>
          <Button variant="contained">Get Stronger</Button>
          <Button variant="contained">Stretch</Button>
          <Button variant="contained">Warm Up</Button>
        </Box>

        {/* Grid to display LearningCard components */}

        <Grid container spacing={3}>
          {Array.isArray(exercises) && exercises.length > 0 ? (
            exercises.map((exercise, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <LearningCard exercise={exercise} />
              </Grid>
            ))
          ) : (
            <p>No exercises available.</p> // Show a message if there are no exercises
          )}
        </Grid>
      </CustomTabPanel>
    </>
  );
};
