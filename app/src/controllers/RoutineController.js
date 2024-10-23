import axiosClient from "../utils/axiosClient";
import Routine from "../models/Routine";
import Exercise from "../models/Exercise";
import { getExercise } from "./ExerciseController";

const API_ROUTE = "routines";
const API_PROGRAM_ROUTINE_ROUTE = "program";
const API_ROUTINE_EXERCISE_ROUTE = "exercises";

const getRoutinesFromProgram = async (program_id) => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_PROGRAM_ROUTINE_ROUTE}/${program_id}`
    );
    const data = await response.data.data;

    const routines = await data.map((routine) => {
      return new Routine(
        routine.id,
        routine.duration,
        routine.program_id,
        routine.name,
        routine.description,
        routine.estimated_calories,
        routine.scheduled_date,
        routine.completed
      );
    });
    if (routines && routines.length > 0) {
      for (const routine of routines) {
        if (routine) {
          const routineExercises = await getExercisesFromRoutine(routine.id);
          routineExercises.forEach((exercise) => routine.addExercise(exercise));
        }
      }
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
    const routines = data.data.rows.map(
      (routine) =>
        new Routine(
          routine.id,
          routine.duration,
          routine.program_id,
          routine.name,
          routine.description,
          routine.estimated_calories,
          routine.scheduled_date,
          routine.completed,
          []
        )
    );

    if (routines && routines.length > 0) {
      for (const routine of routines) {
        const routineExercises = await getExercisesFromRoutine(routine.id);
        routineExercises.forEach((exercise) => routine.addExercise(exercise));
      }
    }
    return routines;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 
 * @param {Obj} routineObj - Expected properties of this object:
 *    id,
      program_id,
      name,
      description,
      duration,
      preset,
      estimated_calories,
      scheduled_date,
      completed,
 * @returns 
 */
const createRoutine = async (routineObj) => {
  try {
    const routine = new Routine(
      routineObj.id,
      routineObj.duration,
      routineObj.program_id,
      routineObj.name,
      routineObj.description,
      routineObj.estimated_calories,
      routineObj.scheduled_date,
      routineObj.completed
    );
    await axiosClient.post(`${API_ROUTE}`, routine);
    // if (response.status == 201) {
    //   for (const exercise of routineObj.exercises) {
    //     const response = await createRoutineExercise(exercise);

    //     if (response.status === 201) {
    //       routine.exercises.push(response.data);
    //     }
    //   }
    // }
    return routine;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Returns the an array of Exercise objects that has the info from RoutineExercise and Exercise tables combined
 * @param {UUID} routine_id
 */
const getExercisesFromRoutine = async (routine_id) => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_ROUTINE_EXERCISE_ROUTE}/${routine_id}`
    );
    // Exercise data relating to the specific routine
    const data = await response.data.data;

    const routineExercises = await data.map(
      (exercise) =>
        new Exercise(
          exercise.exercise_id,
          exercise.routine_id,
          exercise.name, //name unknown yet
          exercise.description, //description unknown yet
          exercise.order,
          exercise.sets,
          exercise.reps,
          exercise.duration,
          exercise.rest_time,
          exercise.demo_url, // demo_url unknown yet
          exercise.types // types unknown yet
        )
    );

    // const promises = [];
    // await routineExercises.forEach(async (exercise) => {
    //   promises.push(getExercise(exercise.exercise_id));
    // });
    // //
    // // "forEach does not properly wait for asynchronous operations."
    // Promise.all(promises).then(async (response) => {
    //   //TODO get the remainig info from the response (name, descirption, demo_url) and add it to the exercise objects in routineExercises based on their ids
    //   return routineExercises;
    // });
    const exerciseDetails = await Promise.all(
      routineExercises.map(async (exercise) => {
        const detailedExercise = await getExercise(exercise.id);
        return {
          ...exercise,
          name: detailedExercise.name,
          description: detailedExercise.description,
          demo_url: detailedExercise.demo_url,
        };
      })
    );
    return exerciseDetails;
  } catch (e) {
    console.log(e);
  }
};

const createRoutineExercise = async (exerciseObj) => {
  try {
    const routineExercise = {
      exercise_id: exerciseObj.exercise_id,
      routine_id: exerciseObj.routine_id,
      order: exerciseObj.order,
      sets: exerciseObj.sets,
      reps: exerciseObj.reps,
      duration: exerciseObj.duration,
      rest_time: exerciseObj.restPeriod,
    };
    return await axiosClient.post(
      `${API_ROUTE}/${API_ROUTINE_EXERCISE_ROUTE}`,
      routineExercise
    );
  } catch (e) {
    console.log(e);
  }
};
export {
  getRoutinesFromProgram,
  getAllPresetRoutines,
  createRoutine,
  createRoutineExercise,
  getExercisesFromRoutine,
};
