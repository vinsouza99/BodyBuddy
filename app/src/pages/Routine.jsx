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
} from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { supabase } from "../supabaseClient";
import { setPageTitle } from "../utils";
import { default as server } from "../ProxyServer.js";

// !!! The following images are used tentatively for prototype purposes !!!
import squat from "../assets/squat.gif";
import plunk from "../assets/plunk.gif";
import pushup from "../assets/pushup.gif";
import lunge from "../assets/lunge.gif";
const sampleExerciseImages = [squat, plunk, pushup, lunge];

// For Mediapipe Pose Detection
// const landmarkNames = [
//   "NOSE",
//   "LEFT_EYE_INNER",
//   "LEFT_EYE",
//   "LEFT_EYE_OUTER",
//   "RIGHT_EYE_INNER",
//   "RIGHT_EYE",
//   "RIGHT_EYE_OUTER",
//   "LEFT_EAR",
//   "RIGHT_EAR",
//   "MOUTH_LEFT",
//   "MOUTH_RIGHT",
//   "LEFT_SHOULDER",
//   "RIGHT_SHOULDER",
//   "LEFT_ELBOW",
//   "RIGHT_ELBOW",
//   "LEFT_WRIST",
//   "RIGHT_WRIST",
//   "LEFT_PINKY",
//   "RIGHT_PINKY",
//   "LEFT_INDEX",
//   "RIGHT_INDEX",
//   "LEFT_THUMB",
//   "RIGHT_THUMB",
//   "LEFT_HIP",
//   "RIGHT_HIP",
//   "LEFT_KNEE",
//   "RIGHT_KNEE",
//   "LEFT_ANKLE",
//   "RIGHT_ANKLE",
//   "LEFT_HEEL",
//   "RIGHT_HEEL",
//   "LEFT_FOOT_INDEX",
//   "RIGHT_FOOT_INDEX",
// ];

export const Routine = ({ title = "Routine Session", routineId = "d6a5fb5e-976f-496b-9728-5b53ec305a37" }) => {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseLandmarkerRef = useRef(null);
  const runningMode = useRef("IMAGE");
  // const lastUpdateRef = useRef(0);

  // const [landmarkData, setLandmarkData] = useState([]);
  const [routine, setRoutine] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(true); // 
  const [isFinished, setIsFinished] = useState(false);

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
        const response = await server.get("RoutineExercises/routine", routineId)
        console.log(response);
        if (Number(response.status) !== 200) {
          throw new Error('Failed to fetch routine info');
        }
        console.log(response.data);
        setRoutine(transformRoutineData(response.data));
        console.log(routine);
      } catch (error) {
        console.error('Error fetching routine:', error);
      }
    };
    fetchRoutine();
  }, []);

  useEffect(() => {
    if (routine && routine.length > 0) {
      setSelectedExercise(routine[0]);
    }
  }, [routine]);

  const transformRoutineData = (routineData) => {
    return routineData.map((item, index) => {
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
        image: sampleExerciseImages[index % sampleExerciseImages.length]
      };
    });
  };

  // Ttrack webcamRunning changes
  useEffect(() => {
    if (webcamRunning) {
      predictWebcam(); // Start prediction when webcam is running
    }
  }, [webcamRunning]); // This effect runs when webcamRunning changes

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

    if (runningMode.current === "IMAGE") {
      runningMode.current = "VIDEO";
      await poseLandmarkerRef.current.setOptions({ runningMode: "VIDEO" });
    }

    const startTimeMs = performance.now();

    try {
      const results = await poseLandmarkerRef.current.detectForVideo(
        videoElement,
        startTimeMs
      );

      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      if (results && results.landmarks && results.landmarks.length > 0) {
        // const updatedLandmarkData = results.landmarks[0].map(
        //   (landmark, index) => ({
        //     id: index,
        //     name: landmarkNames[index],
        //     x: landmark?.x?.toFixed(2) ?? "NA",
        //     y: landmark?.y?.toFixed(2) ?? "NA",
        //     z: landmark?.z?.toFixed(2) ?? "NA",
        //   })
        // );

        // const now = performance.now();
        // if (now - lastUpdateRef.current > 500) {
        //   lastUpdateRef.current = now;
        //   setLandmarkData(updatedLandmarkData);
        // }

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
      window.requestAnimationFrame(predictWebcam);
    }
  };
  
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
    setIsDialogOpen(false); // Close dialog
    enableCam(); // Enable camera
  };

  const handleDisagree = () => {
    navigate(-1); // Navigate back to previous page
  };

  // MEMO: Need to confirm history table definition & APIs
  const finishRoutine = () => {
    if (webcamRunning) enableCam(); // Disable webcam

    // Retrieve routine/program information from the database
    const registerHistory = async () => {
      try {
        const completedAt = new Date().toISOString();
        const newHitoryObj = {
          id: 0,
          created_at: completedAt,
          routine_id: routineId,
          recording_URL: "",
        };
        const response = await server.add("Historys", newHitoryObj)
        console.log(response);
        if (Number(response.status) !== 200) {
          throw new Error('Failed to insert history info');
        }
        console.log(response.data);
      } catch (error) {
        console.error('Error inserting history info:', error);
      }
    };
    registerHistory();

    setIsFinished(true);
  };

  const goBackToTrainingPage = () => {
    setIsFinished(false);
    navigate("/dashboard");
  };

  // const columns = [
  //   { field: "id", headerName: "ID", width: 30 },
  //   { field: "name", headerName: "Landmark", minWidth: 140 },
  //   { field: "x", headerName: "X", width: 70 },
  //   { field: "y", headerName: "Y", width: 70 },
  //   { field: "z", headerName: "Z", width: 70 },
  // ];

  return (
    <>
      {/* Camera Consent Dialog */}
      <Dialog
        open={isDialogOpen}
        fullScreen
        PaperProps={{
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            color: "#fff",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4
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

      <Stack
        sx={{ height: "100vh", backgroundColor: "background.default" }}
        spacing={2}
      >
        <Stack direction="row" sx={{ flex: 1, overflow: "hidden" }}>
          <Box
            sx={{
              flexBasis: "70%",
              position: "relative",
              overflow: "hidden",
              backgroundColor: "background.paper",
            }}
          >
            <video
              ref={videoRef}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              autoPlay
              playsInline
            ></video>
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
            <Typography variant="h4" component="h1" gutterBottom>
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
                      cursor: 'pointer',
                      backgroundColor: selectedExercise === exercise ? 'rgba(0, 0, 255, 0.1)' : 'inherit', // ハイライトの背景色
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 255, 0.2)', // hover時の色
                      }
                    }}
                  >
                    <ListItemIcon>
                      <FitnessCenterIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={exercise.name}
                      secondary={exercise.duration}
                      primaryTypographyProps={{ sx: { fontSize: '1.5rem', fontWeight: 'bold' } }}
                      secondaryTypographyProps={{ sx: { fontSize: '1.2rem' } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* <Typography variant="h4" component="h1" gutterBottom>
              Pose Landmarks
            </Typography>
            <div style={{ height: "calc(100% - 50px)", width: "100%" }}>
              <DataGrid
                rows={landmarkData}
                columns={columns}
                pageSize={landmarkNames.length}
                disableColumnMenu
                hideFooter
                sx={{
                  "& .MuiDataGrid-cell": {
                    padding: "4px",
                    fontSize: "0.8rem",
                  },
                }}
              />
            </div> */}

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
            <Button
              variant="contained"
              onClick={finishRoutine}
            >
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
          <Button
            variant="contained"
            onClick={goBackToTrainingPage}
          >
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
  routineId: PropTypes.string,  // Expecting a UUID string
};