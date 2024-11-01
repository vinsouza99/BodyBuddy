// Reat and Material-UI
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Backdrop,
  CircularProgress,
  Grid2,
  useMediaQuery,
} from "@mui/material";
// Gadgets Components
import { GadgetUserProfile } from "../components/GadgetUserProfile.jsx";
import { GadgetStreaks } from "../components/GadgetStreaks.jsx";
import { GadgetFavourite } from "../components/GadgetFavourite";
import { GadgetAchievement } from "../components/GadgetAchievement";
import { GadgetHistory } from "../components/GadgetHistory";
// Common Components
import { useAuth } from "../utils/AuthProvider.jsx";
import { setPageTitle } from "../utils/utils";
import {
  getUser,
  getUserAccumulatedStats,
} from "../controllers/UserController";
import { getAllExercises } from "../controllers/ExerciseController";
import { generatePersonalizedProgram } from "../utils/generatePersonalizedProgram";
// import { createProgramRoutine } from "../controllers/ProgramController";
// import { createRoutineExercise } from "../controllers/RoutineController";
import axiosClient from "../utils/axiosClient";
import theme from "../theme";
// Prompts
import { useGenerateProgramPrompt } from "../utils/prompt/GenerateProgramPrompt";

export const Dashboard = (props) => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [userAccumulatedStats, setUserAccumulatedStats] = useState(null);
  const [exerciseInfo, setExerciseInfo] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  const [userAccumulatedStatsLoaded, setUserAccumulatedStatsLoaded] = useState(false);
  const [exerciseInfoLoaded, setExerciseInfoLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userPreferences = location.state || {};
  const prompt = useGenerateProgramPrompt({ userPreferences });

  // Remove hash from URL after Google OAuth redirect
  useEffect(() => {
    if (window.location.href.includes("#")) {
      navigate(window.location.pathname, { replace: true });
    }
  }, [navigate]);

  // Initialization
  useEffect(() => {
    setPageTitle(props.title);

    const loadUserdata = async () => {
      try {
        const userInfo = await getUser(user);
        setUserInfo(userInfo);
        setUserInfoLoaded(true);
        console.log("UserInfo loaded:", userInfo);

        const userAccumulatedStats = await getUserAccumulatedStats(user.id);
        setUserAccumulatedStats(userAccumulatedStats);
        setUserAccumulatedStatsLoaded(true);
      } catch (error) {
        console.error("Error loading user progress data:", error);
      }
    };
    loadUserdata();

    const loadExerciseData = async () => {
      const response = await getAllExercises();
      setExerciseInfo(response);
      setExerciseInfoLoaded(true);
    };
    loadExerciseData();
  }, []);

  useEffect(() => {
    if (userInfoLoaded && userAccumulatedStatsLoaded && exerciseInfoLoaded) {
      setLoading(false);
    }
  }, [userInfoLoaded, userAccumulatedStatsLoaded, exerciseInfoLoaded]);

  // Generated personalized program for the user (IF THE USER DON'T HAVE ONE)
  useEffect(() => {
    // Check if the user has an acive program
    const fetchPrograms = async () => {
      try {
        const response = await axiosClient.get(`programs/user/${user.id}`);
        if (Number(response.status) === 200) {
          const programs = response.data.data || [];
          const hasIncompleteProgram = programs.rows.some(
            (program) => !program.completed_at
          );

          if (!hasIncompleteProgram) {
            console.log(
              "No acive program found for this user. Generating a new personalized program."
            );
            setGenerating(true);
            await generatePersonalizedProgram(user.id, prompt);
            setGenerating(false);
          } else {
            console.log("User has active program.");
          }
        } else {
          throw new Error("Failed to fetch programs");
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
        setGenerating(false);
      }
    };
    fetchPrograms();

    // MOVED TO UTILS FOLDER
    //
    // Generating personalized program
    // const generatePersonalizedProgram = async () => {
    //   if (!prompt) return;
    //   setGenerating(true);

    //   try {
    //     // TODO: Create and Use the font-end controller.
    //     // OpenAI will generate the program data
    //     console.log(prompt);
    //     const response_openai = await axiosClient.post(`openai/`, {
    //       prompt: prompt,
    //     });
    //     if (Number(response_openai.status) !== 200) {
    //       throw new Error("Failed to get OpenAI response");
    //     }
    //     const parsedContent = JSON.parse(
    //       response_openai.data.data.choices[0].message.content
    //     );
    //     console.log("AI generated data:", parsedContent);

    //     // TODO: Create and Use the font-end controller.
    //     // Insert program data into the database
    //     const response_program = await axiosClient.post("programs/", {
    //       ...parsedContent.program,
    //       user_id: user.id,
    //     });
    //     if (Number(response_program.status) !== 201) {
    //       throw new Error("Failed to insert program info");
    //     }

    //     // Insert routine data into the database
    //     for (const routine_item of parsedContent.routine) {
    //       const response_routine = await axiosClient.post(
    //         "routines/",
    //         routine_item
    //       );
    //       if (Number(response_routine.status) !== 201) {
    //         throw new Error("Failed to insert routine info");
    //       }
    //     }

    //     // Insert program_routine data into the database
    //     await Promise.all(
    //       parsedContent.program_routine.map(async (program_routine_item) => {
    //         const response_program_routine = await createProgramRoutine(
    //           program_routine_item.program_id,
    //           program_routine_item.routine_id,
    //           program_routine_item.scheduled_date,
    //           program_routine_item.completed
    //         );
    //         if (response_program_routine.status === 201) {
    //           console.log(
    //             "Program_Routine created successfully (inserted)",
    //             response_program_routine.status
    //           );
    //         } else if (response_program_routine.status === 200) {
    //           console.log(
    //             "Program_Routine created successfully (updated)",
    //             response_program_routine.status
    //           );
    //         } else {
    //           throw new Error("Failed to insert program_routine info");
    //         }
    //       })
    //     );

    //     // Insert routine_exercise data into the database
    //     await Promise.all(
    //       parsedContent.routine_exercise.map(async (routine_exercise_item) => {
    //         const response_routine_exercise = await createRoutineExercise({
    //           exercise_id: routine_exercise_item.exercise_id,
    //           routine_id: routine_exercise_item.routine_id,
    //           order: routine_exercise_item.order,
    //           sets: routine_exercise_item.sets,
    //           reps: routine_exercise_item.reps,
    //           duration: 0,
    //           rest_time: routine_exercise_item.rest_time,
    //         });
    //         if (response_routine_exercise.status === 201) {
    //           console.log(
    //             "Routine_Exercise created successfully (inserted)",
    //             response_routine_exercise.status
    //           );
    //         } else if (response_routine_exercise.status === 200) {
    //           console.log(
    //             "Routine_Exercise created successfully (updated)",
    //             response_routine_exercise.status
    //           );
    //         } else {
    //           throw new Error("Failed to insert routine_exercise info");
    //         }
    //       })
    //     );
    //   } catch (error) {
    //     console.error("Error generating personalized program:", error);
    //   } finally {
    //     setGenerating(false);
    //   }
    // };
  }, [prompt]);

  const isMdUp = useMediaQuery(theme.breakpoints.up('md')); 

  return (
    <>
      {/* Backdrop for generating, loading */}
      <Backdrop
        open={generating || loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box textAlign="center">
          <CircularProgress color="inherit" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            {generating ? "Generating personalized program..." : "Loading..."}
          </Typography>
        </Box>
      </Backdrop>

      <Grid2 container spacing={2}>
        {isMdUp ? (
          <>
            {/* LEFT COLUMN */}
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* ADD GADGETS HERE */}
                <GadgetUserProfile userInfo={userInfo} />
                <GadgetStreaks userInfo={userInfo} history={userAccumulatedStats?.data || []} />
                <GadgetFavourite exerciseInfo={exerciseInfo || []} />
              </Box>
            </Grid2>
            {/* RIGHT COLUMN */}
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* ADD GADGETS HERE*/}
                <GadgetAchievement userInfo={userInfo} />
                <GadgetHistory history={userAccumulatedStats?.data || []} />
              </Box>
            </Grid2>
          </>
        ) : (
          <Grid2 xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <GadgetUserProfile userInfo={userInfo} />
              <GadgetAchievement userInfo={userInfo} />
              <GadgetStreaks userInfo={userInfo} history={userAccumulatedStats?.data || []} />
              <GadgetHistory history={userAccumulatedStats?.data || []} />
              <GadgetFavourite exerciseInfo={exerciseInfo || []} />
            </Box>
          </Grid2>
        )}
      </Grid2>
    </>
  );
};

Dashboard.propTypes = {
  title: PropTypes.string,
};
