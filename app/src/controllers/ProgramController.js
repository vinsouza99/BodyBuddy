import axiosClient from '../utils/axiosClient';
import { Program } from "../models/Program";
import { getRoutinesFromProgram } from "./RoutineController";

// Note: API BASE URL is set in axisoClient.js with other required common settings.
// const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";
// const TABLE = "programs";
// const API_ROUTE = URL + TABLE;
const API_ROUTE = "programs";

const getAllPrograms = async () => {
  console.log(`Getting everything from ${API_ROUTE}...`);
  const response = await axiosClient.get(`${API_ROUTE}`);
  return response.data;
};
const getProgram = async (id) => {
  console.log(`Getting from ${API_ROUTE}/${id}...`);
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
    console.log(`${API_ROUTE}/user/${user_id}`);
    const response = await axiosClient.get(`${API_ROUTE}/user/${user_id}`);
    const data = await response.data;
    console.log(data.data.rows);
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
    programs.forEach(async (program) => {
      const programRoutines = await getRoutinesFromProgram(program.id);
      if (programRoutines)
        programRoutines.forEach((routine) => program.addRoutine(routine));
    });
    console.log(programs);
    return programs;
  } catch (e) {
    console.log(e);
  }
};

export { getAllPrograms, getProgram, getAllUserPrograms };
