import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useAuth } from "../AuthProvider.jsx";
import { getUser } from "../../controllers/UserController";
import { getGoal, getIntensity } from "../../controllers/LocalTablesController";

export const useGenerateProgramPrompt = ({ userPreferences } = {}) => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const fetchedUserInfo = await getUser(user);
        setUserInfo(fetchedUserInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, [user]);

  useEffect(() => {
    const generatePrompt = async () => {
      try {
        if (!userInfo) return;

        if (userPreferences && Object.keys(userPreferences).length > 0) {
          const goal = await getGoal(userPreferences.goal_id);
          const intensity = await getIntensity(userPreferences.intensity_id);
          userInfo.gender = userPreferences.gender;
          userInfo.settings.goal = goal.name;
          userInfo.settings.intensity = intensity.name;
          userInfo.schedule = userPreferences.schedule;
        }

        const formattedDate = format(new Date(), 'yyyy-MM-dd');
        const generatedPrompt = `
          You will now create a personalized fitness program for the user. The structure of a fitness program is as follows:
          - **Program**: Contains routines.
          - **Routine**: Each routine is a set of exercises.
          - **Exercise**: A specific movement that includes repetitions and sets.

          ### Database Schema
          The program should adhere to the following database schema:
          - **Program**
          - **Program_Routine** (Many to Many relationship between Program and Routine)
          - **Routine**
          - **Routine_Exercise** (Many to Many relationship between Routine and Exercise)
          - **Exercise** (Data is already prepared in the table)

          ### User Profile
          Please use the following details from the user's fitness questionnaire to create a workout plan:
          - Gender: ${userInfo?.gender}
          - Primary Fitness Goal: ${userInfo?.settings?.goal}
          - Preferred Exercise Intensity: ${userInfo?.settings?.intensity}
          - Available Workout Days: ${userInfo?.schedule?.join(', ')}

          ### Output Requirements
          Generate the output in the following JavaScript object format.
          Ensure each field adheres to the specified requirements, as shown below:

          \`\`\`
          {
            "program": {
              "id": "<uuid>",
              "duration": <number>,             // In milliseconds
              "name": "<string>",
              "description": "<string>"
              "goal_id": "<number>",            // Fixed value 1
            },
            "program_routine": [
              {
                "program_id": "<uuid>",         // **Primary Key**
                "routine_id": "<uuid}",         // **Primary Key**
                "scheduled_date": "<date>",
                "completed": "FALSE"            // This is fixed value
              },{},{}...                        // You can have multiple data if required
            ],
            "routine": [
              {
                "id": "<uuid>",
                "program_id": "<uuid>",
                "name": "<string>",
                "description": "<string>"
                "duration": <number>,           // In milliseconds
                "preset": "FALSE"               // This is fixed value
                ”estimated_calories”: <number>, // You can calculate this based on the exercises
                "completed": "FALSE"            // This is fixed value
              },{},{}...                        // You can have multiple routines if required
            ], 
            "routine_exercise": [
              {
                "routine_id": "<uuid>",
                "exercise_id": "<uuid>",
                "sets": <number>,
                "reps": <number>,
                "order": <number>,
                "rest_time": <number>           // In milliseconds
              }, {}, {}...                      // You can have multiple data if required
            ] 
          }
          \`\`\`

          ### Predefined Exercises
          Use only the following exercises to create the routines. Do not use any exercise IDs other than the ones provided below:
          - UUID: fb7180ab-f3e2-4a5d-b731-a2c0fc5de9fa (Exercise: Bodyweight Squat)
          - UUID: 0cc22f75-7d4d-4d50-9cdd-4ae3c731c517 (Exercise: Jumping jacks)
          - UUID: 7c12ed44-7dac-4b42-90c3-aa9a02dd251d (Exercise: Plank)
          - UUID: 25e807c9-1a7b-440b-ab02-17b1b99d1430 (Exercise: Sit ups)
          - UUID: ed999b28-ae50-4009-b29c-c7f6a28857c9 (Exercise: Close hands pushup)

          ### Additional Notes
          - **Today's Date**: ${formattedDate}.
          - **Routine Scheduling**: Schedule routines only on the days specified by the user as available for workouts (e.g., Monday, Wednesday, Friday). Do not assign routines on any other days, and ensure that no routines are scheduled for dates in the past.
          - **First Routine Schedule**: The first routine should be scheduled on ${formattedDate} for demo purposes.
          - **Program Duration**: The program should span 2 weeks from today's date.
          - **Return Format**: Exclude any backticks when you return the object.
          - **UUID format should be xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx, and it must be a valid UUID containing only hexadecimal characters (0-9 and a-f).**
          `;
        setPrompt(generatedPrompt);
      } catch (error) {
        console.error("Error loading user progress data:", error);
      }
    };
    generatePrompt();
  }, [userInfo]);

  return prompt;
};