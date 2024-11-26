import { v4 as uuidv4 } from 'uuid';
import { format, addDays } from 'date-fns';
import { toZonedTime } from 'date-fns-tz'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateDemoData = async () => {
  const uuidMap = {};
  const timeZone = 'America/Vancouver';

  const now = new Date();
  let scheduleDate = toZonedTime(now, timeZone);

  // Sleep 5 seconds
  await sleep(5000);

  const generateNewUUID = (oldUUID) => {
    if (!uuidMap[oldUUID]) {
      uuidMap[oldUUID] = uuidv4();
    }
    return uuidMap[oldUUID];
  };

  data.program.id = generateNewUUID(data.program.id);

  data.program_routine = data.program_routine.map((pr) => ({
    ...pr,
    program_id: generateNewUUID(pr.program_id),
    routine_id: generateNewUUID(pr.routine_id),
  }));
  data.program_routine = data.program_routine.map((routine) => {
    const updatedRoutine = { ...routine };
    updatedRoutine.scheduled_date = format(scheduleDate, 'yyyy-MM-dd');
    scheduleDate = addDays(scheduleDate, 2);

    return updatedRoutine;
  });

  data.routine = data.routine.map((r) => ({
    ...r,
    program_id: generateNewUUID(r.program_id),
    id: generateNewUUID(r.id),
  }));

  data.routine_exercise = data.routine_exercise.map((re) => ({
    ...re,
    routine_id: generateNewUUID(re.routine_id),
  }));

  return data;
}

const data = {
    "program": {
        "id": "e5194e3a-62b2-4047-9af2-9bB20390c434",
        "duration": 1209600000,
        "name": "Muscle Building Program",
        "description": "A two-week muscle building program focusing on low-intensity exercises.",
        "goal_id": "1"
    },
    "program_routine": [
        {
            "program_id": "e5194e3a-62b2-4047-9af2-9bB20390c434",
            "routine_id": "33b15c28-b1f7-490c-bb38-95a3d21bdc4a",
            "scheduled_date": "2024-11-18",
            "completed": "FALSE"
        },
        {
            "program_id": "e5194e3a-62b2-4047-9af2-9bB20390c434",
            "routine_id": "5ef70e7d-27e6-418b-a5c9-4ed3c5c7f5ec",
            "scheduled_date": "2024-11-20",
            "completed": "FALSE"
        },
        {
            "program_id": "e5194e3a-62b2-4047-9af2-9bB20390c434",
            "routine_id": "4c8036f0-9f15-4fb6-962f-785cae7f6bc8",
            "scheduled_date": "2024-11-22",
            "completed": "FALSE"
        },
        {
            "program_id": "e5194e3a-62b2-4047-9af2-9bB20390c434",
            "routine_id": "3ecadf66-2da0-419f-ae7c-f202f533c9f1",
            "scheduled_date": "2024-11-24",
            "completed": "FALSE"
        },
        {
            "program_id": "e5194e3a-62b2-4047-9af2-9bB20390c434",
            "routine_id": "8d4d56d0-f779-41c4-8df2-bbc73cfe25aa",
            "scheduled_date": "2024-11-27",
            "completed": "FALSE"
        },
        {
            "program_id": "e5194e3a-62b2-4047-9af2-9bB20390c434",
            "routine_id": "ff157c64-816c-4f29-8e4a-222f039f126d",
            "scheduled_date": "2024-11-29",
            "completed": "FALSE"
        },
        {
            "program_id": "e5194e3a-62b2-4047-9af2-9bB20390c434",
            "routine_id": "8b9e5909-45be-4333-b854-c42ede9cb5f8",
            "scheduled_date": "2024-11-30",
            "completed": "FALSE"
        }
    ],
    "routine": [
        {
            "id": "33b15c28-b1f7-490c-bb38-95a3d21bdc4a",
            "program_id": "e5194e3a-62b2-4047-9af2-9bB20390c434",
            "name": "Strength Foundation",
            "description": "Focus on bodyweight exercises to enhance muscle strength.",
            "duration": 3600000,
            "preset": "FALSE",
            "estimated_calories": 200,
            "completed": "FALSE"
        },
        {
            "id": "5ef70e7d-27e6-418b-a5c9-4ed3c5c7f5ec",
            "program_id": "e5194e3a-62b2-4047-9af2-9bB20390c434",
            "name": "Core Stability",
            "description": "Combining core stabilization and endurance workouts.",
            "duration": 3600000,
            "preset": "FALSE",
            "estimated_calories": 220,
            "completed": "FALSE"
        },
        {
            "id": "4c8036f0-9f15-4fb6-962f-785cae7f6bc8",
            "program_id": "e5194e3a-62b2-4047-9af2-9bB20390c434",
            "name": "Compound Power",
            "description": "Focus on strength through compound movements.",
            "duration": 3600000,
            "preset": "FALSE",
            "estimated_calories": 250,
            "completed": "FALSE"
        },
        {
            "id": "3ecadf66-2da0-419f-ae7c-f202f533c9f1",
            "program_id": "e5194e3a-62b2-4047-9af2-9bB20390c434",
            "name": "Variety Builder",
            "description": "Continues muscle building with increased exercise variety.",
            "duration": 3600000,
            "preset": "FALSE",
            "estimated_calories": 230,
            "completed": "FALSE"
        },
        {
            "id": "8d4d56d0-f779-41c4-8df2-bbc73cfe25aa",
            "program_id": "e5194e3a-62b2-4047-9af2-9bB20390c434",
            "name": "Challenge Progression",
            "description": "Integrates more challenging variations of foundational exercises.",
            "duration": 3600000,
            "preset": "FALSE",
            "estimated_calories": 240,
            "completed": "FALSE"
        },
        {
            "id": "ff157c64-816c-4f29-8e4a-222f039f126d",
            "program_id": "e5194e3a-62b2-4047-9af2-9bB20390c434",
            "name": "Endurance Peak",
            "description": "Final routine focusing on endurance and strength.",
            "duration": 3600000,
            "preset": "FALSE",
            "estimated_calories": 260,
            "completed": "FALSE"
        },
        {
            "id": "8b9e5909-45be-4333-b854-c42ede9cb5f8",
            "program_id": "e5194e3a-62b2-4047-9af2-9bB20390c434",
            "name": "Progress Check",
            "description": "Review and test progress with a mixed workout.",
            "duration": 3600000,
            "preset": "FALSE",
            "estimated_calories": 270,
            "completed": "FALSE"
        }
    ],
    "routine_exercise": [
        {
            "routine_id": "33b15c28-b1f7-490c-bb38-95a3d21bdc4a",
            "exercise_id": "fb7180ab-f3e2-4a5d-b731-a2c0fc5de9fa",
            "sets": 3,
            "reps": 10,
            "order": 1,
            "rest_time": 600000
        },
        {
            "routine_id": "33b15c28-b1f7-490c-bb38-95a3d21bdc4a",
            "exercise_id": "0cc22f75-7d4d-4d50-9cdd-4ae3c731c517",
            "sets": 3,
            "reps": 15,
            "order": 2,
            "rest_time": 600000
        },
        {
            "routine_id": "5ef70e7d-27e6-418b-a5c9-4ed3c5c7f5ec",
            "exercise_id": "7c12ed44-7dac-4b42-90c3-aa9a02dd251d",
            "sets": 3,
            "reps": 30,
            "order": 1,
            "rest_time": 600000
        },
        {
            "routine_id": "5ef70e7d-27e6-418b-a5c9-4ed3c5c7f5ec",
            "exercise_id": "fb7180ab-f3e2-4a5d-b731-a2c0fc5de9fa",
            "sets": 3,
            "reps": 10,
            "order": 2,
            "rest_time": 600000
        },
        {
            "routine_id": "4c8036f0-9f15-4fb6-962f-785cae7f6bc8",
            "exercise_id": "25e807c9-1a7b-440b-ab02-17b1b99d1430",
            "sets": 3,
            "reps": 12,
            "order": 1,
            "rest_time": 600000
        },
        {
            "routine_id": "4c8036f0-9f15-4fb6-962f-785cae7f6bc8",
            "exercise_id": "ed999b28-ae50-4009-b29c-c7f6a28857c9",
            "sets": 3,
            "reps": 8,
            "order": 2,
            "rest_time": 600000
        },
        {
            "routine_id": "3ecadf66-2da0-419f-ae7c-f202f533c9f1",
            "exercise_id": "fb7180ab-f3e2-4a5d-b731-a2c0fc5de9fa",
            "sets": 3,
            "reps": 10,
            "order": 1,
            "rest_time": 600000
        },
        {
            "routine_id": "3ecadf66-2da0-419f-ae7c-f202f533c9f1",
            "exercise_id": "7c12ed44-7dac-4b42-90c3-aa9a02dd251d",
            "sets": 3,
            "reps": 30,
            "order": 2,
            "rest_time": 600000
        },
        {
            "routine_id": "8d4d56d0-f779-41c4-8df2-bbc73cfe25aa",
            "exercise_id": "25e807c9-1a7b-440b-ab02-17b1b99d1430",
            "sets": 3,
            "reps": 15,
            "order": 1,
            "rest_time": 600000
        },
        {
            "routine_id": "8d4d56d0-f779-41c4-8df2-bbc73cfe25aa",
            "exercise_id": "ed999b28-ae50-4009-b29c-c7f6a28857c9",
            "sets": 3,
            "reps": 10,
            "order": 2,
            "rest_time": 600000
        },
        {
            "routine_id": "ff157c64-816c-4f29-8e4a-222f039f126d",
            "exercise_id": "fb7180ab-f3e2-4a5d-b731-a2c0fc5de9fa",
            "sets": 3,
            "reps": 12,
            "order": 1,
            "rest_time": 600000
        },
        {
            "routine_id": "ff157c64-816c-4f29-8e4a-222f039f126d",
            "exercise_id": "0cc22f75-7d4d-4d50-9cdd-4ae3c731c517",
            "sets": 3,
            "reps": 20,
            "order": 2,
            "rest_time": 600000
        },
        {
            "routine_id": "8b9e5909-45be-4333-b854-c42ede9cb5f8",
            "exercise_id": "7c12ed44-7dac-4b42-90c3-aa9a02dd251d",
            "sets": 3,
            "reps": 40,
            "order": 1,
            "rest_time": 600000
        },
        {
            "routine_id": "8b9e5909-45be-4333-b854-c42ede9cb5f8",
            "exercise_id": "25e807c9-1a7b-440b-ab02-17b1b99d1430",
            "sets": 3,
            "reps": 20,
            "order": 2,
            "rest_time": 600000
        }
    ]
  }

  export default generateDemoData;