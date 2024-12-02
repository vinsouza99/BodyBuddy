// React and Material-UI
import PropTypes from "prop-types";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { CircularProgress } from "../components/CircularProgress.jsx";
// Custom Components for Routine Session
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";
import {
  Counter2,
  RestTime2,
  MetricCard,
  DemoExercise,
  Logo,
  ExitRoutineSessionModal,
  CompleteRoutineSessionModal,
} from "../components/routine-session";
import { exerciseCounterLoader } from "../utils/motionDetectLogic/exerciseCounterLoader.js";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useLandscapeMode } from "../components/routine-session/useLandscapeMode";
// Common Components
import { useAuth } from "../utils/AuthProvider.jsx";
import theme from "../theme";
import { supabase } from "../utils/supabaseClient.js";
import axiosClient from "../utils/axiosClient";
import { setPageTitle, sendNotification } from "../utils/utils";
import { getUser } from "../controllers/UserController.js";
import { getExercisesFromRoutine } from "../controllers/RoutineController.js";
import {
  updateUserAccumulatedStats,
  addUserAchievement,
  getUserProgress,
  updateUserProgress,
} from "../controllers/UserController.js";
import { format } from "date-fns";
// Icons & Images
import CloseIcon from "@mui/icons-material/Close";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getAchievement } from "../controllers/LocalTablesController.js";
// Style Object (for sx prop)
const videoStyles = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  filter: "brightness(1.0) contrast(1.2)",
};
const canvasStyles = {
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  top: 0,
  left: 0,
};
const gradientStyles = {
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  top: 0,
  left: 0,
  pointerEvents: "none",
  backgroundImage:
    "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent 15%, transparent 85%, rgba(0, 0, 0, 0.9))",
  zIndex: 1,
};

export const RoutineSession = ({ title = "Routine Session" }) => {
  const { user } = useAuth(); // For session management
  const navigate = useNavigate();
  const location = useLocation();
  const isLandscapeMode = useLandscapeMode();
  const {
    record = false,
    id = false,
    idType = null,
    reps = 0,
  } = location.state || {}; // Receive from the StartRoutineModal as a prop

  // Note: Angle meters are temporarily removed as they are not an effective UI
  // const angleChangeThreshold = 3;
  // let previousAngle = null;
  // const [angle, setAngle] = useState(180);

  // --- State ---
  // NOTE: useReducer might be a better choice for managing multiple states
  const [userInfo, setUserInfo] = useState({});
  const [programId, setProgramId] = useState(null);
  const [routine, setRoutine] = useState([]);
  const [exerciseVideo, setExerciseVideo] = useState(null);
  const [exerciseCounter, setExerciseCounter] = useState(null);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const [successSetCount, setSuccessSetCount] = useState(0);
  const [successRepCount, setSuccessRepCount] = useState(0);
  const [calorie, setCalorie] = useState(0);
  const [score, setScore] = useState(0);
  const [postureAlert, setPostureAlert] = useState(null);
  const [lastPostureAlertUpdate, setLastPostureAlertUpdate] = useState(0);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isExerciseMenuOpen, setIsExerciseMenuOpen] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isResting, setIsResting] = useState(true);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [restForSetIncrement, setRestForSetIncrement] = useState(false);
  const [restForNextExercise, setRestForNextExercise] = useState(true);
  const [voice, setVoice] = useState(null);

  // --- Refs ---
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseLandmarkerRef = useRef(null);
  const runningMode = useRef("VIDEO");
  const animationFrameIdRef = useRef(null);
  const calorieUpdatedRef = useRef(false);
  const startedAtRef = useRef(null);

  // ---------------------------------------------------------
  //                      useEffect Hooks
  // ---------------------------------------------------------

  // Initialization (MediaPipe PoseLandmarker, Retrieve routine/program information)
  useEffect(() => {
    setPageTitle(title);

    // Overwrite the style of #root
    const rootElement = document.getElementById("root");
    rootElement.style.margin = "0";
    rootElement.style.padding = "0";
    rootElement.style.width = "100%";
    rootElement.style.maxWidth = "100%";

    // Get session start time
    if (!startedAtRef.current) {
      startedAtRef.current = new Date();
    }

    // Load voices for text-to-speech
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      const selectedVoice =
        voices.find((v) => v.name.includes("Google US English")) || voices[0];
      setVoice(selectedVoice || null);
    };
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();

    // Get user info
    const fetchUserInfo = async () => {
      try {
        const data = await getUser(user);
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
        navigate("/error", {
          errorDetails:
            "There was an error while loading user's information... try again later.",
        });
      }
    };
    fetchUserInfo();

    // Setup MediaPipe PoseLandmarker when component mounts
    const createPoseLandmarker = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );
        const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
            delegate: "GPU",
          },
          runningMode: runningMode.current,
          numPoses: 2,
        });
        poseLandmarkerRef.current = poseLandmarker;
      } catch (error) {
        console.error("Error loading PoseLandmarker:", error);
      }
    };
    createPoseLandmarker();

    // Retrieve program ID from the routine ID
    const fetchProgramId = async () => {
      try {
        if (idType === "routine") {
          const response = await axiosClient.get(`programs/routine/${id}`, {
            validateStatus: (status) => status === 200 || status === 404,
          });

          if (Number(response.status) === 200) {
            setProgramId(response.data.data.program_id);
          } else if (Number(response.status) === 404) {
            setProgramId(null);
          } else {
            throw new Error("Failed to fetch program ID");
          }
        }
      } catch (error) {
        console.error("Error fetching program ID:", error);
      }
    };
    fetchProgramId();

    // Retrieve routine information from the database (if idType is "routine")
    const fetchRoutineInfo = async () => {
      try {
        const exercises = await getExercisesFromRoutine(id);

        // Order by exercise order
        exercises.sort((a, b) => a.order - b.order);

        setRoutine(createRoutineTimeSchedule(exercises));
      } catch (error) {
        console.error("Error fetching routine:", error);
      }
    };

    // Rerieve exercise information from the database (if idType is "exercise")
    const fetchExerciseInfo = async () => {
      // CREATE A ROUTINE INCLUDE ONLY ONE EXERCISE
      try {
        const response = await axiosClient.get(`Exercises/${id}`);
        if (Number(response.status) !== 200) {
          throw new Error("Failed to fetch exercise info");
        }
        const routineData = [
          {
            exercise_id: response.data.data.id,
            name: response.data.data.name,
            goal: `1 set of ${reps} reps`,
            sets: 1,
            reps: Number(reps),
            duration: 0,
            rest_time: 0,
            image: response.data.data.demo_url,
          },
        ];
        setRoutine(routineData);
      } catch (error) {
        console.error("Error fetching exercise:", error);
      }
    };

    // Fetch routine or exercise information based on idType
    if (idType === "routine") {
      fetchRoutineInfo();
    } else if (idType === "exercise") {
      fetchExerciseInfo();
    } else {
      console.error("Invalid idType:", idType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Enable webcam when videoRef is available
  //
  // Note: I can't detect the video element ready using useEffect.
  // So, I use MutationObserver to detect the video element ready.
  // Not sure, this is a right approach as a React
  // but use this for a workaround for the issue.
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (videoRef.current) {
        toggleWebCam();
        // Disconnect the observer after the video element is available
        observer.disconnect();
      }
    });

    // Check if the video element is available
    observer.observe(document, { childList: true, subtree: true });

    // Cleanup
    return () => {
      if (webcamRunning) toggleWebCam();
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Enable recoding when webcam is running (ONLY WHEN RECORDING IS APPROVED)
  useEffect(() => {
    if (webcamRunning && record && !isRecording) {
      toggleRecording();
    }

    // Cleanup
    return () => {
      // Stop recording
      if (isRecording) stopRecording();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRunning, record, isRecording]);

  // Reset selected exercise index when routine changes
  useEffect(() => {
    if (routine && routine.length > 0) {
      setSelectedExerciseIndex(0);
    }
  }, [routine]);

  // Dynamically load exercise counter class based on selected exercise
  useEffect(() => {
    // Reset success count when exercise changes
    setSuccessRepCount(0);
    setSuccessSetCount(0);

    // Load exercise counter based on the selected exercise
    const selectedExercise = routine[selectedExerciseIndex];
    const CounterClass = loadExerciseCounter(selectedExercise);
    setExerciseCounter(CounterClass);
  }, [selectedExerciseIndex, routine]);

  // Start prediction when webcam is running and not resting
  useEffect(() => {
    if (exerciseCounter && webcamRunning && !isResting) {
      predictPosture(); // Start prediction when webcam is running and not resting
    }

    // Cleanup
    return () => {
      clearCanvas();
      if (animationFrameIdRef.current) {
        window.cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseCounter, webcamRunning, isResting]);

  // Read out the rep count
  useEffect(() => {
    if (successRepCount !== 0) {
      readoutText(successRepCount);
    }
  }, [successRepCount]);

  // Read out the set count
  useEffect(() => {
    if (successSetCount !== 0) {
      readoutText(`Great job!!`);
    }
  }, [successSetCount]);

  // Read out the alert
  useEffect(() => {
    if (postureAlert) {
      readoutText(postureAlert);
    }
  }, [postureAlert]);

  // Record user activity
  useEffect(() => {
    const updateUserHistory = async () => {
      if (isFinished && (!record || (record && exerciseVideo))) {
        setIsResting(true);
        await updateUserActivity();
        await updateRoutineCompletionStatus();
        await updateProgramCompletionStatus();
        await updateUserAccumulatedStat();
        await updateUserScore();
        earnBadges();
      }
    };
    updateUserHistory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished, record, exerciseVideo]);

  // Note: This is a workaround to prevent multiple calorie updates
  useEffect(() => {
    calorieUpdatedRef.current = false;
  }, [successRepCount]);

  // ---------------------------------------------------------
  //                      Event Handlers
  // ---------------------------------------------------------

  // Upload recording to Supabase Storage
  const handleUploadRecording = async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const fileName = `${user.id}/recorded_video_${Date.now()}.webm`;

      const { data, error } = await supabase.storage
        .from("Training Videos")
        .upload(fileName, blob, {
          contentType: "video/webm",
        });

      if (error) {
        console.error("Error uploading file:", error);
      } else {
        setExerciseVideo(`${fileName}`);
        setRecordedChunks([]);

        // Show Snackbar
        setIsSnackbarOpen(true);
      }
    }
  };

  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  // Handle quitting the routine
  const handleQuitRoutine = () => {
    if (idType === "exercise") {
      if (webcamRunning) toggleWebCam();
      handleMoveToLearningPage();
    }
    // Diablog for confirmation
    setIsConfirmDialogOpen(true);
  };

  // Handle quitting the routine (Confirm)
  const handleConfirmQuit = () => {
    setIsConfirmDialogOpen(false);
    // Disable Webcam
    if (webcamRunning) toggleWebCam();
    handleMoveToTrainingPage();
  };

  // Handle quitting the routine (Cancel)
  const handleCancelQuit = () => {
    setIsConfirmDialogOpen(false);
  };

  // Handle finishing the routine (Insert log info to the database)
  const handleFinishRoutine = async () => {
    // Disable Webcam
    if (webcamRunning) toggleWebCam();

    // Stop recording and upload the video before registering the history
    if (isRecording) {
      stopRecording();
      handleUploadRecording();
    }

    // Show completion modal
    setIsFinished(true);
  };

  // Handle moving to the training page
  const handleMoveToTrainingPage = () => {
    navigate("/training");
  };

  // Handle moving to the training page
  const handleMoveToLearningPage = () => {
    navigate("/learning");
  };

  // Handle toggling the exercise menu
  const handleToggleExerciseMenu = () => {
    setIsExerciseMenuOpen((prev) => !prev);
  };

  // Handle incrementing Calorie and Score
  const handleIncrementCalorieAndScore = () => {
    const weightFactor = userInfo.weight_unit === "lb" ? 0.453592 : 1;
    const weight = userInfo.weight ? userInfo.weight * weightFactor : 60;

    setCalorie((prevCalorie) => {
      return (
        Math.round(
          (prevCalorie + weight * (exerciseCounter?.getCaloriePerSec() || 0)) *
            10
        ) / 10
      );
    });
    setScore((prevScore) => {
      return prevScore + (exerciseCounter?.getScorePerSec() || 0);
    });
  };

  // ---------------------------------------------------------
  //                      Helper Functions
  // ---------------------------------------------------------

  // Create routine time schedule
  const createRoutineTimeSchedule = (routineData) => {
    const transformedRoutine = [];

    routineData.forEach((item) => {
      let goalString;
      if (item.reps > 0) {
        goalString = `${item.sets} sets of ${item.reps} reps`;
      } else if (item.duration) {
        if (item.sets === 0) item.sets = 1;
        goalString = `${item.sets} sets of ${item.duration / 1000} seconds`;
      } else {
        goalString = `${item.sets} sets`;
      }

      // If reps is available, set duration to 0
      if (item.reps !== 0 && item.duration !== 0) {
        item.duration = 0;
      }

      // Add current exercise to the transformed array
      transformedRoutine.push({
        exercise_id: item.id,
        name: item.name,
        goal: goalString,
        sets: item.sets ? item.sets : 0,
        reps: item.reps ? item.reps : 0,
        duration: item.duration ? item.duration / 1000 : 0,
        rest_time: item.rest_time / 1000 ? item.rest_time / 1000 : 0,
        image: item.demo_url,
      });
    });

    return transformedRoutine;
  };

  // Switch Webcam On/Off
  const toggleWebCam = async () => {
    if (webcamRunning) {
      // If recording, stop it
      if (isRecording) stopRecording();
      stopWebCam();
    } else {
      await startWebCam();
    }
  };

  // Enable WebCam
  const startWebCam = async () => {
    const videoElement = videoRef.current;
    const constraints = { video: true };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoElement.srcObject = stream;
      videoElement.addEventListener("loadeddata", () => {
        setWebcamRunning(true); // Update state
      });
    } catch (error) {
      console.error("Error accessing the webcam: ", error);
    }
  };

  // Disable WebCam
  const stopWebCam = () => {
    const videoElement = videoRef.current;
    const stream = videoElement.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
        stream.removeTrack(track); // This might be not needed, but just in case.
      });

      videoElement.srcObject = null;
      setWebcamRunning(false);
      clearCanvas();
    }
  };

  // Switch WebCam recording On/Off
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else if (webcamRunning) {
      startRecording();
    } else {
      console.error("Webcam is not running. Cannot start recording.");
    }
  };

  // Start Recording
  const startRecording = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const options = { mimeType: "video/webm" };
      const recorder = new MediaRecorder(stream, options);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => prev.concat(event.data));
        }
      };

      recorder.start(1000);
      setMediaRecorder(recorder);
      setIsRecording(true);
    } else {
      console.error("Webcam is not running. Cannot start recording.");
    }
  }, [videoRef, setRecordedChunks, setMediaRecorder, setIsRecording]);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
      setIsRecording(false);
    }
  }, [mediaRecorder, setMediaRecorder, setIsRecording]);

  // Load exercise counter based on the selected exercise
  const loadExerciseCounter = (selectedExercise) => {
    if (selectedExercise) {
      const CounterClass = exerciseCounterLoader[selectedExercise.exercise_id];
      if (CounterClass) {
        return new CounterClass();
      } else {
        console.error(
          "Exercise counter is not implemented for:",
          selectedExercise.name
        );
        return null;
      }
    } else {
      return null;
    }
  };

  // Perform posture detection on webcam feed and count reps
  const predictPosture = async () => {
    // Skip posture detection during rest time
    if (isResting) {
      return;
    }

    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    const drawingUtils = new DrawingUtils(canvasCtx);

    // Check if video element is available
    if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
      return;
    }

    // Adjust canvas size to match video
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;

    try {
      // Detect posture landmarks from a video element (Execute Mediapipe posture detection model.)
      const results = await poseLandmarkerRef.current.detectForVideo(
        videoElement,
        performance.now()
      );

      // Reset canvas before drawing with the latest landmarks data
      clearCanvas();

      // Process detected landmarks data
      if (results && results.landmarks && results.landmarks.length > 0) {
        // Count exercise using exerciseCounter
        const {
          count = 0,
          alert = "",
          calorie = 0,
          score = 0,
        } = exerciseCounter?.processPose(results.landmarks[0]) || {};

        // Update success count
        if (count !== undefined) {
          setSuccessRepCount((prevSuccessRepCount) => {
            if (count !== prevSuccessRepCount) {
              // Update calorie
              if (!calorieUpdatedRef.current) {
                setCalorie((prevCalorie) => {
                  const weightFactor =
                    userInfo.weight_unit === "lb" ? 0.453592 : 1;
                  const weight = userInfo.weight
                    ? userInfo.weight * weightFactor
                    : 60;
                  return Math.round((prevCalorie + calorie * weight) * 10) / 10;
                });

                // Update score
                setScore((prevScore) => prevScore + score);

                calorieUpdatedRef.current = true;
              }

              // When the rep count reaches the target, increment the set count
              if (
                count >= routine[selectedExerciseIndex].reps &&
                routine[selectedExerciseIndex].reps !== 0
              ) {
                // Count up the set count
                incrementSetsCount();

                // Reset count for next set
                exerciseCounter.resetCount();

                // Rest time after each set (except for the final set)
                // if (successSetCount + 1 < routine[selectedExerciseIndex].sets) {
                //   startRestCountdown("set");
                // }

                // Reset rep count
                return 0;
              }
              // Count up the rep count
              return count;
            }
            return prevSuccessRepCount;
          });

          // Update angle for the meter when the angle diff over the "threshold"
          // const angle = exerciseCounter?.getAngle(results.landmarks[0]);
          // if (
          //   angle !== undefined &&
          //   Math.abs(angle - previousAngle) > angleChangeThreshold
          // ) {
          //   setAngle(Math.round(angle));
          //   previousAngle = angle;
          // }
        }

        // Update alert if any posture issue
        if (alert) {
          updatePostureAlert(alert);
        }

        // Draw pose connections (line between landmarks)
        drawingUtils.drawConnectors(
          results.landmarks[0],
          PoseLandmarker.POSE_CONNECTIONS,
          { color: `${theme.palette.primary.main}`, lineWidth: 2 }
        );
        // Draw pose landmarks
        drawingUtils.drawLandmarks(results.landmarks[0], {
          radius: 1,
          color: (data) => {
            return data.index === 0
              ? `${theme.palette.primary.main}`
              : `${theme.palette.primary.main}`;
          },
        });
      }
    } catch (error) {
      console.error("Error during pose detection:", error);
    }

    // Continue predictions as long as webcam is running
    if (webcamRunning) {
      // Note:
      // The specified callback function is executed when the next frame is ready to be rendered.
      // It is typically executed 60 times per second.
      animationFrameIdRef.current =
        window.requestAnimationFrame(predictPosture);
    }
  };

  // Increment the success set count by reps or duration
  const incrementSetsCount = useCallback(() => {
    setSuccessSetCount((prevSuccessSetCount) => prevSuccessSetCount + 1);
    if (successSetCount + 1 < routine[selectedExerciseIndex].sets) {
      startRestCountdown("set");
    }
  }, [routine, selectedExerciseIndex, successSetCount]);

  // Update program routine completion status
  const updateRoutineCompletionStatus = async () => {
    try {
      if (idType !== "routine") return;
      const response = await axiosClient.put(`/programs/routines`, {
        program_id: programId,
        routine_id: id,
        scheduled_date: format(new Date(), "yyyy-MM-dd"),
        completed: true,
      });
      if (Number(response.status) !== 200 && Number(response.status) !== 204) {
        throw new Error("Failed to update Program_Routine");
      }
    } catch (error) {
      console.error("Failed to update Program_Routine:", error);
    }
  };

  // Update program completion status
  const updateProgramCompletionStatus = async () => {
    try {
      if (idType !== "routine" || programId === null) return;

      // Fetch all routines in the program
      const fetchResponse = await axiosClient.get(
        `/routines/program/${programId}`
      );
      if (Number(fetchResponse.status) !== 200) {
        throw new Error("Failed to fetch Program");
      }

      // Check if all routines in the program are completed
      for (const routine of fetchResponse.data.data) {
        if (!routine.completed) {
          return;
        }
      }

      // Update program completion status to "completed(true)"
      const response = await axiosClient.put(`/programs/${programId}`, {
        completed: true,
      });
      if (Number(response.status) !== 200 && Number(response.status) !== 204) {
        throw new Error("Failed to update Program");
      }
    } catch (error) {
      console.error("Failed to update Program:", error);
    }
  };

  // Update user activity log/history
  const updateUserActivity = async () => {
    try {
      if (idType !== "routine") return;

      const completedAt = new Date().toISOString();
      const newHistoryObj = {
        user_id: user.id,
        completed_at: completedAt,
        routine_id: idType === "routine" ? id : null,
        recording_url: exerciseVideo,
        score: Math.round(score),
        calories: Math.round(calorie),
      };

      const response = await axiosClient.post(
        "/routines/history",
        newHistoryObj
      );
      if (Number(response.status) !== 201) {
        throw new Error("Failed to update Routine_History");
      }
    } catch (error) {
      console.error("Failed to update Routine_History:", error);
    }
  };

  // Update user accumulated stats (minutes, calories)
  const updateUserAccumulatedStat = async () => {
    try {
      const now = new Date();
      const completedAt = format(now, "yyyy-MM-dd");
      const duration = Math.ceil((now - startedAtRef.current) / (1000 * 60));
      const response = await updateUserAccumulatedStats(
        user.id,
        completedAt,
        duration, // minutes
        Math.round(calorie)
      );
    } catch (error) {
      console.error("Failed to update User_Accumulated_Workout_Stats:", error);
    }
  };

  // Update user score
  const updateUserScore = async () => {
    try {
      let progress = await getUserProgress(user.id);
      if (!progress) {
        progress = { level_progress: 0 }; // Initialize with default values
      }
      const updatedProgress = {
        ...progress,
        level_progress: progress.level_progress + score,
      };
      const response = await updateUserProgress(user.id, updatedProgress);
    } catch (error) {
      console.error("Failed to update User_Progress:", error);
    }
  };

  // Earn badges based on user activity
  const earnBadges = async () => {
    try {
      // Badge 1: The first routine completion
      const response = await axiosClient.get(`/routines/history/${user.id}`);
      if (Number(response.status) !== 200) {
        throw new Error("Failed to fetch user accumulated stats");
      }

      if (response.data.data.length === 1) {
        const response = await addUserAchievement(
          user.id,
          1,
          new Date().toISOString()
        );
        const achievement = await getAchievement(1);
        // Send notification
        sendNotification({
          user_id: user.id,
          title: "New Achievement!",
          message:
            'You complete your first workout Routine and earned "Newbie No More".',
          icon_url: achievement.badge_url,
        });
      }

      // Badge 2: The first program completion
      // To be implemented.
    } catch (error) {
      console.error("Error earning badge:", error);
    }
  };

  // Start Rest Time Countdown
  const startRestCountdown = (breakType) => {
    setIsResting(true);
    if (breakType === "exercise") {
      setRestForNextExercise(true);
    } else if (breakType === "set") {
      setRestForSetIncrement(true);
    }
  };

  // End and hide Rest Time Countdown
  const endRestCountdown = (breakType) => {
    setIsResting(false);
    if (breakType === "exercise") {
      setRestForNextExercise(false);
    } else if (breakType === "set") {
      setRestForSetIncrement(false);
    }
  };

  // Move to the next exercise in the routine
  const moveToNextExercise = () => {
    if (selectedExerciseIndex + 1 < routine.length) {
      setSelectedExerciseIndex((prevIndex) => prevIndex + 1);

      // Start rest time after each exercise
      startRestCountdown("exercise");
    } else {
      // Automatically finish when the last exercise is completed
      handleFinishRoutine();
    }
  };

  // Clear posture detection landmarks and lines
  const clearCanvas = () => {
    const canvasElement = canvasRef.current;
    if (canvasElement) {
      const canvasCtx = canvasElement.getContext("2d");
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    }
  };

  const toggleIsResting = () => {
    setIsResting((prevIsResting) => !prevIsResting);
  };

  // Text to Speech
  const readoutText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  };

  // Display posture alert (Cue)
  let timeoutId;
  const updatePostureAlert = (alert) => {
    const now = Date.now();
    if (now - lastPostureAlertUpdate < 3000) {
      return;
    }

    if (timeoutId) clearTimeout(timeoutId);

    setPostureAlert(alert);
    setLastPostureAlertUpdate(now);

    timeoutId = setTimeout(() => {
      setPostureAlert("");
      setLastPostureAlertUpdate(Date.now());
    }, 3000);
  };

  // ---------------------------------------------------------
  //                      JSX Return
  // ---------------------------------------------------------

  return (
    <>
      {routine.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <CircularProgress color="inherit" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            height: "100vh",
            flexBasis: "100%",
            position: "relative",
            overflow: "hidden",
            backgroundColor: "background.paper",
          }}
        >
          {/* Rest screen before transitioning to the next exercise */}
          <DemoExercise
            trigger={restForNextExercise}
            duration={5}
            currentExerciseInfo={routine[selectedExerciseIndex]}
            nextExerciseInfo={routine[selectedExerciseIndex + 1]}
            onComplete={() => endRestCountdown("exercise")}
            skipExercise={moveToNextExercise}
            idType={idType}
          />

          {/* Rest screen before transitioning to the next set */}
          <RestTime2
            title="Time for resting"
            trigger={restForSetIncrement}
            duration={15}
            onComplete={() => endRestCountdown("set")}
          />

          {/* Webcam */}
          <video
            ref={videoRef}
            style={videoStyles}
            autoPlay
            playsInline
          ></video>
          {/* Black Gradient Overlay */}
          <div style={gradientStyles}></div>
          {/* Pose Landmarks */}
          <canvas ref={canvasRef} style={canvasStyles}></canvas>

          {/* Logo */}
          <Logo />

          {/* Quit Button */}
          <IconButton
            onClick={handleQuitRoutine}
            aria-label="close"
            sx={{
              // Layout and positioning
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 9000,
              // Box model
              padding: "0.5rem",
              // Visual effects
              fontSize: "2.5rem",
              color: restForNextExercise ? "black" : "white",
              "&:hover": {
                backgroundColor: restForNextExercise ? "white" : "#4F4F4F",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Quit Routine Session Dialogue */}
          <ExitRoutineSessionModal
            open={isConfirmDialogOpen}
            onClose={handleCancelQuit}
            onComplete={handleConfirmQuit}
          />

          {/* Cue */}
          <Typography
            sx={{
              position: "absolute",
              top: isLandscapeMode ? "60px" : "100px",
              left: "50%",
              transform: "translateX(-50%)",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
              fontSize: isLandscapeMode ? "1.5rem" : "2rem",
              color: "white",
            }}
          >
            {postureAlert}
          </Typography>

          {/* Exercise Counter */}
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              left: "100px",
              right: "100px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            }}
          >
            {idType === "routine" && (
              <>
                <Counter2
                  title={"Sets"}
                  count={successSetCount}
                  target={routine[selectedExerciseIndex]?.sets || 0}
                  onComplete={moveToNextExercise}
                />
                {/* Regarding increment Rep count, refer to "predictPosture" */}
                <Counter2
                  title={"Reps"}
                  count={successRepCount}
                  target={routine[selectedExerciseIndex]?.reps || 0}
                />
              </>
            )}
          </Box>

          {/* Bottom Menu */}
          <Box
            sx={{
              position: "absolute",
              bottom: "10px",
              width: "100%",
              height: isLandscapeMode ? "80px" : "120px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 20px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            }}
          >
            {/* Demo Image */}
            <Box
              component="img"
              src={routine[selectedExerciseIndex].image}
              alt="exercise image"
              sx={{
                width: "20%",
                height: isLandscapeMode ? "80px" : "120px",
                objectFit: "contain",
                backgroundColor: "rgba(255, 255, 255)",
                borderRadius: "15px",
                alignItems: "left",
              }}
            />

            {idType === "routine" && (
              <>
                {/* Calories */}
                <Box sx={{ minWidth: "85px" }}>
                  <MetricCard title="Kcal" value={calorie} />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                  {/* Pause & Play */}
                  <IconButton
                    onClick={toggleIsResting}
                    onMouseDown={(e) => e.preventDefault()}
                    style={{ fontSize: 50, color: "white" }}
                  >
                    {isResting ? (
                      <PlayCircleOutlineIcon style={{ fontSize: 50 }} />
                    ) : (
                      <PauseCircleOutlineIcon style={{ fontSize: 50 }} />
                    )}
                  </IconButton>

                  {/* Timer */}
                  <CountdownCircleTimer
                    key={`${selectedExerciseIndex}-${successSetCount}`}
                    isPlaying={!isResting}
                    duration={routine[selectedExerciseIndex]?.duration || 0}
                    size={isLandscapeMode ? 80 : 110}
                    strokeWidth={isLandscapeMode ? 6 : 8}
                    colors="white"
                    trailColor="transparent"
                    onComplete={incrementSetsCount}
                    onUpdate={handleIncrementCalorieAndScore}
                  >
                    {({ remainingTime }) => (
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: isLandscapeMode ? "3rem" : "4rem",
                          color: "white",
                        }}
                      >
                        {remainingTime >= 0 ? remainingTime : 0}
                      </Typography>
                    )}
                  </CountdownCircleTimer>

                  {/* Next Exercise */}
                  <IconButton
                    onClick={moveToNextExercise}
                    onMouseDown={(e) => e.preventDefault()}
                    style={{ fontSize: 50, color: "white" }}
                  >
                    <SkipNextOutlinedIcon style={{ fontSize: 50 }} />
                  </IconButton>
                </Box>

                {/* Score */}
                <Box sx={{ minWidth: "85px" }}>
                  <MetricCard title="Score" value={score} />
                </Box>

                {/* Exercise Menu */}
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    width: "20%",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      position: isExerciseMenuOpen ? "absolute" : "static",
                      width: "100%",
                    }}
                  >
                    <Typography
                      gutterBottom
                      onClick={handleToggleExerciseMenu}
                      sx={{
                        fontSize: isLandscapeMode ? "1rem" : "1.2rem",
                        fontWeight: "bold",
                        textAlign: "right",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        color: `white`,
                        cursor: "pointer",
                      }}
                    >
                      Next{" "}
                      {isExerciseMenuOpen ? (
                        <KeyboardArrowDownIcon sx={{ fontSize: "2rem" }} />
                      ) : (
                        <KeyboardArrowUpIcon sx={{ fontSize: "2rem" }} />
                      )}
                    </Typography>

                    <Box
                      className={"custom-scrollbar dark"}
                      sx={{
                        maxHeight: isExerciseMenuOpen ? "50vh" : "100px",
                        overflowY: "scroll",
                        transition: "max-Height 0.5s ease",
                        paddingRight: "0.5rem",
                      }}
                    >
                      <List
                        sx={{
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        {routine
                          .slice(selectedExerciseIndex)
                          .map((exercise, index) => (
                            <ListItem
                              key={index + selectedExerciseIndex}
                              sx={{
                                cursor: "default",
                                padding: "1rem 1.5rem",
                                margin: "0rem",
                                marginBottom: "0.5rem",
                                backgroundColor: "rgba(255, 255, 255, 0.6)",
                                borderRadius: "5px",
                              }}
                            >
                              <ListItemText
                                primary={exercise.name}
                                secondary={exercise.goal}
                                primaryTypographyProps={{
                                  sx: {
                                    fontSize: isLandscapeMode
                                      ? "0.8rem"
                                      : "1rem",
                                    fontWeight: "bold",
                                    color: "black",
                                    textShadow: "none",
                                  },
                                }}
                                secondaryTypographyProps={{
                                  sx: {
                                    fontSize: isLandscapeMode
                                      ? "0.8rem"
                                      : "1rem",
                                    color: "black",
                                    textShadow: "none",
                                  },
                                }}
                              />
                            </ListItem>
                          ))}
                      </List>
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Box>
      )}

      {/* Snack bar to display successful video upload  */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="File uploaded successfully!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        ContentProps={{
          style: {
            backgroundColor: "#FFFFFF",
            border: `1px solid theme.palette.primary.main`,
            color: theme.palette.primary.main,
            fontSize: "1rem",
            borderRadius: "8px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      />

      {/* Routine Completion Modal */}
      <CompleteRoutineSessionModal
        open={isFinished}
        onComplete={handleMoveToTrainingPage}
        mins={Math.ceil((new Date() - startedAtRef.current) / (1000 * 60))}
        calorie={calorie}
        score={score}
        videoURL={exerciseVideo}
        sessionType={idType}
      />
    </>
  );
};

// Defining prop types
RoutineSession.propTypes = {
  title: PropTypes.string,
};
