// React and Material-UI
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
// Custom Components for Routine Session
import { useLandscapeMode } from "./useLandscapeMode";

export const Counter2 = ({
  title = "Counter",
  count = 0,
  target = 0,
  onComplete,
}) => {
  const isLandscapeMode = useLandscapeMode();
  const [completed, setCompleted] = useState(true);

  useEffect(() => {
    if (count < target) {
      setCompleted(false);
    }

    if (target && count >= target && onComplete && !completed) {
      onComplete();
      setCompleted(true); // This is to prevent onComplete from being called multiple times
    }
  }, [count, target, onComplete, completed]);

  return (
    <Box
      sx={{
        fontWeight: "bold",
        color: `white`,
      }}
    >
      <Typography
        sx={{
          fontWeight: "normal",
          fontSize: isLandscapeMode ? "1rem" : "1.2rem",
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: isLandscapeMode ? "1.5rem" : "2.5rem",
            textAlign: "center",
          }}
        >
          {count}
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: isLandscapeMode ? "1.5rem" : "2.5rem",
            textAlign: "center",
            marginLeft: 1,
          }}
        >
          {target ? `/ ${target}` : ""}
        </Typography>
      </Box>
    </Box>
  );
};

Counter2.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number.isRequired,
  target: PropTypes.number,
  onComplete: PropTypes.func,
};
