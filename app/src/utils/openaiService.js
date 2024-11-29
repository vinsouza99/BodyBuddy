import { getExercisesThumbnails } from "../controllers/ExerciseController";
import axiosClient from "../utils/axiosClient";

const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";
const API_ROUTE = URL + "openai";

/**
 * Make request to the openai backend controller based on a text prompt
 * @param {String} prompt
 * @returns Content of the response (might be configured in order to return as a JSON)
 */
const getResponse = async (prompt) => {
  try {
    const response = await axiosClient.post(`${API_ROUTE}`, {
      prompt: prompt,
      //response template here?
    });
    return response.data.data.choices[0].message.content;
  } catch (e) {
    console.error(e);
  }
};
/**
 * Takes an object with all the custom information about the program,
 * turns it into a textual prompt, and make a request with it
 * @param {Object} promptObj - object that contains the customized settings for the program (defined in CreateProgram.jsx line 284)
 * @returns Content of the response (hopefully as a JSON following our template)
 */
const generateProgram = async (promptObj) => {
  try {
    const prompt = await getPromptText(promptObj);
    return await getResponse(prompt);
  } catch (e) {
    console.error(e);
  }
};
/**
 * Builds a string representing the prompt to be sent to ChatGPT based on an object
 * @param {*} promptObj
 * @returns
 */
const getPromptText = async (promptObj) => {
  const age = promptObj.age ? promptObj.age : 25;

  const gender = promptObj.gender ? promptObj.gender : "male"; //expected values:'female' or 'male'

  const goals = promptObj.primary_goals
    ? promptObj.primary_goals
    : "Losing weight"; //expected values:array of goal names

  const program_duration_days = 14; //14 days by default. Not sure if the user will ever have to set the duration manually. Makes more sense if the app sets the duration for them. Realistically though, the duration of a program should be longer in order to track substantial progress depending on their goals and weekly workout sessions...

  const workout_duration_minutes = promptObj.workout_duration_minutes
    ? promptObj.workout_duration_minutes
    : 10; //probably in the future it will be added as a field on the program creation form,but for now let's leave it with a default value of 10 minutes

  const desired_intensity = promptObj.desired_intensity
    ? promptObj.desired_intensity
    : "Quite intense";

  const week_days = promptObj.availability
    ? promptObj.availability
    : "Monday, Wednesday, Friday"; //expected values:array of weekdays names. "Monday, Wednesday, Friday" is just for testing

  const exercisesData = await getExercisesThumbnails(); //expected value: array of Exercise Objects
  const exercisesArray = exercisesData.map((exercise) => exercise.name);
  /*TODO: 
    write the prompt/template in such a way that ChatGPT responds with the primary key
    of the entities (like the id of the exercise instead of the exercise name,
    so that we can store more easily). Also, specify the units of time that each field
    should have (ex.: days for program duration, minutes for routine duration, milliseconds
    for rest time). In the future probably we will also ask it to assign scores to each
    routine, but that is to be confirmed with designers. Just makesure that this prompt
    generation logic is flexible
  */
  return `
    Generate a workout program for a ${age} year old ${gender}
    that is looking towards these goals: ${goals}. This program
    shouldn't take longer than ${program_duration_days} days and
    each workout should be at most ${workout_duration_minutes} 
    minutes long. Each workout should also have warming up and 
    stretching parts and be ${desired_intensity}. Distribute these 
    workouts between ${week_days}. All the exercises should be taken 
    from this list: ${exercisesArray.join(", ")}.  Not all workouts 
    should have all these exercises, though. Make the exercises vary 
    between workouts as efficiently as possible and make sure to add 
    resting time between sets.
    `;
};

export { generateProgram };
