import { getAllExercises } from "../controllers/ExerciseController";
import axiosClient from "../utils/axiosClient";

const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";
const API_ROUTE = URL + "openai";

const getResponse = async (prompt) => {
  try {
    const response = await axiosClient.post(`${API_ROUTE}`, {
      prompt: prompt,
    });
    return response.data.data.choices[0].message.content;
  } catch (e) {
    console.log(e);
  }
};

const generateProgram = async (promptObj) => {
  try {
    const prompt = await getPromptText(promptObj);
    return await getResponse(prompt);
  } catch (e) {
    console.log(e);
  }
};

const getPromptText = async (obj) => {
  const age = obj.age ? obj.age : 25;
  const gender = obj.gender ? obj.gender : "";
  const goals = obj.goals ? obj.goals : "Losing weight";
  const program_duration_days = obj.program_duration
    ? obj.program_duration
    : 14;
  const workout_duration_minutes = obj.workout_duration_minutes
    ? obj.workout_duration_minutes
    : 10;
  const week_days = obj.week_days ? obj.week_days : "Monday, Wednesday, Friday";
  const exercises = await getAllExercises();
  return `
    Generate a workout program for a ${age} year old ${gender}
    that is looking towards these goals: ${goals}. This program
    shouldn't take longer than ${program_duration_days} days and each
    workout should be at most ${workout_duration_minutes} minutes long.
    Each workout should also have warming up and stretching parts
    Distribute these workouts between ${week_days}. All the exercises
    should be taken from this list: ${exercises}. Not all workouts should
    have all these exercises. Make the exercises vary between workouts as 
    efficiently as possible and make sure to add resting time between sets.
    `;
};

export { generateProgram, getResponse };
