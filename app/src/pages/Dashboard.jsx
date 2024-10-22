// Reat and Material-UI
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Grid2, Box, Typography, Backdrop, CircularProgress } from '@mui/material';
// Gadgets Components
import { GadgetUserProfile } from "../components/GadgetUserProfile.jsx";
import { GadgetStreaks } from '../components/GadgetStreaks.jsx';
import { GadgetFavourite } from '../components/GadgetFavourite';
import { GadgetAchievement } from '../components/GadgetAchievement';
import { GadgetHistory } from '../components/GadgetHistory';
// Common Components
import { useAuth } from "../utils/AuthProvider.jsx";
import { setPageTitle } from "../utils/utils";
import { getUserProgress } from '../controllers/UserController';
import axiosClient from '../utils/axiosClient';
// Prompts
import { createProgram } from '../utils/prompt/createProgram';

export const Dashboard = (props) => {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState(null);
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();
  const hasFetchedPrograms = useRef(false);

  // Initialization
  useEffect(() => {
    setPageTitle(props.title);
  }, [props.title]);

  // Load user progress data
  useEffect(() => {
    console.log("GadgetStreaks mounted");
    const loadUserdata = async () => {
      const userProgress = await getUserProgress(user.id);
      console.log(userProgress);
      setUserProgress(userProgress);
    }
    loadUserdata();

    return () => {
      console.log("GadgetStreaks unmounted");
    };
  }, []);

  // Remove hash from URL after Google OAuth redirect
  useEffect(() => {
    if (window.location.href.includes('#')) {
      navigate(window.location.pathname, { replace: true });
    }
  }, [navigate]);

  // Generated personalized program for the user (IF THE USER DON'T HAVE ONE)
  useEffect(() => {
    if (hasFetchedPrograms.current) return;
    hasFetchedPrograms.current = true;

    // Check if the user has a program
    const fetchPrograms = async () => {
      try {
        const response = await axiosClient.get(`programs/user/${user.id}`);
        if (Number(response.status) === 200 && Number(response.data.data.count) === 0) {
          console.log("No program found for this user. Generating a new personalized program.");
          await generatePersonalizedProgram();
        } else {
          console.log("User already has a program.");
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    }
    fetchPrograms();
    
    // Generating personalized program
    const generatePersonalizedProgram = async () => {
      setGenerating(true);
      try {
        // OpenAI will generate the program data
        const response_openai = await axiosClient.post(
          `openai/`,
          { prompt: createProgram.prompt }
        );
        if (Number(response_openai.status) !== 200) {
          throw new Error("Failed to get OpenAI response");
        }
        const parsedContent = JSON.parse(response_openai.data.data.choices[0].message.content);
        console.log(parsedContent);

        // Insert program data into the database
        const response_program = await axiosClient.post(
          'programs/',
          {
            ...parsedContent.program,
            user_id: user.id,
          }
        );
        if (Number(response_program.status) !== 201) {
          throw new Error("Failed to fetch program info");
        }
        console.log(response_program);

        // Insert routine data into the database
        parsedContent.routine.forEach(async (routine_item) => {
          console.log(routine_item);
          const response_routine = await axiosClient.post(
            'routines/',
            routine_item
          );
          if (Number(response_program.status) !== 201) {
            throw new Error("Failed to fetch routine info");
          }
          console.log(response_routine);
        });

        // Insert routine_exercise data into the database
        parsedContent.routine_exercise.forEach(async (routine_exercise_item) => {
          console.log(routine_exercise_item);
          const response_routine_exercise = await axiosClient.post(
            'routineExercises/',
            routine_exercise_item
          );
          if (Number(response_program.status) !== 201) {
            throw new Error("Failed to fetch routine_exercise info");
          }
          console.log(response_routine_exercise);
        });

      } catch (error) {
        console.error("Error generating personalized program:", error);
      } finally {
        setGenerating(false);
      }
    };
  }, []);

  return (
    <>
      {/* Backdrop for loading */}
      <Backdrop
        open={generating}  // Control when to show the overlay
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box textAlign="center">
          <CircularProgress color="inherit" />
          <Typography variant="h6" sx={{ mt: 2 }}>Generating personalized program...</Typography>
        </Box>
      </Backdrop>

      <Grid2 container spacing={2}>
        {/* LEFT COLUMN */}
        <Grid2 size={{xs:12, md:6}}>
          <Box
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 2,
            }
          }>
            {/* ADD GADGETS HERE */}
            <GadgetUserProfile userProgress={userProgress} />
            <GadgetStreaks userProgress={userProgress} />
            <GadgetFavourite />
          </Box>
        </Grid2>
        {/* RIGHT COLUMN */}
        <Grid2 size={{xs:12, md:6}} >
          <Box
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 2,
            }
          }>
            {/* ADD GADGETS HERE*/}
            <GadgetAchievement />
            <GadgetHistory />
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
};

Dashboard.propTypes = {
  title: PropTypes.string,
};
