import { useEffect, useRef, useState } from 'react';
import { PoseLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';
import { Box, Button, Stack, Typography, createTheme, ThemeProvider, CssBaseline, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { createClient } from '@supabase/supabase-js';

// Supabase setup for file storage
// Note: Remove the key from here and use environment variables, authentication, or other secure methods
const supabaseUrl = 'https://nahhyooxxbppqrsqaclo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5haGh5b294eGJwcHFyc3FhY2xvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2MjIyMzksImV4cCI6MjA0MjE5ODIzOX0.sdmnqwQF236tcpyRHFFTxpiNksjOulhnBaeAD7W544E';
const supabase = createClient(supabaseUrl, supabaseKey);

// For Mediapipe Pose Detection
const landmarkNames = [
  'NOSE', 'LEFT_EYE_INNER', 'LEFT_EYE', 'LEFT_EYE_OUTER', 'RIGHT_EYE_INNER',
  'RIGHT_EYE', 'RIGHT_EYE_OUTER', 'LEFT_EAR', 'RIGHT_EAR', 'MOUTH_LEFT', 'MOUTH_RIGHT',
  'LEFT_SHOULDER', 'RIGHT_SHOULDER', 'LEFT_ELBOW', 'RIGHT_ELBOW', 'LEFT_WRIST', 'RIGHT_WRIST',
  'LEFT_PINKY', 'RIGHT_PINKY', 'LEFT_INDEX', 'RIGHT_INDEX', 'LEFT_THUMB', 'RIGHT_THUMB',
  'LEFT_HIP', 'RIGHT_HIP', 'LEFT_KNEE', 'RIGHT_KNEE', 'LEFT_ANKLE', 'RIGHT_ANKLE', 
  'LEFT_HEEL', 'RIGHT_HEEL', 'LEFT_FOOT_INDEX', 'RIGHT_FOOT_INDEX'
];

// Light gray theme for MUI
const lightGrayTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
    },
  },
  typography: {
    fontSize: 12,
  },
});

export const Routine = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseLandmarkerRef = useRef(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const runningMode = useRef('IMAGE');
  const [landmarkData, setLandmarkData] = useState([]); 
  const lastUpdateRef = useRef(0);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  // Setup MediaPipe PoseLandmarker when component mounts
  useEffect(() => {
    // Overwrite the style of #root
    const rootElement = document.getElementById('root');
    rootElement.style.margin = '0';
    rootElement.style.padding = '0';
    rootElement.style.width = '100%';
    rootElement.style.maxWidth = '100%';

    const createPoseLandmarker = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
        );
        const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task',
            delegate: 'GPU',
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
  }, []);

  const enableCam = async () => {
    if (!poseLandmarkerRef.current) {
      console.error('PoseLandmarker not loaded.');
      return;
    }

    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');

    if (webcamRunning) {
      // Stop webcam
      const stream = videoElement.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
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
        videoElement.addEventListener('loadeddata', () => {
          console.log("Webcam video loaded:", videoElement.videoWidth, videoElement.videoHeight);
          setWebcamRunning(true); // Update state
        });
      } catch (error) {
        console.error("Error accessing the webcam: ", error);
      }
    }
  };

  // Add useEffect to track webcamRunning changes
  useEffect(() => {
    if (webcamRunning) {
      predictWebcam(); // Start prediction when webcam is running
    }
  }, [webcamRunning]); // This effect runs when webcamRunning changes

  const predictWebcam = async () => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');
    const drawingUtils = new DrawingUtils(canvasCtx);
  
    // Check if video element is available
    if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
      console.log("Video element not available or has been stopped.");
      return;
    }
  
    // Adjust canvas size to match video
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
  
    if (runningMode.current === 'IMAGE') {
      runningMode.current = 'VIDEO';
      await poseLandmarkerRef.current.setOptions({ runningMode: 'VIDEO' });
    }
  
    const startTimeMs = performance.now();
  
    try {
      const results = await poseLandmarkerRef.current.detectForVideo(videoElement, startTimeMs);
  
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  
      if (results && results.landmarks && results.landmarks.length > 0) {
        const updatedLandmarkData = results.landmarks[0].map((landmark, index) => ({
          id: index,
          name: landmarkNames[index],
          x: landmark?.x?.toFixed(2) ?? 'NA',
          y: landmark?.y?.toFixed(2) ?? 'NA',
          z: landmark?.z?.toFixed(2) ?? 'NA',
        }));

        const now = performance.now();
        if (now - lastUpdateRef.current > 500) {
          lastUpdateRef.current = now;
          setLandmarkData(updatedLandmarkData);
        }

        drawingUtils.drawConnectors(results.landmarks[0], PoseLandmarker.POSE_CONNECTIONS);

        drawingUtils.drawLandmarks(results.landmarks[0], {
          radius: (data) => {
            return DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1);
          },
          color: (data) => {
            return data.index === 0 ? 'green' : 'green';
          }
        });

        results.landmarks[0].forEach((landmark, index) => {
          const x = landmark.x * canvasElement.width;
          const y = landmark.y * canvasElement.height;
        
          canvasCtx.font = '10px Roboto';
          canvasCtx.fillStyle = 'blue';
          canvasCtx.fontWeight = 'bold';
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
      const options = { mimeType: 'video/webm' };
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
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const fileName = `recorded_video_${Date.now()}.webm`;

      const { data, error } = await supabase.storage
        .from('Training Videos')
        .upload(fileName, blob, {
          contentType: 'video/webm',
        });

      if (error) {
        console.error('Error uploading file:', error);
      } else {
        setRecordedChunks([]);
        console.log('File uploaded successfully:', data);

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
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'recorded_video.webm';
      document.body.appendChild(a);
      a.click();
      setRecordedChunks([]);
      console.log("Recording downloaded");
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 30 }, 
    { field: 'name', headerName: 'Landmark', minWidth: 140 },
    { field: 'x', headerName: 'X', width: 70 },
    { field: 'y', headerName: 'Y', width: 70 },
    { field: 'z', headerName: 'Z', width: 70 },
  ];

  return (
    <ThemeProvider theme={lightGrayTheme}>
      <CssBaseline />
      <Stack sx={{ height: '100vh', backgroundColor: 'background.default' }} spacing={2}>
        <Stack direction="row" sx={{ flex: 1, overflow: 'hidden' }}>
          <Box sx={{ flexBasis: '70%', position: 'relative', overflow: 'hidden', backgroundColor: 'background.paper' }}>
            <video
              ref={videoRef}
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
              autoPlay
              playsInline
            ></video>
            <canvas
              ref={canvasRef}
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
            ></canvas>
          </Box>
          <Box sx={{ flexBasis: '30%', padding: 1, overflowY: 'auto', maxHeight: '100%', backgroundColor: 'background.paper' }}>
            <Typography variant="h5" sx={{ marginBottom: 1 }}>Pose Landmarks</Typography>
            <div style={{ height: 'calc(100% - 50px)', width: '100%' }}>
            <DataGrid
              rows={landmarkData} 
              columns={columns} 
              pageSize={landmarkNames.length} 
              disableColumnMenu 
              hideFooter
              sx={{ 
                '& .MuiDataGrid-cell': { 
                  padding: '4px',
                  fontSize: '0.8rem',
                } 
              }} 
            />
            </div>
          </Box>
        </Stack>
        <Box
          sx={{
            padding: 2,
            backgroundColor: 'background.paper',
            textAlign: 'center',
            borderTop: 1,
            borderTopColor: 'divider',
            borderTopStyle: 'solid',
          }}
        >
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <Button variant="contained" onClick={enableCam}>
              {webcamRunning ? 'DISABLE WEBCAM' : 'ENABLE WEBCAM'}
            </Button>
            <Button variant="contained" onClick={startRecording} disabled={isRecording || !webcamRunning}>
              START RECORDING
            </Button>
            <Button variant="contained" onClick={stopRecording} disabled={!isRecording}>
              STOP RECORDING
            </Button>
            <Button variant="contained" onClick={uploadToSupabase} disabled={recordedChunks.length === 0}>
              UPLOAD TO STORAGE
            </Button>
            <Button variant="contained" onClick={downloadRecording} disabled={recordedChunks.length === 0}>
              DOWNLOAD
            </Button>
            <Snackbar
              open={isSnackbarOpen}
              autoHideDuration={3000}
              onClose={handleClose}
              message="File uploaded successfully!"
              anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
              ContentProps={{
                style: {
                  backgroundColor: '#4CAF50',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  borderRadius: '8px',
                },
              }}
            />
          </Stack>
        </Box>
      </Stack>
    </ThemeProvider>
  );
}

