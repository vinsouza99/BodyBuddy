import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import {
  addDays,
  subDays,
  format,
  isSameDay,
  parseISO,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  startOfYear,
  endOfYear,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export const WeekPicker = ({
  onSelectDate = null,
  onClickNextWeek = null,
  onClickPreviousWeek = null,
  displayMode = "week-basic", // "week-basic", "week-simple, "month-simple"
  scheduledDates = [],
  scheduledDatesBorderColor = "primary.main",
  scheduledDatesBgColor = "transparent",
}) => {
  const [startDate, setStartDate] = useState(getStartOfWeek(new Date()));
  const [endDate, setEndDate] = useState(
    addDays(getStartOfWeek(new Date()), 6)
  );
  const today = new Date();
  const timeZone = "America/Vancouver";

  useEffect(() => {
    if (displayMode === "month-simple") {
      setStartDate(startOfMonth(today));
      setEndDate(endOfMonth(today));
    } else if (displayMode === "year-simple") {
      setStartDate(startOfYear(today));
      setEndDate(endOfYear(today));
    } else {
      setStartDate(getStartOfWeek(today).setHours(0, 0, 0, 0));
      setEndDate(addDays(getStartOfWeek(today), 6).setHours(0, 0, 0, 0));
    }
  }, [displayMode]);

  function getStartOfWeek(date) {
    return startOfWeek(date, { weekStartsOn: 1 }); // 1 = Monday
  }

  const handlerNextWeek = () => {
    if (displayMode === 'month-simple') {
      setStartDate((prev) => startOfMonth(addMonths(prev, 1)));
      setEndDate((prev) => endOfMonth(addMonths(prev, 1)));
      if (typeof onClickNextWeek === "function") {
        onClickNextWeek(addMonths(startDate, 1));
      }
    } else if (displayMode === "year-simple") {
      setStartDate(addMonths(startDate, 12));
      setEndDate(addMonths(endDate, 12));
      if (typeof onClickNextWeek === "function") {
        onClickNextWeek(addMonths(startDate, 12));
      }
    } else {
      setStartDate(addDays(startDate, 7));
      setEndDate(addDays(endDate, 7));
      if (typeof onClickNextWeek === "function") {
        onClickNextWeek(addDays(startDate, 7));
      }
    }
  };

  const handlerPreviousWeek = () => {
    if (displayMode === 'month-simple') {
      setStartDate((prev) => startOfMonth(subMonths(prev, 1)));
      setEndDate((prev) => endOfMonth(subMonths(prev, 1)));
      if (typeof onClickPreviousWeek === "function") {
        onClickPreviousWeek(subMonths(startDate, 1));
      }
    } else if (displayMode === "year-simple") {
      setStartDate(subMonths(startDate, 12));
      setEndDate(subMonths(endDate, 12));
      if (typeof onClickPreviousWeek === "function") {
        onClickPreviousWeek(subMonths(startDate, 12));
      }
    } else {
      setStartDate(subDays(startDate, 7));
      setEndDate(subDays(endDate, 7));
      if (typeof onClickPreviousWeek === "function") {
        onClickPreviousWeek(subDays(startDate, 7));
      }
    }
  };

  const handleDayClick = (day) => {
    if (typeof onSelectDate === "function") {
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
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
          flexWrap: 'nowrap',
          flexShrink: 1,
        }}
      >
        <IconButton
          sx={{
            padding: "0",
            "&:focus": { outline: "none" },
            "&:hover": { backgroundColor: "transparent" },
          }}
          onClick={handlerPreviousWeek}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        {displayMode === "week-basic" ? (
          weekdays.map((day, index) => (
            <Box
              key={index}
              sx={{
                // cursor: 'pointer',
                textAlign: "center",
              }}
              onClick={() => handleDayClick(day)}
            >
              <Typography>{format(day, "E").charAt(0)}</Typography>{" "}
              {/* Day of week */}
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  width: "30px",
                  height: "30px",
                  lineHeight: "30px",
                  border: "1px solid",
                  borderRadius: "50%",
                  borderColor: isSameDay(day, today)
                    ? "secondary.main"
                    : isScheduled(day)
                      ? scheduledDatesBorderColor
                      : "transparent",
                  backgroundColor: isSameDay(day, today)
                    ? "transparent"
                    : isScheduled(day)
                      ? scheduledDatesBgColor
                      : "transparent",
                }}
              >
                {format(day, "dd")}
              </Typography>{" "}
              {/* Date */}
            </Box>
          ))
        ) : (
          <Typography>
            {`${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`}
          </Typography>
        )}

        <IconButton
          onClick={handlerNextWeek}
          sx={{
            padding: "0",
            "&:focus": { outline: "none" },
            "&:hover": { backgroundColor: "transparent" },
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
