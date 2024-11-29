// Reat and Material-UI
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Grid2, useMediaQuery, Skeleton } from "@mui/material";
// Gadgets Components
import { GadgetUserProfile } from "../components/GadgetUserProfile.jsx";
import { GadgetStreaks } from "../components/GadgetStreaks.jsx";
import { GadgetFavourite } from "../components/GadgetFavourite";
import { GadgetAchievement } from "../components/GadgetAchievement";
import { GadgetHistory } from "../components/GadgetHistory";
// Common Components
import { useAuth } from "../utils/AuthProvider.jsx";
import { setPageTitle } from "../utils/utils";
import { LoadingBackdrop } from "../components/LoadingBackdrop.jsx";
import {
  getUser,
  getUserAccumulatedStats,
} from "../controllers/UserController";
import { getExercisesThumbnails } from "../controllers/ExerciseController";
import { generatePersonalizedProgram } from "../utils/generatePersonalizedProgram";
import theme from "../theme";
// Prompts
import { useGenerateProgramPrompt } from "../utils/prompt/GenerateProgramPrompt";
import { getAllUserPrograms } from "../controllers/ProgramController.js";

export const Dashboard = (props) => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [userAccumulatedStats, setUserAccumulatedStats] = useState(null);
  const [exerciseInfo, setExerciseInfo] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  const [userAccumulatedStatsLoaded, setUserAccumulatedStatsLoaded] =
    useState(false);
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

        const userAccumulatedStats = await getUserAccumulatedStats(user.id);
        setUserAccumulatedStats(userAccumulatedStats);
        setUserAccumulatedStatsLoaded(true);
      } catch (error) {
        console.error("Error loading user progress data:", error);
        navigate("/error", {
          errorDetails:
            "There was an error while loading user's information... try again later.",
        });
      }
    };
    loadUserdata();

    const loadExerciseData = async () => {
      try {
        const response = await getExercisesThumbnails();
        setExerciseInfo(response);
        setExerciseInfoLoaded(true);
      } catch (e) {
        console.error("Error loading exercises' information:", e);
        navigate("/error", {
          errorDetails:
            "There was an error while loading exercises' information... try again later.",
        });
      }
    };
    loadExerciseData();
  }, [user]);

  // Switch loading backdrop
  useEffect(() => {
    if (userInfoLoaded && userAccumulatedStatsLoaded && exerciseInfoLoaded) {
      setLoading(false);
    }
  }, [userInfoLoaded, userAccumulatedStatsLoaded, exerciseInfoLoaded]);

  // Generated personalized program for the user (IF THE USER DON'T HAVE ONE)
  useEffect(() => {
    // Check if the user is authenticated and prompt is available
    if (!user || !prompt || Object.keys(userPreferences).length === 0) return;

    // Check if the user has an acive program
    const fetchPrograms = async () => {
      try {
        const programs = await getAllUserPrograms(user.id);
        if (programs.length === 0) {
          setGenerating(true);
          await generatePersonalizedProgram(user.id, prompt);
          setGenerating(false);
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
      {/* Backdrop for loading */}
      <LoadingBackdrop loading={loading} generating={generating} />

      <Grid2 container spacing={2}>
        {isMdUp ? (
          <>
            {/* LEFT COLUMN */}
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* ADD GADGETS HERE */}
                {loading ? (
                  <>
                    <Box display="flex" gap={2} padding={2}>
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        width={80}
                        height={80}
                      />
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent={"space-between"}
                        gap={2}
                        flexGrow={1}
                      >
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          width={100}
                          sx={{ marginTop: "10px" }}
                        />
                        <Skeleton animation="wave" variant="rectangular" />
                      </Box>
                    </Box>
                    <Box>
                      <Skeleton
                        animation="wave"
                        width="100%"
                        height="300px"
                        variant="rectangular"
                      />
                    </Box>
                    <Box>
                      <Skeleton
                        animation="wave"
                        width="100%"
                        height="300px"
                        variant="rectangular"
                      />
                    </Box>
                  </>
                ) : (
                  <>
                    <GadgetUserProfile userInfo={userInfo} />
                    <GadgetStreaks
                      userInfo={userInfo}
                      history={userAccumulatedStats?.data || []}
                    />
                    <GadgetFavourite exerciseInfo={exerciseInfo || []} />
                  </>
                )}
              </Box>
            </Grid2>
            {/* RIGHT COLUMN */}
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* ADD GADGETS HERE*/}
                {loading ? (
                  <>
                    <Box>
                      <Skeleton
                        animation="wave"
                        width="100%"
                        height="300px"
                        variant="rectangular"
                      />
                    </Box>
                    <Box>
                      <Skeleton
                        animation="wave"
                        width="100%"
                        height="500px"
                        variant="rectangular"
                      />
                    </Box>
                  </>
                ) : (
                  <>
                    <GadgetAchievement userInfo={userInfo} />
                    <GadgetHistory history={userAccumulatedStats?.data || []} />
                  </>
                )}
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
