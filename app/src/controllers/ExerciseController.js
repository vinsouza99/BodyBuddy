import axiosClient from "../utils/axiosClient";
import Exercise from "../models/Exercise";
import {
  getExerciseType,
  getGoal,
  getMuscleGroup,
} from "./LocalTablesController";

const API_ROUTE = "exercises";
const API_EXERCISE_TYPE_ROUTE = "types";
const API_EXERCISE_GOALS_ROUTE = "goals";
const API_EXERCISE_MUSCLE_GROUPS_ROUTE = "muscleGroups";

const getAllExercises = async () => {
  const response = await axiosClient.get(`${API_ROUTE}`);
  const exercises = await response.data.data.map(
    (exercise) =>
      new Exercise(
        exercise.id,
        undefined,
        exercise.name,
        exercise.description,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        exercise.demo_url,
        undefined
      )
  );
  return exercises;
};
const getExercise = async (id) => {
  try {
    const response = await axiosClient.get(`${API_ROUTE}/${id}`);
    const data = await response.data.data;
    const exercise = new Exercise(
      data.id,
      undefined,
      data.name,
      data.description,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      data.demo_url
    );
    const exerciseTypes = await getExerciseTypes(exercise.id);
    const exerciseGoals = await getExerciseGoals(exercise.id);
    const exerciseMuscleGroups = await getExerciseMuscleGroups(exercise.id);
    exercise.types = exerciseTypes;
    exercise.goals = exerciseGoals;
    exercise.muscleGroups = exerciseMuscleGroups;
    return exercise;
  } catch (e) {
    console.log(e);
  }
};
const getExerciseTypes = async (id) => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_EXERCISE_TYPE_ROUTE}/${id}`
    );
    const data = await response.data;
    const promises = [];
    data.forEach((exerciseType) =>
      promises.push(getExerciseType(exerciseType.type_id))
    );
    Promise.all(promises)
      .then((typeArray) => {
        return typeArray;
      })
      .catch((e) => {
        throw new Error(e);
      });
  } catch (e) {
    console.log(e);
  }
};
const getExerciseGoals = async (id) => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_EXERCISE_GOALS_ROUTE}/${id}`
    );
    const data = await response.data;
    const promises = [];
    data.forEach((exerciseGoal) =>
      promises.push(getGoal(exerciseGoal.goal_id))
    );
    Promise.all(promises)
      .then((goalsArray) => {
        return goalsArray;
      })
      .catch((e) => {
        throw new Error(e);
      });
  } catch (e) {
    console.log(e);
  }
};
const getExerciseMuscleGroups = async (id) => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_EXERCISE_MUSCLE_GROUPS_ROUTE}/${id}`
    );
    const data = await response.data;
    const promises = [];
    data.forEach((exerciseMuscleGroup) =>
      promises.push(getMuscleGroup(exerciseMuscleGroup.muscle_group_id))
    );
    Promise.all(promises)
      .then((muscleGroupsArray) => {
        return muscleGroupsArray;
      })
      .catch((e) => {
        throw new Error(e);
      });
  } catch (e) {
    console.log(e);
  }
};
export { getAllExercises, getExercise };
