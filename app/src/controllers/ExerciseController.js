import axiosClient from "../utils/axiosClient";
import Exercise from "../models/Exercise";
import {
  getExerciseType,
  getGoal,
  getMuscleGroup,
} from "./LocalTablesController";
import ExerciseType from "../models/ExerciseType";
import Goal from "../models/Goal";
import MuscleGroup from "../models/MuscleGroup";

const API_ROUTE = "exercises";
const API_EXERCISE_TYPE_ROUTE = "types";
const API_EXERCISE_GOALS_ROUTE = "goals";
const API_EXERCISE_MUSCLE_GROUPS_ROUTE = "muscleGroups";

const getAllExercises = async (allInfo = true) => {
  const response = await axiosClient.get(`${API_ROUTE}`);
  const exercises = await response.data.data.map((item) => {
    const exercise = new Exercise();
    exercise.id = item.id;
    exercise.name = item.name;
    exercise.description = item.description;
    exercise.demo_url = item.demo_url;
    exercise.video_tutorial_url = item.video_tutorial_url;
    exercise.types = [];
    exercise.goals = [];
    exercise.muscleGroups = [];
    return exercise;
  });
  if (allInfo) {
    for (let exercise of exercises) {
      const exerciseTypes = await getExerciseTypes(exercise.id);
      const exerciseGoals = await getExerciseGoals(exercise.id, false);
      const exerciseMuscleGroups = await getExerciseMuscleGroups(
        exercise.id,
        false
      );
      exercise.types = exerciseTypes;
      exercise.goals = exerciseGoals;
      exercise.muscleGroups = exerciseMuscleGroups;
    }
  }
  return exercises;
};
const getExercise = async (id, allInfo = true) => {
  try {
    const response = await axiosClient.get(`${API_ROUTE}/${id}`);
    const data = await response.data.data;
    const exercise = new Exercise();
    exercise.id = data.id;
    exercise.name = data.name;
    exercise.description = data.description;
    exercise.demo_url = data.demo_url;
    exercise.types = await getExerciseTypes(exercise.id, allInfo);
    exercise.goals = await getExerciseGoals(exercise.id, allInfo);
    exercise.muscleGroups = await getExerciseMuscleGroups(exercise.id, allInfo);
    exercise.video_tutorial_url = data.video_tutorial_url;
    exercise.execution_steps = data.execution_steps;
    return exercise;
  } catch (e) {
    console.error(e);
  }
};
const getExerciseTypes = async (id, allInfo = true) => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_EXERCISE_TYPE_ROUTE}/${id}`
    );
    const data = await response.data.data;
    const typeArray = [];

    for (let exerciseType of data) {
      const type = allInfo
        ? await getExerciseType(exerciseType.type_id)
        : new ExerciseType(exerciseType.type_id);
      typeArray.push(type);
    }
    return typeArray;
  } catch (e) {
    console.error(e);
  }
};
const getExerciseGoals = async (id, allInfo = true) => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_EXERCISE_GOALS_ROUTE}/${id}`
    );
    const data = await response.data.data;
    const goalsArray = [];

    for (let exerciseGoal of data) {
      const goal = allInfo
        ? await getGoal(exerciseGoal.goal_id)
        : new Goal(exerciseGoal.goal_id);
      goalsArray.push(goal);
    }
    return goalsArray;
  } catch (e) {
    console.error(e);
  }
};
const getExerciseMuscleGroups = async (id, allInfo = true) => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_EXERCISE_MUSCLE_GROUPS_ROUTE}/${id}`
    );
    const data = await response.data.data;
    const muscleGroupsArray = [];

    for (let item of data) {
      const muscleGroup = allInfo
        ? await getMuscleGroup(item.muscle_group_id)
        : new MuscleGroup(item.muscle_group_id);
      muscleGroupsArray.push(muscleGroup);
    }
    return muscleGroupsArray;
  } catch (e) {
    console.error(e);
  }
};
export {
  getAllExercises,
  getExercise,
  getExerciseTypes,
  getExerciseGoals,
  getExerciseMuscleGroups,
};
