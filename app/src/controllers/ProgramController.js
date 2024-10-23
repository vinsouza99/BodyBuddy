import axiosClient from "../utils/axiosClient";
import { Program } from "../models/Program";
import { getRoutinesFromProgram, createRoutine } from "./RoutineController";

const API_ROUTE = "programs";

const getProgram = async (id) => {
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
    const programRoutines = await getRoutinesFromProgram(program.id);
    programRoutines.forEach((routine) => program.addRoutine(routine));
    return program;
  } catch (e) {
    console.log(e);
  }
};
const getAllUserPrograms = async (user_id) => {
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
    for (const program of programs) {
      const programRoutines = await getRoutinesFromProgram(program.id);
      if (programRoutines) {
        programRoutines.forEach((routine) => program.addRoutine(routine));
      }
    }
    
    return programs;
  } catch (e) {
    console.log(e);
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
    //TODO call routine controller
    axiosClient.post(`${API_ROUTE}`, program);
    generatedProgramObj.routines.forEach(async (routine) => {
      await createRoutine(routine);
    });
  } catch (e) {
    console.log(e);
  }
};

export { getProgram, getAllUserPrograms, createProgram };
