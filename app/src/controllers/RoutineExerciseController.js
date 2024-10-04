import axios from "axios";
import { RoutineExercise } from "../models/RoutineExercise";
import { getExercise } from "./ExerciseController";

const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";
const TABLE = "routineExercises";
const API_ROUTE = URL + TABLE;

const getExercisesFromRoutine = async (routine_id) => {
  try {
    const response = await axios.get(`${API_ROUTE}/routine/${routine_id}`);
    const data = await response.data;
    const routineExercises = await data.data.map(
      (exercise) =>
        new RoutineExercise(
          exercise.exercise_id,
          routine_id,
          exercise.order,
          exercise.sets,
          exercise.reps,
          exercise.duration,
          exercise.restPeriod
        )
    );
    await routineExercises.forEach(async (exercise) => {
      const ex = await getExercise(exercise.exercise_id);
      exercise.name = ex.name;
      exercise.demo_url = ex.demo_url;
      exercise.description = ex.description;
      exercise.types = ex.types;
    });
    return routineExercises;
  } catch (e) {
    console.log(e);
  }
};

export { getExercisesFromRoutine };