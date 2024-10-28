import PropTypes from "prop-types";

import React, { useState } from "react";
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
import PlayCircleIcon from "@mui/icons-material/PlayCircle"; // Play Icon
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import { StartRoutineSessionModal } from "./StartRoutineSessionModal";

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

function History({ data }) {
  const [modalSwitch, setSwitch] = useState(false);
  const [videoSwitch, videoSet] = useState(false);

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

  // State if dates are picked
  const [isDateSelected, setIsDateSelected] = useState(false);


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



  const handleCancelClick = () => {
    setStartDate(dayjs()); // Initializa
    setEndDate(dayjs()); // Initializa
  };

  // State the picked start and end dates
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  console.log(`Selected Start Date: ${startDate.format()}`);
  console.log(`Selected End Date: ${endDate.format()}`);
  

  // Save filtered Data from Duration
  const [filteredData, setFilteredData] = useState(data);
  
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

        <div>
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
                      <IconButton sx={{ padding: 0, marginRight: 1 }}>
                        <PlayCircleIcon
                          onClick={videoOpen}
                          sx={{ color: "#4A90E2", fontSize: 60 }}
                        />
                      </IconButton>
                      <Typography variant="body1">{item.description}</Typography>
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
                    maxWidth="sm"
                  >
                    <DialogTitle>
                      {item.content}
                      <IconButton
                        onClick={videoClose}
                        sx={{ position: "absolute", right: 8, top: 8 }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </DialogTitle>
                    <DialogContent
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <video width="320" height="240" controls>
                        <source src="item.recording_url" type="video/mp4" />
                        <source src="movie.ogg" type="video/ogg" />
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
