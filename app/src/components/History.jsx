import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Paper,
  Button,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close"; // Close Icon
import DownloadIcon from '@mui/icons-material/Download'; // Download Icon
import PlayCircleIcon from "@mui/icons-material/PlayCircle"; // Play Icon
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

// import testData from './HistoryData.json'; // When you want to use dammy data, Comment out "setHistory(userHistoryData);" around line 20~30 on Profile.jsx 

// dayjs plugins for timezone support
dayjs.extend(utc);
dayjs.extend(timezone);

function History({ data }) {
  const [modalSwitch, setSwitch] = useState(false);
  const [videoSwitch, setVideoSwitch] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false); // State if dates are picked
  const [startDate, setStartDate] = useState(dayjs()); // State the picked start dates
  const [endDate, setEndDate] = useState(dayjs()); // State the picked end dates
  const [filteredData, setFilteredData] = useState(data); // Save filtered Data from Duration

  useEffect(() => {
    // Default to display all data without filtering
    setFilteredData(data);
    setIsDateSelected(false); // Optional: if you want to indicate that no date is selected
  }, [data]);

  console.log(data);
  
  // Open StartRoutineSessionModal
  const videoOpen = () => {
    setVideoSwitch(true);
  };

  // Close StartRoutineSessionModal
  const videoClose = () => {
    setVideoSwitch(false);
  };

  // Open Modal
  const handleClickOpen = () => {
    setSwitch(true);
  };

  // Close Modal
  const handleClickClose = () => {
    setSwitch(false);
  };

  // OK button on duration modal
const handleOKClick = () => {
    // 日付の範囲を1日単位に合わせる
    const startOfStartDate = startDate.startOf('day').utc(); // UTCに変換
    const endOfEndDate = endDate.endOf('day').utc(); // UTCに変換

    // フィルタリング処理
    const filtered = data.filter(item => {
      const itemDate = dayjs(item.compare_date).utc(); // UTCとして比較
      return itemDate.isBetween(startOfStartDate, endOfEndDate, null, '[]');
    });

  // const handleOKClick = () => {
  //   const startOfStartDate = startDate.startOf('day').tz("America/Vancouver");
  //   const endOfEndDate = endDate.endOf('day').tz("America/Vancouver");
  //   // Fitering dates
  //   const filtered = data.filter(item => {
  //     const itemDate = dayjs(item.compare_date).tz("America/Vancouver");
  //     return itemDate.isBetween(startOfStartDate, endOfEndDate, null, '[]');
  //   });
    
    setFilteredData(filtered);
    setIsDateSelected(true);
    setSwitch(false);
  };

  // Cancel button on duration modal
  const handleCancelClick = () => {
    setStartDate(dayjs()); // Initializa
    setEndDate(dayjs()); // Initializa
  };

  console.log(`Selected Start Date: ${startDate.format()}`);
  console.log(`Selected End Date: ${endDate.format()}`);
  
  return (
    <>
      <Card sx={{ padding: 3, borderRadius: 2, width: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h3"
            component="p"
            sx={{ margin: 1, fontWeight: "bold" }}
          >
            History
          </Typography>
          <Box
            onClick={handleClickOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              border: 1,
              borderRadius: 10,
            }}
          >
            <IconButton>
              <CalendarMonthIcon
                sx={{ fontSize: 20 }}
              />
            </IconButton>
            <Typography 
              variant="body2"
              component="p"
              sx={{ marginRight: 1 }}
              onClick={handleClickOpen}
            >
              DURATION
            </Typography>
          </Box>
        </Box>

        <div 
          style={{
            maxHeight: '80vh', // Set the displayed height
            overflowY: 'auto', // Scrolling
          }}>
          {filteredData.length > 0
            ? filteredData.map((item, index) => (
                <Accordion
                  elevation={0}
                  key={index}
                  sx={{
                    marginTop: 1,
                    borderLeft: "2px solid #4A90E2",
                    borderTop: "none",
                    borderRight: "none",
                    borderBottom: "none",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography>
                      {new Date(item.compare_date).toDateString()} - {item.name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Paper
                      elevation={2}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 2,
                        borderRadius: 10,
                        backgroundColor: "#f3f3f3",
                      }}
                    >

                      {/* Video icon shows up when there is "recording_url" */}
                      {item.recording_url ? (
                        <IconButton sx={{ padding: 0, marginRight: 1 }}>
                          <PlayCircleIcon
                            onClick={videoOpen}
                            sx={{ color: "#4A90E2", fontSize: 60 }}
                          />
                        </IconButton>
                      ) : null}              


                      {/* description always shows up*/}
                      <Typography variant="body1" sx={{margin: 2}} >{item.description}</Typography>
                    </Paper>
                    <Stack direction="row" spacing={1}>

                      <Chip
                        label={`${item.duration/60} min`}
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                      />
                      <Chip
                        label={`${item.calories} cal`}
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                      />
                    </Stack>
                  </AccordionDetails>

                  {/* Session Modal */}
                  <Dialog
                    open={videoSwitch}
                    onClose={videoClose}
                    fullWidth
                    maxWidth="md"
                    maxHeight="lg"
                    BackdropProps={{
                      style: {
                        backgroundColor: 'rgba(71, 71, 71, 0.169)', 
                      },
                    }}
                    sx={{
                      '& .MuiDialog-paper': {
                        borderRadius: 4,
                        overflow: 'hidden',
                        padding: 1,
                        backgroundColor: '#f7f7f7',
                        height: "auto"
                      },
                    }}
                  >
                    <DialogTitle sx={{ padding: 0, display:"flex", justifyContent: "end" }}>
                      {/* Download icon*/}
                      {/* <IconButton
                        href={"https://nahhyooxxbppqrsqaclo.supabase.co/storage/v1/object/public/Training%20Videos/recorded_video_1730311558020.webm"}
                        target="_blank" // opens in a new tab for downloading
                        download
                      >
                        <DownloadIcon />
                      </IconButton> */}

                      {/* Close icon*/}
                      <IconButton
                        onClick={videoClose}
                      >
                        <CloseIcon />
                      </IconButton>
                    </DialogTitle>

                    <DialogContent
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 0,
                        width: "100%",
                        height: "100%",
                        borderRadius: "8px",

                      }}
                    >
                      <video 
                        width="100%" 
                        height="100%" 
                        controls 
                        style={{
                        maxWidth: "100%",
                      }}>
                        <source src={item.recording_url} type="video/webm" />
                        {/* <source src={"https://nahhyooxxbppqrsqaclo.supabase.co/storage/v1/object/public/Training%20Videos/recorded_video_1730311558020.webm"} type="video/webm" /> */}

                      </video>
                    </DialogContent>
                  </Dialog>
                </Accordion>
              ))
            : isDateSelected && "No history to show..."}
        </div>
      </Card>


      {/* Modal part */}
      <Dialog open={modalSwitch} onClose={handleClickClose} maxWidth="md">
        <DialogContent>
          {/* Close icon*/}
          <DialogTitle sx={{ display: "flex", padding: 0, justifyContent: "flex-end" }}>
            <IconButton onClick={handleClickClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <Box>
                <Typography variant="h6">Start</Typography>
                <DatePicker
                  label="Start"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
              <Box>
                <Typography variant="h6">End</Typography>
                <DatePicker
                  label="End"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </Box>
            <Box sx={{ marginTop: 2, display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained" onClick={handleOKClick}>OK</Button>
              <Button variant="outlined" onClick={handleCancelClick}>Cancel</Button>
            </Box>
          </LocalizationProvider>        
        </DialogContent>
      </Dialog>
    </>
  );
}

export default History;

History.propTypes = {
  data: PropTypes.array.isRequired,
};