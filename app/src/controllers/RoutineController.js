import axiosClient from "../utils/axiosClient";
import Routine from "../models/Routine";
import { getExercisesFromRoutine } from "./RoutineExerciseController";

// Note: API BASE URL is set in axisoClient.js with other required common settings.
// const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";
// const TABLE = "routines";
// const API_ROUTE = URL + TABLE;
const API_ROUTE = "routines";

const getRoutinesFromProgram = async (program_id) => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/program/${program_id}`
    );
    const data = await response.data;
    const routines = await data.data.rows.map((routine) => {
      new Routine(
        routine.id,
        routine.created_at,
        routine.completed_at,
        routine.duration,
        routine.program_id,
        routine.name,
        routine.description
      );
    });
    if (routines && routines.length > 0) {
      routines.forEach(async (routine) => {
        if (routine) {
          const routineExercises = await getExercisesFromRoutine(routine.id);
          routineExercises.forEach((exercise) => routine.addExercise(exercise));
        }
      });
    }
    return routines;
  } catch (e) {
    console.log(e);
  }
};

const getAllPresetRoutines = async () => {
  try {
    const response = await axiosClient.get(`${API_ROUTE}/presets`);
    const data = await response.data;
    console.log(data);
    const routines = data.data.rows.map(
      (routine) =>
        new Routine(
          routine.id,
          routine.created_at,
          routine.completed_at,
          routine.duration,
          routine.program_id,
          routine.name,
          routine.description
        )
    );
    if (routines && routines.length > 0)
      routines.forEach(async (routine) => {
        const routineExercises = await getExercisesFromRoutine(routine.id);
        routineExercises.forEach((exercise) => routine.addExercise(exercise));
      });
    return routines;
  } catch (e) {
    console.log(e);
  }
};

const createRoutine = async (routineObj) => {
  try {
    const routine = new Routine(
      routineObj.id,
      routineObj.created_at,
      routineObj.completed_at,
      routineObj.duration,
      routineObj.program_id,
      routineObj.name,
      routineObj.description
    );
    let response = await axiosClient.post(`${API_ROUTE}`, routine);
    if (response.status() == 201) {
      routineObj.exercises.forEach(async (exercise) => {
        response = await createRoutineExercise(exercise);
        if (response.status() == 201) {
          routine.exercises.push(response.data);
        }
      });
    }
    return routine;
  } catch (e) {
    console.log(e);
  }
};

export { getRoutinesFromProgram, getAllPresetRoutines, createRoutine };
