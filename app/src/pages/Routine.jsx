import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";
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
  Card,
  CardContent,
} from "@mui/material";
import { useAuth } from "../utils/AuthProvider.jsx";
import { supabase } from "../utils/supabaseClient.js";
import { setPageTitle } from "../utils/utils";
import { exerciseCounterLoader } from "../utils/exerciseLogic/exerciseCounterLoader";
import { default as server } from "../utils/ProxyServer.js";
import { AngleMeter } from "../components/AngleMeter.jsx";
import { CountDown } from "../components/CountDown.jsx";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

export const Routine = ({
  title = "Routine Session",
  routineId = "d6a5fb5e-976f-496b-9728-5b53ec305a37",
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseLandmarkerRef = useRef(null);
  const runningMode = useRef("VIDEO");
  const animationFrameIdRef = useRef(null);

  const [routine, setRoutine] = useState([]);
  const [exerciseCounter, setExerciseCounter] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [successCount, setSuccessCount] = useState(0);
  const [postureAlert, setPostureAlert] = useState(null);
  const [hipKneeAngle, setHipKneeAngle] = useState(180);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(true); //
  const [isFinished, setIsFinished] = useState(false);
  const [countDownTrigger, setCountDownTrigger] = useState(false);

  // Initialization
  // - Set Page Title
  // - Setup MediaPipe PoseLandmarker when component mounts
  // - Retrieve routine/program information from the database
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
        console.log(response);
        if (Number(response.status) !== 200) {
          throw new Error("Failed to fetch routine info");
        }
        console.log(response.data);
        setRoutine(transformRoutineData(response.data));
        console.log(routine);
      } catch (error) {
        console.error("Error fetching routine:", error);
      }
    };
    fetchRoutine();
  }, []);

  useEffect(() => {
    if (routine && routine.length > 0) {
      setSelectedExercise(routine[0]);
    }
  }, [routine]);

  // Dynamically load exercise counter class based on selected exercise
  useEffect(() => {
    console.log("Selected exercise:", selectedExercise);

    if (selectedExercise) {
      const CounterClass = exerciseCounterLoader[selectedExercise.name];
      if (CounterClass) {
        setExerciseCounter(new CounterClass());
        console.log("Exercise counter is loaded.");

        // Start countdown when exercise changes
        startCountdown();
      } else {
        setExerciseCounter(null);
        console.log("Exercise counter is not implemented.");
      }
    } else {
      setExerciseCounter(null);
      console.log("Exercise counter is not implemented.");
    }
  }, [selectedExercise]);

  // Transform routine data format for display
  const transformRoutineData = (routineData) => {
    return routineData.map((item) => {
      let durationString;
      if (item.reps > 0) {
        durationString = `${item.sets} sets of ${item.reps} reps`;
      } else if (item.duration) {
        durationString = `${item.duration / 1000} seconds`;
      } else {
        durationString = `${item.sets} sets`;
      }

      return {
        name: item.Exercise.name,
        duration: durationString,
        image: item.Exercise.demo_url,
      };
    });
  };

  // Ttrack webcamRunning changes
  useEffect(() => {
    if (exerciseCounter && webcamRunning) {
      predictWebcam(); // Start prediction when webcam is running
    }

    // Cleanup
    return () => {
      if (animationFrameIdRef.current) {
        window.cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [exerciseCounter, webcamRunning]); // This effect runs when webcamRunning changes

  const enableCam = async () => {
    if (!poseLandmarkerRef.current) {
      console.error("PoseLandmarker not loaded.");
      return;
    }

    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    if (webcamRunning) {
      // Stop webcam
      const stream = videoElement.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoElement.srcObject = null;
      setWebcamRunning(false); // Update state
      console.log("Webcam disabled");

      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    } else {
      // Start webcam
      const constraints = { video: true };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = stream;
        videoElement.addEventListener("loadeddata", () => {
          console.log(
            "Webcam video loaded:",
            videoElement.videoWidth,
            videoElement.videoHeight
          );
          setWebcamRunning(true); // Update state
        });
      } catch (error) {
        console.error("Error accessing the webcam: ", error);
      }
    }
  };

  // Perform posture detection on webcam feed
  const predictWebcam = async () => {
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

    // if (runningMode.current === "IMAGE") {
    //   runningMode.current = "VIDEO";
    //   await poseLandmarkerRef.current.setOptions({ runningMode: "VIDEO" });
    // }

    const startTimeMs = performance.now();

    try {
      const results = await poseLandmarkerRef.current.detectForVideo(
        videoElement,
        startTimeMs
      );

      // Canvas for drawing pose landmarks
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      if (results && results.landmarks && results.landmarks.length > 0) {
        // Count exercise using exerciseCounter
        const { count = 0, alert = null } =
          exerciseCounter?.processPose(results.landmarks[0]) || {};

        // Update success count
        if (count !== undefined) {
          setSuccessCount((prevSuccessCount) => {
            if (count !== prevSuccessCount) {
              return count;
            }
            return prevSuccessCount;
          });

          // Update angle for the meter
          const angle = exerciseCounter?.getAngle(results.landmarks[0]);
          if (angle !== undefined) {
            setHipKneeAngle(Math.round(angle));
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

        // Draw pose landmarks and connections
        drawingUtils.drawConnectors(
          results.landmarks[0],
          PoseLandmarker.POSE_CONNECTIONS
        );

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
          canvasCtx.fillText(`ID ${index}`, x, y);
        });
      }
    } catch (error) {
      console.error("Error during pose detection:", error);
    }

    // Continue predictions as long as webcam is running
    if (webcamRunning) {
      animationFrameIdRef.current = window.requestAnimationFrame(predictWebcam);
    }
  };

  // Read out the count
  useEffect(() => {
    if (successCount !== 0) {
      const utterance = new SpeechSynthesisUtterance(`${successCount}`);
      window.speechSynthesis.speak(utterance);
    }
  }, [successCount]);

  // Read out the alert
  useEffect(() => {
    if (postureAlert) {
      const utterance = new SpeechSynthesisUtterance(`${postureAlert}`);
      window.speechSynthesis.speak(utterance);
    }
  }, [postureAlert]);

  const startRecording = () => {
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
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
      setIsRecording(false);
      console.log("Recording stopped");
    }
  };

  const uploadToSupabase = async () => {
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
        setRecordedChunks([]);
        console.log("File uploaded successfully:", data);

        // Show Snackbar
        setIsSnackbarOpen(true);
      }
    }
  };

  const handleClose = () => {
    setIsSnackbarOpen(false);
  };

  const downloadRecording = () => {
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

  // Handle camera consent dialog response
  const handleAgree = async () => {
    setIsDialogOpen(false);
    enableCam();
  };

  const handleDisagree = () => {
    navigate(-1); // Navigate back to previous page
  };

  const startCountdown = () => {
    setCountDownTrigger(true);
  };

  const handleCountDownComplete = () => {
    setCountDownTrigger(false);
  };

  // MEMO: Need to confirm history table definition & APIs
  const finishRoutine = () => {
    // Disable webcam
    if (webcamRunning) enableCam();

    // Retrieve routine/program information from the database
    const registerHistory = async () => {
      try {
        const completedAt = new Date().toISOString();
        const newHitoryObj = {
          user_id: user.id,
          created_at: completedAt,
          routine_id: routineId,
          program_id: null,
          recording_URL: null,
          description: null,
        };
        const response = await server.add("History", newHitoryObj);
        console.log(response);
        if (Number(response.status) !== 201) {
          throw new Error("Failed to insert history info");
        }
        console.log(response.data);
      } catch (error) {
        console.error("Error inserting history info:", error);
      }
    };
    registerHistory();

    setIsFinished(true);
  };

  const goBackToTrainingPage = () => {
    setIsFinished(false);
    navigate("/dashboard");
  };

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
            Are you ready to start?
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ color: "#fff", mb: 4 }}>
              We need access to your web camera to proceed. Do you agree?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDisagree}
              color="secondary"
              variant="outlined"
              sx={{ marginRight: 2 }}
            >
              No
            </Button>
            <Button onClick={handleAgree} color="primary" variant="contained">
              Yes
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

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
            {/* Countdown */}
            <CountDown
              trigger={countDownTrigger}
              onComplete={handleCountDownComplete}
            />
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
                position: "absolute",
                top: "20px",
                right: "20px",
                bottom: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              {/* Counter - Height 30% */}
              <Card
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  flexGrow: 0,
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Count
                  </Typography>
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {successCount}
                  </Typography>
                </CardContent>
              </Card>

              {/* Angle Meter - Height 70% */}
              <Card
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  flexGrow: 0,
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Angle Meter
                  </Typography>
                  <AngleMeter angle={hipKneeAngle} />
                </CardContent>
              </Card>
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
              My Exercise Routine
            </Typography>
            {selectedExercise && selectedExercise.image && (
              <Box
                component="img"
                src={selectedExercise.image}
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
                    button="true"
                    key={index}
                    onClick={() => setSelectedExercise(exercise)}
                    sx={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedExercise === exercise
                          ? "rgba(0, 0, 255, 0.1)"
                          : "inherit",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 255, 0.2)",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <FitnessCenterIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={exercise.name}
                      secondary={exercise.duration}
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
            <Button variant="contained" onClick={enableCam}>
              {webcamRunning ? "DISABLE WEBCAM" : "ENABLE WEBCAM"}
            </Button>
            <Button
              variant="contained"
              onClick={startRecording}
              disabled={isRecording || !webcamRunning}
            >
              START RECORDING
            </Button>
            <Button
              variant="contained"
              onClick={stopRecording}
              disabled={!isRecording}
            >
              STOP RECORDING
            </Button>
            <Button
              variant="contained"
              onClick={uploadToSupabase}
              disabled={recordedChunks.length === 0}
            >
              UPLOAD TO STORAGE
            </Button>
            <Button
              variant="contained"
              onClick={downloadRecording}
              disabled={recordedChunks.length === 0}
            >
              DOWNLOAD
            </Button>
            <Button variant="contained" onClick={finishRoutine}>
              FINISH ROUTINE
            </Button>
            <Snackbar
              open={isSnackbarOpen}
              autoHideDuration={3000}
              onClose={handleClose}
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
          </Stack>
        </Box>
      </Stack>

      {/* Congratulations Modal */}
      <Dialog
        open={isFinished}
        onClose={() => setIsFinished(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You have successfully completed the routine!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={goBackToTrainingPage}>
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
  routineId: PropTypes.string, // Expecting a UUID string
};
