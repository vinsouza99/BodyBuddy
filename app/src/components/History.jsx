import React, { useState } from 'react';
import {
    Card,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Box,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close'; // Close Icon
import PlayCircleIcon from '@mui/icons-material/PlayCircle'; // Play Icon

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

const historyData = [
  { date: 'Oct 04', content: 'Routine 3: Upper Body Muscle Mass', duration: '30', calories: 600 },
  { date: 'Oct 02', content: 'Routine 2: Core Stability and Hip Mobility', duration: '30', calories: 600 },
  { date: 'Sep 29', content: 'Routine 1: Lower Body Strength', duration: '30', calories: 600 },
  { date: 'Sep 28', content: 'Routine 1: Lower Body Strength', duration: '30', calories: 600 },
  { date: 'Sep 26', content: 'Routine 1: Lower Body Strength', duration: '30', calories: 600 },
  { date: 'Sep 23', content: 'Routine 1: Lower Body Strength', duration: '30', calories: 600 },
  { date: 'Sep 22', content: 'Routine 1: Lower Body Strength', duration: '30', calories: 600 },
];

function History() {
  const [open, setOpen] = useState(false);

  // Teru: Open Modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Teru: Close Modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card sx={{ padding: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h3" component="p" sx={{ margin: 1, fontWeight: 'bold' }}>
            History
          </Typography>
          <Typography variant="body2" component="p" sx={{ margin: 1, cursor: 'pointer' }} onClick={handleClickOpen}>
            SEE MORE
          </Typography>
        </Box>


        <div>
      {historyData.map((item, index) => (

      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          key={index}
        >
          <Typography>{item.date}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <IconButton>
                <PlayCircleIcon />
              </IconButton>
              {item.content}
            </Typography>
            <Stack direction="row" spacing={1}>
            <Chip label={item.duration} variant="outlined" />
            <Chip label={item.calories} cal variant="outlined" />
            </Stack>
          </AccordionDetails>
      </Accordion>
  ))}
    </div>


        {/* <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
            },
          }}
        >
          {historyData.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent color="textSecondary">
                {item.date}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                {index < historyData.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                {item.content} - {item.duration}, {item.calories} cal
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline> */}
      </Card>

      {/* Modal part */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">History</Typography>
            <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
              },
            }}
          >
            {historyData.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent color="textSecondary">
                  {item.date}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  {index < historyData.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  {item.content} - {item.duration}, {item.calories} cal
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default History;
