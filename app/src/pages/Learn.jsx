import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, memo } from "react";
import { setPageTitle } from "../utils/utils";
import {
  getAllExercises,
  getExercisesCount,
} from "../controllers/ExerciseController.js";
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
  useMediaQuery,
  Pagination,
  Skeleton,
} from "@mui/material";
import { LoadingBackdrop } from "../components/LoadingBackdrop";
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
  const [value, setValue] = React.useState(0); // State for managing which tab is selected
  const [selectedMuscleGroupID, setSelectedMuscleGroupID] = useState("");
  const [selectedGoalID, setSelectedGoalID] = useState("");
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(9);

  // Media query for screen size <= 600px
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    setPageTitle(props.title); // Set the page title

    const loadData = async () => {
      try {
        const exercisesCount = (await getExercisesCount()).data.data;
        const exercisesData = await getAllExercises(0, 9);
        // Update the state with the loaded routines
        setExercises(exercisesData);
        setFilteredExercises(exercisesData);
        const muscleGroupsData = await getAllMuscleGroups();
        setMuscleGroups([{ id: 0, name: "All" }, ...muscleGroupsData]);

        const fitnessGoalsData = await getAllGoals();
        setGoals([{ id: 0, name: "All" }, ...fitnessGoalsData]);
        setLoading(false);
        for (let i = 1; i <= Math.ceil(exercisesCount / 9); i++) {
          const pageContent = await getAllExercises(9 * i, 9);
          setExercises((prevExercises) => [...prevExercises, ...pageContent]);
          setFilteredExercises((prevExercises) => [
            ...prevExercises,
            ...pageContent,
          ]);
          setPagesCount(i);
        }
      } catch (e) {
        navigate("/error", {
          errorDetails:
            "There was an error while loading the exercises' information... try again later.",
        });
      }
    };

    loadData();
  }, [props.title]);

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update selected tab
    setFilteredExercises(exercises);
    setSelectedGoalID("");
    setSelectedMuscleGroupID("");
  };

  useEffect(() => {
    filterExercisesByMuscleGroup();
  }, [selectedMuscleGroupID]);

  useEffect(() => {
    filterExercisesByGoal();
  }, [selectedGoalID]);

  const handleSelectMuscleGroup = (event) => {
    setSelectedMuscleGroupID(event.target.value);
  };
  const handleSelectGoal = (event) => {
    setSelectedGoalID(event.target.value);
  };
  const filterExercisesByMuscleGroup = () => {
    const filteredArray =
      selectedMuscleGroupID == 0
        ? exercises
        : exercises.filter((exercise) =>
            exercise.hasMuscleGroup(selectedMuscleGroupID)
          );
    setFilteredExercises(filteredArray);
    setPagesCount(Math.ceil(filteredArray.length / 9));
    setPage(1);
  };
  const filterExercisesByGoal = () => {
    const filteredArray =
      selectedGoalID == 0
        ? exercises
        : exercises.filter((exercise) => exercise.hasGoal(selectedGoalID));

    setFilteredExercises(filteredArray);
    setPagesCount(Math.ceil(filteredArray.length / 9));
    setPage(1);
  };
  // Memoize the exercises grid
  const exercisesGrid = useMemo(() => {
    return (
      <Grid container spacing={3}>
        {filteredExercises.length > 0
          ? filteredExercises
              .slice(startIndex, endIndex)
              .map((exercise, index) => (
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
  }, [
    filteredExercises,
    startIndex,
    endIndex,
    selectedGoalID,
    selectedMuscleGroupID,
    loading,
  ]);
  // Pagination handlers
  const handlePaginationChange = async (event, value) => {
    setPage(value);
    let start = (value - 1) * 9;
    let end = start + 9;
    setStartIndex(start);
    setEndIndex(end);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Backdrop for loading */}
      <LoadingBackdrop loading={loading} />

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
      {loading ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(9)).map((_, index) => (
            <Grid
              key={index}
              size={{ xs: 2, sm: 4, md: 4 }}
              gap={2}
              spacing={5}
            >
              <Box display="flex" flexDirection="column" gap={1}>
                <Skeleton variant="rectangular" height={245} />
                <Skeleton variant="rectangular" height={20} width={250} />
                <Box display="flex" gap={1}>
                  <Skeleton variant="rectangular" height={15} width={50} />
                  <Skeleton variant="rectangular" height={15} width={50} />
                  <Skeleton variant="rectangular" height={15} width={50} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        exercisesGrid
      )}

      {/* Pagination Buttons */}
      <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
        <Pagination
          count={pagesCount}
          page={page}
          onChange={handlePaginationChange}
          color="primary"
        />
      </Box>
    </>
  );
});

Learn.propTypes = {
  title: PropTypes.string,
};

// Setting the display name for debugging
Learn.displayName = "Learn";
