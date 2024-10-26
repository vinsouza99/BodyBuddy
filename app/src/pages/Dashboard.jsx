// Reat and Material-UI
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid2,
  Box,
  Typography,
  Backdrop,
  CircularProgress,
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
  // getUserProgress,
  getUserAccumulatedTimes,
} from "../controllers/UserController";
import { createProgramRoutine } from "../controllers/ProgramController";
import { createRoutineExercise } from "../controllers/RoutineController";
// import { getRoutineHistory } from "../controllers/RoutineController";
import axiosClient from "../utils/axiosClient";
// Prompts
import { createProgram } from "../utils/prompt/createProgram";

export const Dashboard = (props) => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  // const [userProgress, setUserProgress] = useState(null);
  const [userAccumulatedTimes, setUserAccumulatedTimes] = useState(null);
  // const [userHistory, setUserHistory] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  // const [userProgressLoaded, setUserProgressLoaded] = useState(false);
  const [userAccumulatedTimesLoaded, setUserAccumulatedTimesLoaded] = useState(false);
  // const [userHistoryLoaded, setUserHistoryLoaded] = useState(false);
  const navigate = useNavigate();
  const hasFetchedPrograms = useRef(false);

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

        const userAccumulatedTime = await getUserAccumulatedTimes(user.id);
        setUserAccumulatedTimes(userAccumulatedTime);
        setUserAccumulatedTimesLoaded(true);
      } catch (error) {
        console.error("Error loading user progress data:", error);
      }
    };
    loadUserdata();
  }, []);

  useEffect(() => {
    if (userInfoLoaded && userAccumulatedTimesLoaded) {
      setLoading(false);
    }
  }, [userInfoLoaded, userAccumulatedTimesLoaded]);

  // Generated personalized program for the user (IF THE USER DON'T HAVE ONE)
  useEffect(() => {
    if (hasFetchedPrograms.current) return;
    hasFetchedPrograms.current = true;

    // Check if the user has a program
    const fetchPrograms = async () => {
      try {
        const response = await axiosClient.get(`programs/user/${user.id}`);
        if (
          Number(response.status) === 200 &&
          Number(response.data.data.count) === 0
        ) {
          console.log(
            "No program found for this user. Generating a new personalized program."
          );
          await generatePersonalizedProgram();
        } else {
          console.log("User already has a program.");
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    fetchPrograms();

    // Generating personalized program
    const generatePersonalizedProgram = async () => {
      setGenerating(true);
      try {
        // TODO: Create and Use the font-end controller.
        // OpenAI will generate the program data
        const response_openai = await axiosClient.post(`openai/`, {
          prompt: createProgram.prompt,
        });
        if (Number(response_openai.status) !== 200) {
          throw new Error("Failed to get OpenAI response");
        }
        const parsedContent = JSON.parse(
          response_openai.data.data.choices[0].message.content
        );
        console.log("AI generated data:", parsedContent);

        // TODO: Create and Use the font-end controller.
        // Insert program data into the database
        const response_program = await axiosClient.post("programs/", {
          ...parsedContent.program,
          user_id: user.id,
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
            if (response_program_routine.status === 201) {
              console.log(
                "Program_Routine created successfully (inserted)",
                response_program_routine.status
              );
            } else if (response_program_routine.status === 200) {
              console.log(
                "Program_Routine created successfully (updated)",
                response_program_routine.status
              );
            } else {
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
            if (response_routine_exercise.status === 201) {
              console.log(
                "Routine_Exercise created successfully (inserted)",
                response_routine_exercise.status
              );
            } else if (response_routine_exercise.status === 200) {
              console.log(
                "Routine_Exercise created successfully (updated)",
                response_routine_exercise.status
              );
            } else {
              throw new Error("Failed to insert routine_exercise info");
            }
          })
        );
      } catch (error) {
        console.error("Error generating personalized program:", error);
      } finally {
        setGenerating(false);
      }
    };
  }, []);

  return (
    <>
      {/* Backdrop for generating, loading */}
      <Backdrop
        open={generating} // Control when to show the overlay
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box textAlign="center">
          <CircularProgress color="inherit" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Generating personalized program...
          </Typography>
        </Box>
      </Backdrop>

      <Backdrop
        open={loading} // Control when to show the overlay
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box textAlign="center">
          <CircularProgress color="inherit" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Box>
      </Backdrop>

      <Grid2 container spacing={2}>
        {/* LEFT COLUMN */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* ADD GADGETS HERE */}
            <GadgetUserProfile userInfo={userInfo} />
            <GadgetStreaks userInfo={userInfo} history={userAccumulatedTimes?.data || []}/>
            <GadgetFavourite />
          </Box>
        </Grid2>
        {/* RIGHT COLUMN */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* ADD GADGETS HERE*/}
            <GadgetAchievement />
            <GadgetHistory history={userAccumulatedTimes?.data || []} />
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
};

Dashboard.propTypes = {
  title: PropTypes.string,
};
