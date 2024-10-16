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
  { date: 'Oct 04', content: 'Routine 3: Upper Body Muscle Mass', condition: 'Finished', calories: 600 },
  { date: 'Oct 02', content: 'Routine 2: Core Stability and Hip Mobility', condition: 'Finished', calories: 600 },
  { date: 'Sep 29', content: 'Routine 1: Lower Body Strength', condition: 'Finished', calories: 600 },
  { date: 'Sep 28', content: 'Routine 1: Lower Body Strength', condition: 'Finished', calories: 600 },
  { date: 'Sep 26', content: 'Routine 1: Lower Body Strength', condition: 'Finished', calories: 600 },
  { date: 'Sep 23', content: 'Routine 1: Lower Body Strength', condition: 'Finished', calories: 600 },
  { date: 'Sep 22', content: 'Routine 1: Lower Body Strength', condition: 'Finished', calories: 600 },
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
    <>
      <Card sx={{ padding: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h3" component="p" sx={{ margin: 1, fontWeight: 'bold' }}>
            History
          </Typography>
          <Typography variant="body2" component="p" sx={{ margin: 1, cursor: 'pointer' }} onClick={handleClickOpen}>
            SEE MORE
          </Typography>
        </Box>

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
                {item.content} - {item.condition}, {item.calories} cal
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
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
                  {item.content} - {item.condition}, {item.calories} cal
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default History;

