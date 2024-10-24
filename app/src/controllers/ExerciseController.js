import axiosClient from "../utils/axiosClient";
import Exercise from "../models/Exercise";

const API_ROUTE = "exercises";

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
      data.demo_url,
      undefined
    );
    return exercise;
  } catch (e) {
    console.log(e);
  }
};

export { getAllExercises, getExercise };
