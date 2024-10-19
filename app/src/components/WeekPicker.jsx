import PropTypes from "prop-types";
import { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { addDays, subDays, format } from 'date-fns';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const WeekPicker = ({onSelectDate = false, onClickNextWeek = false, onClickPreviousWeek = false, displayMode = "full" }) => {
  const [startDate, setStartDate] = useState(getStartOfWeek(new Date()));
  const [endDate, setEndDate] = useState(getStartOfWeek(addDays(new Date(), 7)));

  function getStartOfWeek(date) {
    const dayOfWeek = date.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    return addDays(date, diff);
  }

  const handlerNextWeek = () => {
    setStartDate(addDays(startDate, 7));
    setEndDate(addDays(endDate, 7));
    onClickNextWeek(addDays(startDate, 7));
  };

  const handlerPreviousWeek = () => {
    setStartDate(subDays(startDate, 7));
    setEndDate(subDays(endDate, 7));
    onClickPreviousWeek(subDays(startDate, 7));
  };

  const handleDayClick = (day) => {
    if (onSelectDate) {
      onSelectDate(day);
    }
  };

  const getWeekdays = (startOfWeek) => {
    return [...Array(7)].map((_, index) => addDays(startOfWeek, index));
  };

  const weekdays = getWeekdays(startDate);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >

      {/* Weekly Calendar */}
      <Box
        sx={{
          display: 'flex',
          direction: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <IconButton
          sx={{
            "&:focus": { outline: 'none' },
            "&:hover": { backgroundColor: 'transparent' },
          }}
          onClick={handlerPreviousWeek}
        >
          <ArrowBackIosNewIcon />
        </IconButton>


        {displayMode === 'full' ? (
          weekdays.map((day, index) => (
            <Box
              key={index}
              sx={{
                cursor: 'pointer',
                textAlign: 'center',
              }}
              onClick={() => handleDayClick(day)}
            >
              <Typography>
                {format(day, 'E').charAt(0)}
              </Typography> {/* Day of week */}
              <Typography
                sx={{
                  fontSize: '0.8rem',
                }}
              >
                {format(day, 'dd')}
                </Typography> {/* Date */}
            </Box>
          ))
        ) : (
          <Typography >
            {`${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`}
          </Typography>
        )}

        <IconButton 
          onClick={handlerNextWeek}
          sx={{
            "&:focus": { outline: 'none' },
            "&:hover": { backgroundColor: 'transparent' },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

WeekPicker.propTypes = {
  onSelectDate: PropTypes.func,
  onClickNextWeek: PropTypes.func,
  onClickPreviousWeek: PropTypes.func,
  displayMode: PropTypes.string,
};
