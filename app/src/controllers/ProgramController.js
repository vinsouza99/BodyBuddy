import axios from "axios";
import { Program } from "../models/Program";
import { getRoutinesFromProgram } from "./RoutineController";

const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";
const TABLE = "programs";
const API_ROUTE = URL + TABLE;

const getAllPrograms = async () => {
  console.log(`Getting everything from ${API_ROUTE}...`);
  const response = await axios.get(`${API_ROUTE}`);
  return response.data;
};
const getProgram = async (id) => {
  console.log(`Getting from ${API_ROUTE}/${id}...`);
  try {
    const response = await axios.get(`${API_ROUTE}/${id}`);
    const data = await response.data;
    const program = new Program(
      data.id,
      data.created_at,
      data.completed_at,
      data.duration,
      data.user_id
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
    console.log(`${API_ROUTE}/?user_id=${user_id}`);
    const response = await axios.get(`${API_ROUTE}/?user_id=${user_id}`);
    const data = await response.data;
    const programs = data.data.map(
      (program) =>
        new Program(
          program.id,
          program.created_at,
          program.completed_at,
          program.duration,
          program.user_id
        )
    );
    programs.forEach(async (program) => {
      const programRoutines = await getRoutinesFromProgram(program.id);
      programRoutines.forEach((routine) => program.addRoutine(routine));
    });
    return programs;
  } catch (e) {
    console.log(e);
  }
};

export { getAllPrograms, getProgram, getAllUserPrograms };
