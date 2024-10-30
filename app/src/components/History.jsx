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
  Grid2,
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

import { StartRoutineSessionModal } from "./StartRoutineSessionModal";

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

import testData from './HistoryData.json'; // When you want to use dammy data, Comment out "setHistory(userHistoryData);" around line 20~30 on Profile.jsx 

function History({ data }) {
  const [modalSwitch, setSwitch] = useState(false);
  const [videoSwitch, videoSet] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false); // State if dates are picked
  const [startDate, setStartDate] = useState(dayjs()); // State the picked start dates
  const [endDate, setEndDate] = useState(dayjs()); // State the picked end dates
  const [filteredData, setFilteredData] = useState(data); // Save filtered Data from Duration

  // useEffect to fetch letest data when initial page loading or reloading
  useEffect(() => {
    if (data.length > 0) {
      const latestDate = dayjs(Math.max(...data.map(item => dayjs(item.compare_date).valueOf())));
      setStartDate(latestDate.startOf('day'));
      setEndDate(latestDate.endOf('day'));
      
      const initialFiltered = data.filter(item => 
        dayjs(item.compare_date).isBetween(latestDate.startOf('day'), latestDate.endOf('day'), null, '[]')
      );
      
      setFilteredData(initialFiltered);
      setIsDateSelected(true);
    }
  }, [data]);

  console.log(data);
  
  // Open StartRoutineSessionModal
  const videoOpen = () => {
    videoSet(true);
  };

  // Close StartRoutineSessionModal
  const videoClose = () => {
    videoSet(false);
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
    const startOfStartDate = startDate.startOf('day');
    const endOfEndDate = endDate.endOf('day');
    // Fitering dates
    const filtered = data.filter(item => {
      const itemDate = dayjs(item.compare_date);
      return itemDate.isBetween(startOfStartDate, endOfEndDate, null, '[]');
    });
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
          {isDateSelected && filteredData.length > 0
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

                      {/* Video icon shows up when ther is "recording_url" */}
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
                    // fullWidth
                    // maxWidth="md"
                    BackdropProps={{
                      style: {
                        backgroundColor: 'rgba(71, 71, 71, 0.169)', 
                      },
                    }}
                    sx={{
                      '& .MuiDialog-paper': {
                        borderRadius: 4,
                        padding: 0,
                        backgroundColor: '#f7f7f7',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    }}
                  >
                    <DialogTitle sx={{ padding: 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {/* Download icon*/}
                      <IconButton
                        href={item.recording_url}
                        target="_blank" // opens in a new tab for downloading
                        download
                      >
                        <DownloadIcon />
                      </IconButton>

                      {/* Close icon*/}
                      <IconButton
                        onClick={videoClose}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    </DialogTitle>

                    <DialogContent
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 1,
                        // width: "100%",
                        // height: "auto",
                      }}
                    >
                      <video 
                        // width="100%" 
                        // height="auto" 
                        controls 
                        style={{
                          maxWidth: "100%",
                          maxHeight: "80vh",
                          borderRadius: "8px",
                      }}>
                        <source src={item.recording_url} type="video/webm" />
                        {/* <source src={"https://nahhyooxxbppqrsqaclo.supabase.co/storage/v1/object/public/Training%20Videos/recorded_video_1730243631342.webm"} type="video/webm" /> */}

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