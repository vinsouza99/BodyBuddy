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
          Use the following exercises to create the routines:

          INSERT INTO "public"."exercise" ("name", "description", "demo_url", "id") 
          VALUES
          ('Jumping jacks', ' A full-body cardio exercise where you jump while simultaneously spreading your legs and raising your arms overhead, then return to the starting position by bringing your legs together and lowering your arms', 'https://i.pinimg.com/originals/57/cc/e0/57cce0afa73a4b4c9c8c139d08aec588.gif', '0cc22f75-7d4d-4d50-9cdd-4ae3c731c517'),
          ('Standing quad stretch', ' A flexibility exercise where you stand on one leg, bend the opposite knee, and pull the foot toward your glutes to stretch the muscles in the front of your thigh.', 'https://hips.hearstapps.com/menshealth-uk/main/assets/s-quad.gif?resize=980:*', '13197db5-ccb1-42b3-ada5-015107f60836'), 
          ('Sit ups', 'A core exercise where you lie on your back with your knees bent, then engage your abdominal muscles to lift your torso up towards your knees before lowering back down, using only your body weight for resistance.', 'https://miro.medium.com/v2/resize:fit:920/1*ku_BIdcRBd9lzUQA6PgqOw.gif', '25e807c9-1a7b-440b-ab02-17b1b99d1430'),
          ('Close hands pushup', 'A full-body exercise where you lower and raise your body by bending and straightening your arms while keeping your body straight, using your chest, shoulders, and triceps for resistance.', 'https://i.pinimg.com/originals/4e/2a/73/4e2a73e23b21e33c3cf76567002a98f6.gif', 'ed999b28-ae50-4009-b29c-c7f6a28857c9'),
          ('Bodyweight Squat', 'A lower-body exercise where you bend your knees and hips to lower your body as if sitting in a chair, then rise back up, using only your body weight for resistance. Bodyweight squats are a great way to strengthen your legs and improve mobility!', 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/bodyweightsquat-1457041691.gif', 'fb7180ab-f3e2-4a5d-b731-a2c0fc5de9fa');

          ### Additional Notes
          - **Today's Date**: ${formattedDate}.
          - **Routine Scheduling**: Schedule routines only on the days specified by the user as available for workouts (e.g., Monday, Wednesday, Friday). Do not assign routines on any other days, and ensure that no routines are scheduled for dates in the past.
          - **Program Duration**: The program should span 3 weeks from today's date.
          - **Return Format**: Exclude any backticks when you return the object.
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