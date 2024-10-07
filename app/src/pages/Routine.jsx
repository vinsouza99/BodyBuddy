import PropTypes from "prop-types";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PoseLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";
import { Counter, AngleMeter, Timer, RestTime } from "../components/routine-session";
import {
  Box,
  Button,
  Stack,
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
} from "@mui/material";
import { useAuth } from "../utils/AuthProvider.jsx";
import { supabase } from "../utils/supabaseClient.js";
import { setPageTitle } from "../utils/utils";
import { exerciseCounterLoader } from "../utils/motionDetectLogic/exerciseCounterLoader.js";
import { default as server } from "../utils/ProxyServer.js";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"; // Can be replaced later

export const Routine = ({title = "Routine Session"}) => {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // For session management
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
  const [isDialogOpen, setIsDialogOpen] = useState(true); //
  const [isFinished, setIsFinished] = useState(false);
  const [isResting, setIsResting] = useState(true);
  const [restForSetIncrement, setRestForSetIncrement] = useState(false);
  const [restForNextExercise, setRestForNextExercise] = useState(false);

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
    const fetchRoutine = async () => {
      try {
        const response = await server.get(
          "RoutineExercises/routine",
          routineId
        );
        if (Number(response.status) !== 200) {
          throw new Error("Failed to fetch routine info");
        }
        setRoutine(createRoutineTimeSchedule(response.data));
      } catch (error) {
        console.error("Error fetching routine:", error);
      }
    };
    fetchRoutine();
  }, []);

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

  // Ttrack webcamRunning changes
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

  // Enable webcam when consent dialog is closed
  useEffect(() => {
    if (!isDialogOpen) {
      toggleWebCam();
    }
  }, [isDialogOpen]);

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

  // Handle camera consent dialog response （Agree）
  const handleAgreeWebCamConsent = async () => {
    setIsDialogOpen(false);
  };

  // Handle camera consent dialog response (Disagree)
  const handleDisagreeWebCamConsent = () => {
    handleMoveToTrainingPage();
  };

  // Handle quitting the routine
  const handleQuitRoutine = () => {
    // Disable Webcam
    if (webcamRunning) toggleWebCam();
    handleMoveToTrainingPage();
  };

  // Handle finishing the routine (Insert log info to the database)
  const handleFinishRoutine = () => {
    // Disable Webcam
    if (webcamRunning) toggleWebCam();

    // Retrieve routine/program information from the database
    const registerHistory = async () => {
      try {
        const completedAt = new Date().toISOString();
        const newHitoryObj = {
          user_id: user.id,
          created_at: completedAt,
          routine_id: routineId,
          program_id: null,
          recording_URL: exerciseVideo,
          description: null,
        };
        const response = await server.add("Log", newHitoryObj);
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
    if (!poseLandmarkerRef.current) {
      console.error("PoseLandmarker not loaded.");
      return;
    }
  
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
          PoseLandmarker.POSE_CONNECTIONS
        );
        // Draw pose landmarks
        drawingUtils.drawLandmarks(results.landmarks[0], {
          radius: (data) => {
            return DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1);
          },
          color: (data) => {
            return data.index === 0 ? "green" : "green";
          },
        });
        results.landmarks[0].forEach((landmark, index) => {
          const x = landmark.x * canvasElement.width;
          const y = landmark.y * canvasElement.height;

          canvasCtx.font = "10px Roboto";
          canvasCtx.fillStyle = "blue";
          canvasCtx.fontWeight = "bold";
          canvasCtx.fillText(`${index}`, x, y);
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
      {/* Camera Consent Dialog */}
      <Dialog
        open={isDialogOpen}
        fullScreen
        PaperProps={{
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
          }}
        >
          <DialogTitle sx={{ color: "#fff", fontSize: "2rem" }}>
            We need access to your web camera to proceed. Do you agree?
          </DialogTitle>
          <DialogContent>
            <Box sx={{ color: "#fff", mb: 4, p: 2, backgroundColor: "rgba(0, 0, 0, 0.6)", borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
                To ensure the AI functions correctly, please follow these instructions:
              </Typography>
              <List sx={{ listStyleType: 'disc', pl: 3 }}>
                <ListItem sx={{ display: 'list-item', pl: 0, mb: 2 }}>
                  <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    Maintain a distance that allows your entire body, from head to toe, to be visible on the screen.
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: 'list-item', pl: 0 }}>
                  <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    Ensure that no other people are visible on the screen.
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDisagreeWebCamConsent}
              color="secondary"
              variant="outlined"
              sx={{ marginRight: 2 }}
            >
              No
            </Button>
            <Button onClick={handleAgreeWebCamConsent} color="primary" variant="contained">
              Yes
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* After the above dialog closes, start rendering */}
      {!isDialogOpen && (
        <Stack sx={{ height: "100vh", backgroundColor: "background.default" }}>
          <Stack direction="row" sx={{ flex: 1, overflow: "hidden" }}>
            <Box
              sx={{
                flexBasis: "70%",
                position: "relative",
                overflow: "hidden",
                backgroundColor: "background.paper",
              }}
            >
              {/* Are you ready? */}
              <RestTime title="Are you ready?" trigger={true} duration={10} onComplete={() => setIsResting(false)} />
              {/* Rest Time Countdown for sets increment */}
              <RestTime trigger={restForSetIncrement} duration={routine[selectedExerciseIndex]?.rest_time || 0} onComplete={() => endRestCountdown("set")} />
              {/* Rest Time Countdown for moving to next exercise */}
              <RestTime trigger={restForNextExercise} duration={20} onComplete={() => endRestCountdown("exercise")} />
              {/* Webcam */}
              <video
                ref={videoRef}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                }}
                autoPlay
                playsInline
              ></video>
              {/* Pose Landmarks */}
              <canvas
                ref={canvasRef}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              ></canvas>

              <Box
                sx={{
                  width: "150px",
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  bottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* When Counter(Sets) reached the target, move to the next exercise. */}
                <Counter title={"Sets"} count={successSetCount} target = {routine[selectedExerciseIndex]?.sets || 0} onComplete={moveToNextExercise} />
                <Counter title={"Reps"} count={successRepCount} target = {routine[selectedExerciseIndex]?.reps || 0} /> {/* Regarding increment Rep count, refer to "predictPosture" */}
                <Timer title={"Duration"} duration={routine[selectedExerciseIndex]?.duration || 0} onComplete = {incrementSetsCount} disabled={isResting} />
                <AngleMeter title={"Angle"} angle={angle} />
              </Box>

            </Box>
            <Box
              sx={{
                flexBasis: "30%",
                padding: 1,
                display: "flex",
                flexDirection: "column",
                maxHeight: "100%",
                backgroundColor: "background.paper",
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
              >
                Routine Menu
              </Typography>
              {routine[selectedExerciseIndex] && routine[selectedExerciseIndex].image && (
                <Box
                  component="img"
                  src={routine[selectedExerciseIndex].image}
                  alt="exercise image"
                  sx={{
                    width: "100%",
                    height: "350px",
                    objectFit: "cover",
                    mb: 3,
                    flexShrink: 0,
                  }}
                />
              )}
              <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                <List>
                  {routine.map((exercise, index) => (
                    <ListItem
                      // button="true"
                      // onClick={() => setSelectedExerciseIndex(index)}
                      key={index}
                      sx={{
                        // cursor: "pointer",
                        cursor: "default",
                        backgroundColor:
                          selectedExerciseIndex === index
                            ? "rgba(0, 0, 255, 0.1)"
                            : "inherit",
                      }}
                    >
                      <ListItemIcon>
                        <FitnessCenterIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={exercise.name}
                        secondary={exercise.goal}
                        primaryTypographyProps={{
                          sx: { fontSize: "1.5rem", fontWeight: "bold" },
                        }}
                        secondaryTypographyProps={{ sx: { fontSize: "1.2rem" } }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Stack>

          { /* Control Buttons */}
          <Box
            sx={{
              padding: 2,
              backgroundColor: "background.paper",
              textAlign: "center",
              borderTop: 1,
              borderTopColor: "divider",
              borderTopStyle: "solid",
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Button 
                variant="contained" 
                onClick={toggleWebCam}
              >
                {webcamRunning ? "DISABLE WEBCAM" : "ENABLE WEBCAM"}
              </Button>
              <Button
                variant="contained" 
                onClick={toggleRecording}
                disabled={!webcamRunning}
              >
                {isRecording ? "STOP RECORDING" : "START RECORDING"}
              </Button>
              <Button
                variant="contained"
                onClick={handleUploadRecording}
                disabled={recordedChunks.length === 0}
              >
                UPLOAD TO STORAGE
              </Button>
              <Button
                variant="contained"
                onClick={handleDownloadRecording}
                disabled={recordedChunks.length === 0}
              >
                DOWNLOAD
              </Button>
              <Button variant="contained" onClick={handleQuitRoutine}>
                QUIT ROUTINE
              </Button>
            </Stack>
          </Box>
        </Stack>
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
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>You have successfully completed the routine!</DialogTitle>
        <DialogContent>
          {routine && routine.length > 0 && (
            <Box>
              <Typography variant="h6">Completed Exercises:</Typography>
              <List>
                {routine.map((exercise, index) => (
                  exercise.name !== "Break" && (
                    <ListItem key={index}>
                      <ListItemText primary={exercise.name} />
                    </ListItem>
                  )
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleMoveToTrainingPage}>
            Go Back to Training Page
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Defining prop types
Routine.propTypes = {
  title: PropTypes.string,
};
