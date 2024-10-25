import PropTypes from "prop-types";
import { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { addDays, subDays, format, isSameDay, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const WeekPicker = ({
  onSelectDate = null,
  onClickNextWeek = null,
  onClickPreviousWeek = null,
  displayMode = "full",
  scheduledDates = [],
  scheduledDatesBorderColor = "primary.main",
  scheduledDatesBgColor = "transparent",

}) => {
  const [startDate, setStartDate] = useState(new Date(getStartOfWeek(new Date()).setHours(0, 0, 0, 0)));
  const [endDate, setEndDate] = useState(new Date(getStartOfWeek(addDays(new Date(), 7)).setHours(0, 0, 0, 0)));
  const today = new Date();
  const timeZone = 'America/Vancouver';

  function getStartOfWeek(date) {
    const dayOfWeek = date.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    return addDays(date, diff);
  }

  const handlerNextWeek = () => {
    setStartDate(addDays(startDate, 7));
    setEndDate(addDays(endDate, 7));
    if (typeof onClickNextWeek === 'function') {
      onClickNextWeek(addDays(startDate, 7));
    }
  };

  const handlerPreviousWeek = () => {
    setStartDate(subDays(startDate, 7));
    setEndDate(subDays(endDate, 7));
    if (typeof onClickPreviousWeek === 'function') {
      onClickPreviousWeek(addDays(startDate, -7));
    }
  };

  const handleDayClick = (day) => {
    if (typeof onSelectDate === 'function') {
      onSelectDate(day);
    }
  };

  const getWeekdays = (startOfWeek) => {
    return [...Array(7)].map((_, index) => addDays(startOfWeek, index));
  };

  const weekdays = getWeekdays(startDate);

  const isScheduled = (day) => {
    if (!scheduledDates || scheduledDates.length === 0) return false;
    return scheduledDates.some((scheduledDate) => {
      const utcDate = parseISO(scheduledDate);
      const zonedDay = toZonedTime(day, timeZone);
      return isSameDay(utcDate, zonedDay);
    });
  };
  
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
                  width: '30px',
                  height: '30px',
                  lineHeight: '30px',
                  border: '1px solid',
                  borderRadius: '50%',
                  borderColor: isSameDay(day, today) ? 'secondary.main' : isScheduled(day) ? scheduledDatesBorderColor : 'transparent',
                  backgroundColor: isSameDay(day, today) ? 'transparent' : isScheduled(day) ? scheduledDatesBgColor : 'transparent',
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
  scheduledDates: PropTypes.array,
  scheduledDatesBorderColor: PropTypes.string,
  scheduledDatesBgColor: PropTypes.string,
};
