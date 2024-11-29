import axiosClient from "../utils/axiosClient";
import { createProgramRoutine } from "../controllers/ProgramController";
import { createRoutineExercise } from "../controllers/RoutineController";

export const generatePersonalizedProgram = async (userId, prompt) => {
  if (!prompt) return;

  try {
    // OpenAI will generate the program data
    const response_openai = await axiosClient.post(`openai/`, {
      prompt: prompt,
    });
    if (Number(response_openai.status) !== 200) {
      throw new Error("Failed to get OpenAI response");
    }
    const parsedContent = JSON.parse(
      response_openai.data.data.choices[0].message.content
    );
    // Insert program data into the database
    const response_program = await axiosClient.post("programs/", {
      ...parsedContent.program,
      user_id: userId,
    });
    if (Number(response_program.status) !== 201) {
      throw new Error("Failed to insert program info");
    }

    // Insert routine data into the database
    for (const routine_item of parsedContent.routine) {
      const response_routine = await axiosClient.post(
        "routines/",
        routine_item
      );
      if (Number(response_routine.status) !== 201) {
        throw new Error("Failed to insert routine info");
      }
    }
    // Insert program_routine data into the database
    await Promise.all(
      parsedContent.program_routine.map(async (program_routine_item) => {
        const response_program_routine = await createProgramRoutine(
          program_routine_item.program_id,
          program_routine_item.routine_id,
          program_routine_item.scheduled_date,
          program_routine_item.completed
        );
        if (
          response_program_routine.status !== 201 &&
          response_program_routine.status !== 200
        ) {
          throw new Error("Failed to insert program_routine info");
        }
      })
    );
    // Insert routine_exercise data into the database
    await Promise.all(
      parsedContent.routine_exercise.map(async (routine_exercise_item) => {
        const response_routine_exercise = await createRoutineExercise({
          exercise_id: routine_exercise_item.exercise_id,
          routine_id: routine_exercise_item.routine_id,
          order: routine_exercise_item.order,
          sets: routine_exercise_item.sets,
          reps: routine_exercise_item.reps,
          duration: 0,
          rest_time: routine_exercise_item.rest_time,
        });
        if (
          response_routine_exercise.status !== 201 &&
          response_routine_exercise.status !== 200
        ) {
          throw new Error("Failed to insert routine_exercise info");
        }
      })
    );
  } catch (error) {
    console.error("Error generating personalized program:", error);
  }
};
