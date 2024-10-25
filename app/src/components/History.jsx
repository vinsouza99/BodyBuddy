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
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close"; // Close Icon
import PlayCircleIcon from "@mui/icons-material/PlayCircle"; // Play Icon

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
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";

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

  const [value, setValue] = useState([
    dayjs("2022-04-17"),
    dayjs("2022-04-21"),
  ]);

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
          <Typography
            variant="body2"
            component="p"
            sx={{ margin: 1, cursor: "pointer" }}
            onClick={handleClickOpen}
          >
            Duration
          </Typography>
        </Box>

        <div>
          {data && data.length > 0
            ? data.map((item, index) => (
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
                  <Box>
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

                        <Typography variant="body1">{item.content}</Typography>
                      </Paper>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label={`${item.duration} min`}
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
                  </Box>

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
                        <source src="movie.mp4" type="video/mp4" />
                        <source src="movie.mp4" type="video/mp4" />
                        <source src="movie.ogg" type="video/ogg" />
                      </video>
                    </DialogContent>
                  </Dialog>
                </Accordion>
              ))
            : "No history to show..."}
        </div>
      </Card>

      {/* Modal part */}
      <Dialog open={modalSwitch} onClose={handleClickClose} maxWidth="md">
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <IconButton
              onClick={handleClickClose}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>

            <DemoContainer components={["DateRangeCalendar"]}>
              <DateRangeCalendar />
            </DemoContainer>
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
