import axiosClient from "../utils/axiosClient";
import { Program } from "../models/Program";
import { getRoutinesFromProgram } from "./RoutineController";
import { getExercise } from "./ExerciseController";

const API_ROUTE = "programs";
const API_PROGRAM_ROUTINE_ROUTE = "routines";

const getProgram = async (
  id,
  getRoutines = true,
  getRoutineExercises = true
) => {
  try {
    const response = await axiosClient.get(`${API_ROUTE}/${id}`);
    const data = await response.data;
    const program = new Program(
      data.id,
      data.created_at,
      data.completed_at,
      data.duration,
      data.user_id,
      data.name,
      data.description
    );
    if (getRoutines) {
      const programRoutines = await getRoutinesFromProgram(
        program.id,
        getRoutineExercises
      );
      programRoutines.forEach((routine) => program.addRoutine(routine));
    }
    return program;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
const getAllUserPrograms = async (
  user_id,
  getRoutines = true,
  getRoutineExercises = true
) => {
  try {
    if (!user_id) throw new Error("user id is null");
    const response = await axiosClient.get(`${API_ROUTE}/user/${user_id}`);
    const data = await response.data;

    const programs = data.data.rows.map(
      (program) =>
        new Program(
          program.id,
          program.created_at,
          program.completed_at,
          program.duration,
          program.user_id,
          program.name,
          program.description
        )
    );
    if (getRoutines) {
      for (const program of programs) {
        const programRoutines = await getRoutinesFromProgram(
          program.id,
          getRoutineExercises
        );
        if (programRoutines) {
          programRoutines.forEach((routine) => program.addRoutine(routine));
        }
      }
    }

    return programs;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
const getUserCompletedPrograms = async (
  user_id,
  getRoutines = true,
  getRoutineExercises = true
) => {
  try {
    if (!user_id) throw new Error("user id is null");
    const response = await axiosClient.get(
      `${API_ROUTE}/user/${user_id}/completed`
    );
    if (response.status == 404) return [];

    const data = await response.data.data;

    const programs =
      data && data.length > 0
        ? data.map(
            (program) =>
              new Program(
                program.id,
                program.created_at,
                program.completed_at,
                program.duration,
                program.user_id,
                program.name,
                program.description,
                program.completed_at //do not remove, trust me (Vin)
              )
          )
        : [];
    if (getRoutines) {
      if (programs.length > 0) {
        for (const program of programs) {
          const programRoutines = await getRoutinesFromProgram(
            program.id,
            getRoutineExercises
          );
          if (programRoutines) {
            programRoutines.forEach((routine) => program.addRoutine(routine));
          }
        }
      }
    }

    return programs;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const createProgram = async (user_id, generatedProgramObj) => {
  try {
    if (!user_id) throw new Error("User ID is null");
    const program = {
      id: null, //hopefully supabase generates the ID and doesn't throw an error
      user_id: user_id,
      duration: generatedProgramObj.duration,
      name: generatedProgramObj.name,
      description: generatedProgramObj.description,
    };
    await axiosClient.post(`${API_ROUTE}`, program);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const createProgramRoutine = async (
  program_id,
  routine_id,
  scheduled_date,
  completed
) => {
  try {
    const programRoutine = {
      program_id: program_id,
      routine_id: routine_id,
      scheduled_date: scheduled_date,
      completed: completed,
    };
    return await axiosClient.post(
      `${API_ROUTE}/${API_PROGRAM_ROUTINE_ROUTE}`,
      programRoutine
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export {
  getProgram,
  getAllUserPrograms,
  getUserCompletedPrograms,
  createProgram,
  createProgramRoutine,
};
