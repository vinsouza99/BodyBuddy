import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Button,
  Skeleton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close"; // Close Icon
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { format, parseISO, isWithinInterval } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { VideoModal } from "./VideoModal";
import duration from "/assets/icon-duration.svg";

// dayjs plugins for timezone support
dayjs.extend(utc);
dayjs.extend(timezone);

function History({ data = [], loading = false }) {
  const [modalSwitch, setSwitch] = useState(false);
  const [videoSwitch, setVideoSwitch] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false); // State if dates are picked
  const [startDate, setStartDate] = useState(dayjs()); // State the picked start dates
  const [endDate, setEndDate] = useState(dayjs()); // State the picked end dates
  const [filteredData, setFilteredData] = useState(data); // Save filtered Data from Duration
  const [videoURL, setVideoURL] = useState(null);

  useEffect(() => {
    // Default to display all data without filtering
    setFilteredData(data);
    setIsDateSelected(false); // Optional: if you want to indicate that no date is selected
  }, [data]);

  // Open StartRoutineSessionModal
  const videoOpen = (url) => {
    setVideoURL(url);
    setVideoSwitch(true);
  };

  // Close StartRoutineSessionModal
  const videoClose = () => {
    setVideoSwitch(false);
    setVideoURL(null);
  };

  // Open Modal
  const handleClickOpen = () => {
    setSwitch(true);
  };

  // Close Modal
  const handleClickClose = () => {
    setSwitch(false);
  };

  const handleOKClick = () => {
    const timeZone = "America/Vancouver";
    const startOfStartDate = startDate.startOf("day");
    const endOfEndDate = endDate.endOf("day");

    const filtered = data.filter((item) => {
      const itemDate = toZonedTime(parseISO(item.compare_date), timeZone);
      return isWithinInterval(itemDate, {
        start: startOfStartDate,
        end: endOfEndDate,
      });
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

  return (
    <>
      <Card
        sx={{
          padding: 3,
          borderRadius: 2,
          width: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "1rem",
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
              padding: 1,
              gap: 1,
            }}
          >
            <img
              src={duration}
              alt="pencil Icon"
              style={{ width: "24px", height: "24px" }}
            />
            <Typography
              variant="body2"
              component="p"
              sx={{
                marginRight: 1,
                fontWeight: 600,
                textTransform: "uppercase",
              }}
              onClick={handleClickOpen}
            >
              Duration
            </Typography>
          </Box>
        </Box>

        <div
          style={{
            flexGrow: 1, // Set the displayed height
            overflowY: "auto", // Scrolling
          }}
          className="custom-scrollbar"
        >
          {loading ? (
            <Box display="flex" flexDirection="column" gap={1}>
              {Array.from(Array(8)).map((_, index) => (
                <Skeleton variant="rectangular" animation="wave" height={80} />
              ))}
            </Box>
          ) : filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <Accordion
                elevation={0}
                square={true}
                key={index}
                sx={{
                  marginTop: 1,
                  borderLeft:
                    item.record_type === "routine"
                      ? "3px solid #4cc13c"
                      : "3px solid #2d90e0",
                  borderTop: "none",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  // aria-controls="panel2-content"
                  // id="panel2-header"
                  sx={{
                    height: "80px",
                  }}
                >
                  <Typography sx={{ textAlign: "left" }}>
                    <span style={{ fontWeight: 600 }}>
                      {dayjs(item.compare_date).isSame(dayjs(), "day")
                        ? "Today"
                        : format(
                            toZonedTime(
                              parseISO(item.compare_date),
                              "America/Vancouver"
                            ),
                            "MMM dd yyyy"
                          )}{" "}
                      :
                    </span>{" "}
                    {item.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    onClick={
                      item.recording_url
                        ? () => videoOpen(item.recording_url)
                        : null
                    }
                    sx={{
                      cursor: item.recording_url ? "pointer" : "default",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 2,
                      borderRadius: 10,
                      backgroundColor: "#f3f3f3",
                      boxShadow: 3,
                    }}
                  >
                    {/* Video icon shows up when there is "recording_url" */}
                    {
                      <IconButton sx={{ padding: 0, marginRight: 1 }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            backgroundColor: item.recording_url ? "" : "grey",
                            backgroundImage: item.recording_url
                              ? item.record_type === "routine"
                                ? "linear-gradient(to right, #4cc13c, #b4f5ab)"
                                : "linear-gradient(to right, #2d90e0, #abd3f3)"
                              : "unset",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                          }}
                        >
                          <PlayArrowIcon
                            sx={{
                              color: "white",
                              fontSize: 40,
                            }}
                          />
                        </Box>
                      </IconButton>
                    }

                    {/* description always shows up*/}
                    <Typography variant="body1" sx={{ margin: 2 }}>
                      {item.record_type === "routine" ? `Routine` : `Program`}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={`${item.duration / 60000} min`}
                      variant="outlined"
                      sx={{ borderRadius: 2 }}
                    />
                    <Chip
                      label={`${item.burned_calories ? item.burned_calories : 0} kcal`}
                      variant="outlined"
                      sx={{ borderRadius: 2 }}
                    />
                    <Chip
                      label={`scored ${item.score ? item.score : 0}`}
                      variant="outlined"
                      sx={{ borderRadius: 2 }}
                    />
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Box flex={1} justifyContent={"center"} paddingTop={"2.5rem"}>
              <Typography variant="body1">No history to show...</Typography>
            </Box>
          )}
        </div>
      </Card>

      {/* Video Dialog */}
      <VideoModal open={videoSwitch} onclose={videoClose} videoURL={videoURL} />
      {/* Modal part */}
      <Dialog
        open={modalSwitch}
        onClose={handleClickClose}
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogContent>
          {/* Close icon*/}
          <DialogTitle
            sx={{ display: "flex", padding: 0, justifyContent: "flex-end" }}
          >
            <IconButton onClick={handleClickClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                display: "flex",
                marginTop: 2,
                marginBottom: 5,
                gap: "20px",
              }}
            >
              <Box>
                <Typography variant="h6">Start</Typography>
                <DatePicker
                  label=""
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
              <Box>
                <Typography variant="h6">End</Typography>
                <DatePicker
                  label=""
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                justifyContent: "right",
                gap: 2,
              }}
            >
              <Button variant="outlined" onClick={handleCancelClick}>
                Reset
              </Button>
              <Button variant="contained" onClick={handleOKClick}>
                OK
              </Button>
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
