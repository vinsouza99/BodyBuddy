import PropTypes from "prop-types";

import React, { useState } from 'react';
import {
    Card,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
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

import { StartRoutineSessionModal } from "./StartRoutineSessionModal";

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

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
    dayjs('2022-04-17'),
    dayjs('2022-04-21'),
  ]);

  return (
    <>
    <Card sx={{ padding: 3, borderRadius: 2, width: 1}}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h3" component="p" sx={{ margin: 1, fontWeight: 'bold' }}>
            History
          </Typography>
          <Typography variant="body2" component="p" sx={{ margin: 1, cursor: 'pointer' }} onClick={handleClickOpen}>
            Duration
          </Typography>
        </Box>


      <div>
      {data.map((item, index) => (

      <Accordion key={index}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>{item.date}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <IconButton>
                <PlayCircleIcon onClick={videoOpen}/>
              </IconButton>
              {item.content}
            </Typography>
            <Stack direction="row" spacing={1}>
            <Chip label={item.duration} variant="outlined" />
            <Chip label={item.calories} cal variant="outlined" />
            </Stack>
          </AccordionDetails>
                
        {/* Session Modal */}
        <Dialog open={videoSwitch} onClose={videoClose} fullWidth maxWidth="sm">
          <DialogTitle>
              {item.content}
              <IconButton onClick={videoClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                <CloseIcon />
              </IconButton>
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <video width="320" height="240" controls>
            <source src="movie.mp4" type="video/mp4" />
            <source src="movie.mp4" type="video/mp4" />
            <source src="movie.ogg" type="video/ogg" />
            </video>
          </DialogContent>
        </Dialog>

      </Accordion>

      
  ))}

      </div>
    </Card>

      {/* Modal part */}
      <Dialog open={modalSwitch} onClose={handleClickClose} fullWidth maxWidth="md">
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
              <DemoItem label="Duration" component="DateRangePicker">
                <IconButton onClick={handleClickClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                  <CloseIcon />
                </IconButton>

                  <DateRangePicker
                    defaultValue={[dayjs('2024-09-01'), dayjs('2024-10-30')]}
                  />
              </DemoItem>
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


