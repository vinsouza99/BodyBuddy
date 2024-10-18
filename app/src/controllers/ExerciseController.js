import axiosClient from "../utils/axiosClient";
import { Exercise } from "../models/Exercise";

// Note: API BASE URL is set in axisoClient.js with other required common settings.
// const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";
// const TABLE = "exercises";
// const API_ROUTE = URL + TABLE;
const API_ROUTE = "exercises";

const getAllExercises = async () => {
  const response = await axiosClient.get(`${API_ROUTE}`);
  const exercises = await response.data.data.map(
    (exercise) =>
      new Exercise(
        exercise.id,
        exercise.name,
        exercise.description,
        exercise.demo_url,
        exercise.type
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
      data.name,
      data.description,
      data.demo_url,
      data.types
    );
    return exercise;
  } catch (e) {
    console.log(e);
  }
};

export { getAllExercises, getExercise };
