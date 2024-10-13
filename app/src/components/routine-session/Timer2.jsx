import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export const Timer2 = ({ title = "Timer", duration = 0, onComplete, disabled = false }) => {
  const [completed, setCompleted] = useState(true);
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    if (duration > 0) {
      setRemainingTime(duration);
      setCompleted(false);
    }
  }, [duration]);

  useEffect(() => {
    if (disabled) {
      // If resting, do not start the countdown
      return;
    }

    if (remainingTime > 0) {
      const timerId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      // clean up
      return () => clearInterval(timerId);
    } else if (remainingTime === 0 && !completed && onComplete) {
      console.log("Timer completed");
      onComplete();
      setCompleted(true); // This is to prevent onComplete from being called multiple times
    }
  }, [remainingTime, completed, onComplete, disabled]);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "white",
        borderRadius: "50%",
        height: '100%',
        aspectRatio: '1 / 1',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{ fontWeight: "bold" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: "bold" }}
      >
        {remainingTime !== null ? remainingTime : 0}
      </Typography>
    </Box>
  );
};

Timer2.propTypes = {
  title: PropTypes.string,
  duration: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};