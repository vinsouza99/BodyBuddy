import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo, memo } from "react";
import { setPageTitle } from "../utils/utils";
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
  Backdrop,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import { CircularProgress } from "../components/CircularProgress.jsx";
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
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]); // Cocoy: Declare a state variable to hold the list of exercises and a function to update it
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedMuscleGroupID, setSelectedMuscleGroupID] = useState("");
  const [selectedGoalID, setSelectedGoalID] = useState("");
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0); //when pagination button is clicked, change this offset by 9 (increment by 9 if 'next' page is clicked, decrement by 9 if 'prev' is clicked)

  // Media query for screen size <= 600px
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    setPageTitle(props.title); // Set the page title

    const loadData = async () => {
      try {
        await loadExerciseData();
        const muscleGroupsData = await getAllMuscleGroups();
        setMuscleGroups([{ id: 0, name: "All" }, ...muscleGroupsData]);

        const fitnessGoalsData = await getAllGoals();
        setGoals([{ id: 0, name: "All" }, ...fitnessGoalsData]);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [props.title]);

  const loadExerciseData = async () => {
    try {
      // Cocoy: Load exercises
      const response = await getAllExercises(offset, 9);

      // Log the full response
      //console.log("Loaded exercises:", response);

      // Access exercises from the response.data property
      const exercisesData = response;

      // Log the exercises data
      //console.log("Exercises Data:", exercisesData);

      // Update the state with the loaded routines
      setExercises(exercisesData);
      setFilteredExercises(exercisesData);
      console.log(exercisesData);
    } catch (e) {
      console.error(e);
    }
  };
  const [value, setValue] = React.useState(0); // State for managing which tab is selected
  const handleChange = (event, newValue) => {
    setValue(newValue); // Update selected tab
    setFilteredExercises(exercises);
    setSelectedGoalID(0);
    setSelectedMuscleGroupID(0);
  };
  useEffect(() => {
    loadExerciseData();
  }, [offset]);
  useEffect(() => {
    filterExercisesByMuscleGroup(selectedMuscleGroupID);
  }, [selectedMuscleGroupID]);

  useEffect(() => {
    filterExercisesByGoal(selectedGoalID);
  }, [selectedGoalID]);
  useEffect(() => {});
  const handleSelectMuscleGroup = (event) => {
    setSelectedMuscleGroupID(event.target.value);
  };
  const handleSelectGoal = (event) => {
    setSelectedGoalID(event.target.value);
  };
  const filterExercisesByMuscleGroup = (muscleGroupID) => {
    const filteredArray =
      muscleGroupID == 0
        ? exercises
        : exercises.filter((exercise) =>
            exercise.hasMuscleGroup(muscleGroupID)
          );
    setFilteredExercises(filteredArray);
  };
  const filterExercisesByGoal = (goalID) => {
    const filteredArray =
      goalID == 0
        ? exercises
        : exercises.filter((exercise) => exercise.hasGoal(goalID));

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
                <Link
                  to={`/learn/${exercise.id}`}
                  state={{ exerciseInitialData: exercise }}
                  style={{ textDecoration: "none" }}
                >
                  <LearningCard exercise={exercise} />
                </Link>
              </Grid>
            ))
          : null}
      </Grid>
    );
  }, [filteredExercises, loading]);

  // Pagination handlers
  const handleNextPage = () => {
    setOffset(offset + 9);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    setOffset(offset - 9);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

      <Box display="flex" alignItems="flex-start">
        {/* Tabs for selecting categories (Muscle or Goal) */}
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {/* Display different tab labels based on screen size */}
          <Tab label={isSmallScreen ? "By Muscle" : "Exercises by Muscle"} />
          <Tab label={isSmallScreen ? "By Goal" : "Exercises by Goal"} />
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
          <FormControl sx={{ marginTop: 2, minWidth: 200 }}>
            <InputLabel id="muscle-group-label">Muscle Group</InputLabel>
            <Select
              labelId="muscle-group-label"
              id="muscle-group-select"
              value={selectedMuscleGroupID}
              label="Muscle Group"
              onChange={handleSelectMuscleGroup}
              sx={{ textAlign: "left" }}
            >
              {muscleGroups.map((muscleGroup, index) => (
                <MenuItem value={muscleGroup.id} key={index}>
                  {muscleGroup.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </CustomTabPanel>

      {/* Tab for Exercises by Goal */}
      <CustomTabPanel value={value} index={1}>
        <Box
          display="flex"
          gap={1}
          flexWrap="wrap"
          sx={{ marginTop: 2, marginBottom: 4 }}
        >
          <FormControl sx={{ marginTop: 2, minWidth: 200 }}>
            <InputLabel id="goal-label">Goals</InputLabel>
            <Select
              labelId="goal-label"
              id="goal-select"
              value={selectedGoalID}
              label="Goal"
              onChange={handleSelectGoal}
              sx={{ textAlign: "left" }}
            >
              {goals.map((goal, index) => (
                <MenuItem value={goal.id} key={index}>
                  {goal.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </CustomTabPanel>
      {/* Grid to display LearningCard components */}
      {exercisesGrid}

      {/* Pagination Buttons */}
      <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
        <Button
          variant="outlined"
          onClick={handlePrevPage}
          disabled={offset === 0}
          sx={{ marginRight: 2 }}
        >
          Prev
        </Button>
        <Button
          variant="outlined"
          onClick={handleNextPage}
          disabled={filteredExercises.length < 9}
        >
          Next
        </Button>
      </Box>    
    </>
  );
});

Learn.propTypes = {
  title: PropTypes.string,
};

// Setting the display name for debugging
Learn.displayName = "Learn";

