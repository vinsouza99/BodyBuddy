// Reat and Material-UI
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Backdrop,
  Grid2,
  useMediaQuery,
} from "@mui/material";
import { CircularProgress } from "../components/CircularProgress.jsx";
import ProgramLoading from "../assets/ProgramLoading.gif";
// Gadgets Components
import { GadgetUserProfile } from "../components/GadgetUserProfile.jsx";
import { GadgetStreaks } from "../components/GadgetStreaks.jsx";
import { GadgetFavourite } from "../components/GadgetFavourite";
import { GadgetAchievement } from "../components/GadgetAchievement";
import { GadgetHistory } from "../components/GadgetHistory";
// Common Components
import { useAuth } from "../utils/AuthProvider.jsx";
import { setPageTitle } from "../utils/utils";
import { getUser, getUserAccumulatedStats,
} from "../controllers/UserController";
import { getExercisesThumbnails } from "../controllers/ExerciseController";
import { generatePersonalizedProgram } from "../utils/generatePersonalizedProgram";
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
      const response = await getExercisesThumbnails();
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
          // const hasIncompleteProgram = programs.rows.some(
          //   (program) => !program.completed_at
          // );
          const hasNoPrograms = programs.rows.length === 0;

          if (hasNoPrograms) {
            console.log(
              "No program found for this user. Generating the first personalized program."
            );
            setGenerating(true);
            await generatePersonalizedProgram(user.id, prompt);
            setGenerating(false);
          } else {
            console.log("User already has some programs.");
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
  }, [prompt]);

  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      {/* Backdrop for generating, loading */}
      <Backdrop
        open={generating || loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box textAlign="center">
          {generating ? (
            <Box 
              component="img" 
              src={ ProgramLoading }
              alt="Loading"
              sx={{
                width: "800px",
                maxWidth: "90%",
              }}
            />
          ) : (
            <CircularProgress color="inherit" />
          )}
          <Typography variant="h6" sx={{ mt: 2, whiteSpace: "pre-line" }}>
            {generating ? "" : "Loading..."}
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
                <GadgetStreaks
                  userInfo={userInfo}
                  history={userAccumulatedStats?.data || []}
                />
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <GadgetUserProfile userInfo={userInfo} />
              <GadgetAchievement userInfo={userInfo} />
              <GadgetStreaks
                userInfo={userInfo}
                history={userAccumulatedStats?.data || []}
              />
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
