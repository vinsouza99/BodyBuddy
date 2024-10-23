export const createProgram = {
  prompt: `
  Now you will create a personalized firness program for the user.
  A fitness program consists of a routine.
  And, a routine is a set of exercises.
  And, an exercise is a specific movement consisting of repetitions and sets.

  Database has the foolwoing tables:
  - Program
  - Program_Routine (Many to Many relationship between Program and Routine)
  - Routine
  - Routine_Exercise (Many to Many relationship between Routine and Exercise)
  - Exercise (Data is already prepared in the table)

  Please generate one program and relating routines for the user.
  Content need to be generated taking into account the following fitness user questionaire's answer.
  - Gender: Male
  - Primary Goal: Tone Up
  - How often do you exercise?: At least onece a week
  - How intense you want to exercise?: Little intense
  - When can you exercise, Monday, Wednesday, Sunday

  Your output should be a JavaScript object format for the above tables.
  Here is the object format you need to generate:
  {
    "program": {
      "id": "<uuid>",
      "duration": <number>, -- In milliseconds
      "name": "<string>",
      "description": "<string>"
      "goal_id": "<number>", -- Fixed value 1
    },
    "program_routine": [{
      "program_id": "<uuid>",
      "routine_id": "<uuid}",
      "scheduled_date": "<date>",
      "completed": "FALSE" -- This is fixed value
    },{},{}...], -- You can have multiple data if required
    "routine": [{
      "id": "<uuid>",
      "program_id": "<uuid>",
      "name": "<string>",
      "description": "<string>"
      "duration": <number>, -- In milliseconds
      "preset": "FALSE" -- This is fixed value
      ”estimated_calories”: <number>, -- You can calculate this based on the exercises
      "scheduled_date": "<date>", -- The first routine should be scheduled on the first available date
      "completed": "FALSE" -- This is fixed value
    },{},{}...], -- You can have multiple routines if required
    "routine_exercise": [{
      "routine_id": "<uuid>",
      "exercise_id": "<uuid>",
      "sets": <number>,
      "reps": <number>,
      "order": <number>,
      "rest_time": <number> -- In milliseconds
    }, {}, {}...] -- You can have multiple data if required
  }

  Here is the Exercise table data. You can use this data to generate the routine.

    INSERT INTO "public"."exercise" ("name", "description", "demo_url", "id") 
    VALUES
    ('Jumping jacks', ' A full-body cardio exercise where you jump while simultaneously spreading your legs and raising your arms overhead, then return to the starting position by bringing your legs together and lowering your arms', 'https://i.pinimg.com/originals/57/cc/e0/57cce0afa73a4b4c9c8c139d08aec588.gif', '0cc22f75-7d4d-4d50-9cdd-4ae3c731c517'),
    ('Standing quad stretch', ' A flexibility exercise where you stand on one leg, bend the opposite knee, and pull the foot toward your glutes to stretch the muscles in the front of your thigh.', 'https://hips.hearstapps.com/menshealth-uk/main/assets/s-quad.gif?resize=980:*', '13197db5-ccb1-42b3-ada5-015107f60836'), 
    ('Sit ups', 'A core exercise where you lie on your back with your knees bent, then engage your abdominal muscles to lift your torso up towards your knees before lowering back down, using only your body weight for resistance.', 'https://miro.medium.com/v2/resize:fit:920/1*ku_BIdcRBd9lzUQA6PgqOw.gif', '25e807c9-1a7b-440b-ab02-17b1b99d1430'),
    ('Close hands pushup', 'A full-body exercise where you lower and raise your body by bending and straightening your arms while keeping your body straight, using your chest, shoulders, and triceps for resistance.', 'https://i.pinimg.com/originals/4e/2a/73/4e2a73e23b21e33c3cf76567002a98f6.gif', 'ed999b28-ae50-4009-b29c-c7f6a28857c9'),
    ('Bodyweight Squat', 'A lower-body exercise where you bend your knees and hips to lower your body as if sitting in a chair, then rise back up, using only your body weight for resistance. Bodyweight squats are a great way to strengthen your legs and improve mobility!', 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/bodyweightsquat-1457041691.gif', 'fb7180ab-f3e2-4a5d-b731-a2c0fc5de9fa');

  Notes:
  - Please think of fancy names and descriptions for the program to motivate the user.
  - Don't include backticks when you return the object.
  `
};