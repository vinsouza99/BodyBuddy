// Reat and Material-UI
import PropTypes from "prop-types";
import { useState, useEffect, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Tabs, Tab, Grid2, Skeleton } from "@mui/material";
import { LoadingBackdrop } from "../components/LoadingBackdrop.jsx";
import { ErrorMessage } from "../components/ErrorMessage.jsx";
// Gadgets Components
import { GadgetRoutineOfToday } from "../components/GadgetRoutineOfToday.jsx";
import { GadgetRegenerateProgram } from "../components/GadgetRegenerateProgram.jsx";
import { GadgetSchedule } from "../components/GadgetSchedule.jsx";
import { GadgetPremadeRoutineList } from "../components/GadgetPremadeRoutineList.jsx";
// Common Components
import { useAuth } from "../utils/AuthProvider.jsx";
import { setPageTitle } from "../utils/utils";
import { getAllPresetRoutines } from "../controllers/RoutineController";
import { getAllUserPrograms } from "../controllers/ProgramController";
import { generatePersonalizedProgram } from "../utils/generatePersonalizedProgram";
// Prompts
import { useGenerateProgramPrompt } from "../utils/prompt/GenerateProgramPrompt";

const tabStyles = {
  "&.Mui-selected": {
    outline: "none",
    border: "none",
  },
  "&:focus": {
    outline: "none",
  },
};

export const TrainingProgram = memo((props) => {
  const { user } = useAuth();
  const [presetRoutines, setPresetRoutines] = useState([]);
  const [activeProgram, setActiveProgram] = useState(null);
  const [programRoutines, setProgramRoutines] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loadingProgramError, setLoadingProgramError] = useState(false);
  const [loadingProgram, setLoadingProgram] = useState(true);
  const [loadingPremadeRoutines, setLoadingPremadeRoutines] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generatingComplete, setGeneratingComplete] = useState(false);
  const [promptReady, setPromptReady] = useState(false);
  const prompt = useGenerateProgramPrompt({});
  const navigate = useNavigate();

  const handleTabChange = (event, value) => {
    setActiveTab(value);
  };

  // Initialization
  useEffect(() => {
    setPageTitle(props.title);
    loadData();
  }, []);

  // Check if prompt is ready
  useEffect(() => {
    if (prompt) {
      setPromptReady(true);
    }
  }, [prompt]);

  // Generate a new personalized program for the user
  useEffect(() => {
    if (!generating) return;

    const generateProgram = async () => {
      try {
        await generatePersonalizedProgram(user.id, prompt);
        setGenerating(false);
        setGeneratingComplete(true);
      } catch {
        navigate("/error", {
          errorDetails:
            "There was an error while generating program... try again later.",
        });
      }
    };
    generateProgram();
  }, [generating]);

  // Load a new program
  useEffect(() => {
    if (generatingComplete) {
      setLoadingProgram(true);
      loadData();
      setGeneratingComplete(false);
    }
  }, [generatingComplete]);

  // Load program routines data
  const loadData = async () => {
    try {
      // Retrieve Program
      const programs = await getAllUserPrograms(user.id, true, false);

      // Find the first program without completed_at
      const activeProgram = programs.find((program) => !program.completed_at);
      if (activeProgram) {
        setActiveProgram(activeProgram);
        setProgramRoutines(activeProgram?.routines || []);
        if (activeProgram.name) setPageTitle(activeProgram.name);
      } else {
        setActiveProgram(null);
      }
      setLoadingProgram(false);

      // Retrieve Preset Routines
      const presetRoutines = await getAllPresetRoutines();
      setPresetRoutines(presetRoutines);
      setLoadingPremadeRoutines(false);
    } catch (e) {
      console.error(e);
      setLoadingProgramError(true);
    } finally {
      setLoadingProgram(false);
      setLoadingPremadeRoutines(false);
    }
  };

  const handleGenerateProgram = () => {
    setGenerating(true);
  };

  // Memoize the "My Program" tab content
  const myProgramTabContent = useMemo(() => {
    if (loadingProgram) {
      return;
    }
    return (
      <>
        <Grid2 container spacing={2}>
          {/* LEFT COLUMN */}
          <Grid2 size={{ xs: 12, md: 7 }}>
            {loadingProgramError ? (
              <ErrorMessage
                message=""
                callback={loadData}
                callbackAction="Try Again"
              />
            ) : activeProgram ? (
              <GadgetRoutineOfToday programRoutines={programRoutines} />
            ) : (
              <GadgetRegenerateProgram
                handleGenerateProgram={handleGenerateProgram}
              />
            )}
          </Grid2>
          {/* RIGHT COLUMN */}
          <Grid2 size={{ xs: 12, md: 5 }}>
            <GadgetSchedule programRoutines={programRoutines} />
          </Grid2>
        </Grid2>
      </>
    );
  }, [activeProgram, programRoutines, loadingProgram, generating]);

  // Memoize the "Premade Routines" tab content
  const premadeRoutinesTabContent = useMemo(() => {
    if (loadingProgram) {
      return;
    }
    return <GadgetPremadeRoutineList presetRoutines={presetRoutines} />;
  }, [presetRoutines, loadingProgram]);

  return (
    <>
      {/* Backdrop for loading */}
      {activeTab === 0 && (
        <LoadingBackdrop
          loading={loadingProgram || !promptReady}
          generating={generating}
        />
      )}
      {activeTab === 1 && <LoadingBackdrop loading={loadingPremadeRoutines} />}

      {/* Tab Navigation */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="Program and Preset Routine tabs"
      >
        <Tab label="My Program" sx={tabStyles} />
        <Tab label="Premade Routines" sx={tabStyles} />
      </Tabs>
      <Box sx={{ marginTop: 2 }}>
        {/* MY PROGRAM TAB */}
        {activeTab === 0 ? (
          loadingProgram ? (
            <>
              <Grid2 container gap={2} columns={{ sm: 1, md: 2 }}>
                <Box flexGrow={2}>
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    height={250}
                  />
                </Box>
                <Box flexGrow={1}>
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    height={450}
                  />
                </Box>
              </Grid2>
            </>
          ) : (
            myProgramTabContent
          )
        ) : null}
        {/* PREMADE ROUTINES TAB */}
        {activeTab === 1 ? (
          loadingPremadeRoutines ? (
            <>
              <Grid2
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {Array.from(Array(9)).map((_, index) => (
                  <Grid2
                    key={index}
                    size={{ xs: 2, sm: 4, md: 4 }}
                    gap={2}
                    spacing={5}
                  >
                    <Box display="flex" flexDirection="column" gap={1}>
                      <Skeleton variant="rectangular" height={245} />
                      <Skeleton variant="rectangular" height={20} width={250} />
                      <Box display="flex" gap={1}>
                        <Skeleton
                          variant="rectangular"
                          height={15}
                          width={50}
                        />
                        <Skeleton
                          variant="rectangular"
                          height={15}
                          width={50}
                        />
                        <Skeleton
                          variant="rectangular"
                          height={15}
                          width={50}
                        />
                      </Box>
                    </Box>
                  </Grid2>
                ))}
              </Grid2>
            </>
          ) : (
            premadeRoutinesTabContent
          )
        ) : null}
      </Box>
    </>
  );
});

TrainingProgram.propTypes = {
  title: PropTypes.string,
};

TrainingProgram.displayName = "TrainingProgram";
