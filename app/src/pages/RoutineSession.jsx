// Reat and Material-UI
import PropTypes from "prop-types";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
// Custom Components for Routine Session
import { PoseLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";
import { Counter2, AngleMeter2, RestTime2, MetricCard, DemoExercise, Logo } from "../components/routine-session";
import { exerciseCounterLoader } from "../utils/motionDetectLogic/exerciseCounterLoader.js";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
// Common Components
import { useAuth } from "../utils/AuthProvider.jsx";
import { useTheme } from '@mui/material/styles';
import { supabase } from "../utils/supabaseClient.js";
import axiosClient from '../utils/axiosClient';
import { setPageTitle } from "../utils/utils";
// Icons & Images
import CloseIcon from "@mui/icons-material/Close";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BodyBuddy from "../assets/bodybuddy_logo_color.svg";
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

export const RoutineSession = ({title = "Routine Session"}) => {
  const theme = useTheme();
  const { user } = useAuth(); // For session management
  const { routineId } = useParams();
  const navigate = useNavigate();
  const angleChangeThreshold = 3;
  let previousAngle = null;

  // --- State ---
  const [routine, setRoutine] = useState([]);
  const [exerciseVideo, setExerciseVideo] = useState(null);
  const [exerciseCounter, setExerciseCounter] = useState(null);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const [successSetCount, setSuccessSetCount] = useState(0);
  const [successRepCount, setSuccessRepCount] = useState(0);
  const [postureAlert, setPostureAlert] = useState(null);
  const [angle, setAngle] = useState(180);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isResting, setIsResting] = useState(true);
  const [restForSetIncrement, setRestForSetIncrement] = useState(false);
  const [restForNextExercise, setRestForNextExercise] = useState(true);

  // --- Refs ---
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseLandmarkerRef = useRef(null);
  const runningMode = useRef("VIDEO");
  const animationFrameIdRef = useRef(null);

  // !!! FOR RE-RENDERTING TEST !!!
  // useEffect(() => {
  //   console.log("Rendering Test: Routine Component");
  // });
  // useEffect(() => {
  //   console.log("Rendering Test: angle");
  // }, [angle]);


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

    // Retrieve routine/program information from the database
    const fetchRoutineInfo = async () => {
      try {
        const response = await axiosClient.get(
          `RoutineExercises/routine/${routineId}`
        );
        if (Number(response.status) !== 200) {
          throw new Error("Failed to fetch routine info");
        }
        console.log(response.data);
        setRoutine(createRoutineTimeSchedule(response.data.data));
      } catch (error) {
        console.error("Error fetching routine:", error);
      }
    };
    fetchRoutineInfo();
  }, []);

  // Enable webcam when videoRef is available
  useEffect(() => {
    if (videoRef.current) {
      toggleWebCam();
    }

    // Cleanup
    return () => {
      // Disable Webcam
      if (webcamRunning) toggleWebCam();
    };
  }, [videoRef.current]);

  // Reset selected exercise index when routine changes
  useEffect(() => {
    if (routine && routine.length > 0) {
      setSelectedExerciseIndex(0);
    }
  }, [routine]);

  // Dynamically load exercise counter class based on selected exercise
  useEffect(() => {
    console.log("Selected exercise:", routine[selectedExerciseIndex]);

    // Reset success count when exercise changes
    setSuccessRepCount(0);
    setSuccessSetCount(0);
    
    // Load exercise counter based on the selected exercise
    const selectedExercise = routine[selectedExerciseIndex]
    const CounterClass = loadExerciseCounter(selectedExercise);
    setExerciseCounter(CounterClass);
  }, [selectedExerciseIndex, routine]);

  // Start prediction when webcam is running and not resting
  useEffect(() => {
    console.log(exerciseCounter, webcamRunning, isResting);
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
      readoutText(`Great Job!`);
    }
  }, [successSetCount]);

  // Read out the alert
  useEffect(() => {
    if (postureAlert) {
      readoutText(postureAlert);
    }
  }, [postureAlert]);

  
  // ---------------------------------------------------------
  //                      Event Handlers
  // ---------------------------------------------------------

  // Upload recording to Supabase Storage
  const handleUploadRecording = async () => {
    const supabaseStorageUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL;
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const fileName = `recorded_video_${Date.now()}.webm`;

      const { data, error } = await supabase.storage
        .from("Training Videos")
        .upload(fileName, blob, {
          contentType: "video/webm",
        });

      if (error) {
        console.error("Error uploading file:", error);
      } else {
        console.log("File uploaded successfully:", data);
        console.log("Public URL:", `${supabaseStorageUrl}${fileName}`);
        setExerciseVideo(`${supabaseStorageUrl}${fileName}`);
        setRecordedChunks([]);

        // Show Snackbar
        setIsSnackbarOpen(true);
      }
    }
  };

  // Download recording
  const handleDownloadRecording = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recorded_video.webm";
      document.body.appendChild(a);
      a.click();
      setRecordedChunks([]);
      console.log("Recording downloaded");
    }
  };

  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  // Handle quitting the routine
  const handleQuitRoutine = () => {
    // Diablog for confirmation
    setIsConfirmDialogOpen(true)
  };
  const handleConfirmQuit = () => {
    setIsConfirmDialogOpen(false);
    // Disable Webcam
    if (webcamRunning) toggleWebCam();
    handleMoveToTrainingPage();
  };
  const handleCancelQuit = () => {
    setIsConfirmDialogOpen(false);
  };

  // Handle finishing the routine (Insert log info to the database)
  const handleFinishRoutine = () => {
    // Disable Webcam
    if (webcamRunning) toggleWebCam();

    // Retrieve routine/program information from the database
    const registerHistory = async () => {
      try {
        const completedAt = new Date().toISOString();
        const newHistoryObj = {
          user_id: user.id,
          created_at: completedAt,
          routine_id: routineId,
          program_id: null,
          recording_URL: exerciseVideo,
          description: null,
        };
        // const response = await server.add("Log", newHitoryObj);
        const response = await axiosClient.post("Log", newHistoryObj);
        console.log(response);
        if (Number(response.status) !== 201) {
          throw new Error("Failed to insert log info");
        }
        console.log(response.data);
      } catch (error) {
        console.error("Error inserting log info:", error);
      }
    };
    registerHistory();
    setIsFinished(true);
  };

  // Handle moving to the training page
  const handleMoveToTrainingPage = () => {
    navigate("/training");
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
        name: item.Exercise.name,
        goal: goalString,
        sets: item.sets ? item.sets : 0,
        reps: item.reps ? item.reps : 0,
        duration: item.duration ? (item.duration / 1000) : 0,
        rest_time: (item.rest_time / 1000) ? (item.rest_time / 1000) : 0,
        image: item.Exercise.demo_url,
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
    // if (!poseLandmarkerRef.current) {
    //   console.error("PoseLandmarker not loaded.");
    //   return;
    // }
  
    const videoElement = videoRef.current;
    const constraints = { video: true };
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoElement.srcObject = stream;
      videoElement.addEventListener("loadeddata", () => {
        setWebcamRunning(true); // Update state
        console.log("Webcam enabled");
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
      tracks.forEach(track => {
        track.stop();
        stream.removeTrack(track); // This might be not needed, but just in case.
      });

      videoElement.srcObject = null;
      setWebcamRunning(false);
      clearCanvas();
      console.log("Webcam disabled");
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

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      console.log("Recording started");
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
      console.log("Recording stopped");
    }
  }, [mediaRecorder, setMediaRecorder, setIsRecording]);

  // Load exercise counter based on the selected exercise
  const loadExerciseCounter = (selectedExercise) => {
    if (selectedExercise) {
      const CounterClass = exerciseCounterLoader[selectedExercise.name];
      if (CounterClass) {
        console.log("Exercise counter is loaded.", selectedExercise.name);
        return new CounterClass();
      } else {
        console.error("Exercise counter is not implemented for:", selectedExercise.name);
        return null;
      }
    } else {
      console.error("Selected exercise is not valid.");
      return null;
    }
  }

  // Perform posture detection on webcam feed and count reps
  const predictPosture = async () => {
    // Skip posture detection during rest time
    if (isResting) {
      console.log("Rest time. Skipping posture detection.");
      return;
    }

    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    const drawingUtils = new DrawingUtils(canvasCtx);

    // Check if video element is available
    if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
      console.log("Video element not available or has been stopped.");
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
        const { count = 0, alert = null } =
          exerciseCounter?.processPose(results.landmarks[0]) || {};

        // Update success count
        if (count !== undefined) {
          setSuccessRepCount((prevSuccessRepCount) => {
            if (count !== prevSuccessRepCount) {
              // When the rep count reaches the target, increment the set count
              if (count >= routine[selectedExerciseIndex].reps
                && routine[selectedExerciseIndex].reps !== 0
              ) {
                // Count up the set count
                incrementSetsCount();

                // Reset count for next set
                exerciseCounter.resetCount(); 

                // Rest time after each set (except for the final set)
                if (successSetCount + 1 < routine[selectedExerciseIndex].sets) {
                  startRestCountdown("set");
                }

                // Reset rep count
                return 0;
              }
              // Count up the rep count
              return count;
            }
            return prevSuccessRepCount;
          });

          // Update angle for the meter when the angle diff over the "threshold"
          const angle = exerciseCounter?.getAngle(results.landmarks[0]);
          if (angle !== undefined && Math.abs(angle - previousAngle) > angleChangeThreshold) {
            setAngle(Math.round(angle));
            previousAngle = angle;
          }
        }

        // Update alert if any posture issue
        if (alert !== undefined) {
          setPostureAlert((prevAlert) => {
            if (alert !== prevAlert) {
              return alert;
            }
            return prevAlert;
          });
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
            return data.index === 0 ? `${theme.palette.primary.main}` : `${theme.palette.primary.main}`;
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
      animationFrameIdRef.current = window.requestAnimationFrame(predictPosture);
    }
  };

  // Increment the success set count by reps or duration
  const incrementSetsCount = useCallback(() => {
    setSuccessSetCount((prevSuccessSetCount) => prevSuccessSetCount + 1);
  }, []);

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
  function readoutText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }

  // ---------------------------------------------------------
  //                      JSX Return
  // ---------------------------------------------------------

  return (
    <>
      {routine.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Typography variant="h4">Loading...</Typography>
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
          />

          {/* Rest screen before transitioning to the next set */}
          <RestTime2
            title = "Time for resting"
            trigger={restForSetIncrement}
            duration={routine[selectedExerciseIndex]?.rest_time || 0} 
            onComplete={() => endRestCountdown("set")}
          />

          {/* Webcam */}
          <video ref={videoRef} style={videoStyles} autoPlay playsInline></video>

          {/* Pose Landmarks */}
          <canvas ref={canvasRef} style={canvasStyles}></canvas>

          {/* Logo */}
          <Logo/>

          {/* Quit Button */}
          <IconButton 
            onClick={handleQuitRoutine} 
            aria-label="close"
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 1000,
              fontSize: '2.5rem',
              color: 'white',
              backgroundColor: 'lightgray',
              padding: '0.5rem',
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: 'darkgray',
              }
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Quit Dialogue */}
          <Dialog
            open={isConfirmDialogOpen}
            onClose={handleCancelQuit}
            fullWidth
            maxWidth="sm"
            sx={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          >
            <DialogTitle sx={{ textAlign: 'center' }}>
              <ErrorOutlineIcon style={{ fontSize: 50 }} />
              <IconButton
                aria-label="close"
                onClick={handleCancelQuit}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                width: '70%',
                margin: '0 auto',
                fontSize: '1.2rem',
              }}
            >
              <p>You haven&apos;t completed the routine yet. Save progress and continue later?</p>
            </DialogContent>
            <DialogActions
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '60%',
                margin: '0 auto',
                gap: 2,
                marginBottom: '2rem',
              }}
            >
              <Button variant="outlined" color="secondary" sx={{ fontSize: '1.2rem' }} fullWidth disabled>
                Save and continue later
              </Button>
              <Button variant="contained" onClick={handleConfirmQuit} color="primary" sx={{ fontSize: '1.2rem' }} fullWidth>
                Exit
              </Button>
            </DialogActions>
          </Dialog>

          {/* Exercise Counter */}
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              left: '100px',
              right: '100px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            <AngleMeter2 title={"Angle"} angle={angle} />
            <Counter2 title={"Reps"} count={successRepCount} target = {routine[selectedExerciseIndex]?.reps || 0} /> {/* Regarding increment Rep count, refer to "predictPosture" */}
            <Counter2 title={"Sets"} count={successSetCount} target = {routine[selectedExerciseIndex]?.sets || 0} onComplete={moveToNextExercise} />
          </Box>
          
          {/* Bottom Menu */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '10px',
              width: '100%',
              height: '200px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 20px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Demo Image */}
            <Box
              component="img"
              src={routine[selectedExerciseIndex].image}
              alt="exercise image"
              sx={{
                width: '20%',
                height: '200px',
                objectFit: 'contain',
                backgroundColor: 'rgba(255, 255, 255)',
                borderRadius: '15px',
                alignItems: 'left',
              }}
            />

            {/* Calories */}
            <MetricCard title="Calories" />

            {/* Puase & Play */}
            <IconButton 
              onClick={toggleIsResting}
              onMouseDown={(e) => e.preventDefault()}
              style={{ fontSize: 50 }}>
              {isResting ? (
                <PlayCircleOutlineIcon style={{ fontSize: 50 }} />
              ) : (
                <PauseCircleOutlineIcon style={{ fontSize: 50 }} />
              )}
            </IconButton>

            {/* Timer */}
            <CountdownCircleTimer
              key={selectedExerciseIndex} // To reset timer when exercise changes
              isPlaying={!isResting}
              duration={routine[selectedExerciseIndex]?.duration || 0} 
              colors={theme.palette.secondary.main}
              onComplete={incrementSetsCount}
            >
              {({ remainingTime }) => (
                <Typography
                  variant="h1"
                  component="div"
                  sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}
                >
                  {remainingTime >= 0 ? remainingTime : 0} 
                </Typography>
              )}
            </CountdownCircleTimer>                  

            {/* Next Exercise */}
            <IconButton 
              onClick={moveToNextExercise}
              onMouseDown={(e) => e.preventDefault()}
              style={{ fontSize: 50 }}>
              <SkipNextOutlinedIcon style={{ fontSize: 50 }} />
            </IconButton>

            {/* Score */}
            <MetricCard title="Score" />

            {/* Exercise Menu */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                width: '20%',
                height: '100%',
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  textAlign: "left",
                  color: `${theme.palette.secondary.main}`,
                }}
              >
                Next ＞
              </Typography>
              <Box 
                sx={{ 
                  height: '100%',
                  overflowY: "auto",
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
                          color: index === 0 ? "white" : "black",
                          backgroundColor:
                            index === 0
                              ? `${theme.palette.secondary.main}`
                              : "inherit",
                          opacity: index === 0 ? 0.6 : 1,
                        }}
                      >
                        <ListItemIcon>
                          <FitnessCenterIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={exercise.name}
                          secondary={exercise.goal}
                          primaryTypographyProps={{
                            sx: {
                              fontSize: "1.0rem",
                              fontWeight: "bold",
                            },
                          }}
                          secondaryTypographyProps={{
                            sx: { 
                              fontSize: "1.0rem",
                              color: index === 0 ? "white" : "black",
                            }
                          }}
                        />
                      </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
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
            backgroundColor: "#4CAF50",
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: "1.2rem",
            borderRadius: "8px",
          },
        }}
      />

      {/* Routine Completion Modal */}
      <Dialog
        open={isFinished}
        onClose={() => setIsFinished(false)}
        fullScreen
      >
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '50%',
            margin: '0 auto',
          }}
        >
          <Box
            component="img"
            src={BodyBuddy}
            alt="Completed Exercise"
            sx={{
              maxHeight: '300px',
              objectFit: 'contain',
              marginBottom: 4,
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'normal', marginBottom: 4, textAlign: 'center' }}>
            Yay! You&apos;ve completed exercising. <br />
            Let&apos;s see what you&apos;ve achieved today!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
            <MetricCard title="Mins" />
            <MetricCard title="Calories" />
            <MetricCard title="Score" />
          </Box>
          <Button variant="outlined" sx={{ width: '50%', marginBottom: 2, fontSize: '1.2rem' }} disabled>
            Check my upcoming schedule
          </Button>
          <Button variant="contained" sx={{ width: '50%', fontSize: '1.2rem'}} onClick={handleMoveToTrainingPage}>
            Go Back to Training Page
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Defining prop types
RoutineSession.propTypes = {
  title: PropTypes.string,
};
