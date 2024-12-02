// React and Material-UI
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
// Custom Components for Routine Session
import { useLandscapeMode } from "./useLandscapeMode";

export const AngleMeter2 = ({ angle = 180, minAngle = 90, maxAngle = 170 }) => {
  const isLandscapeMode = useLandscapeMode();
  const [displayedAngle, setDisplayedAngle] = useState(maxAngle);
  const [widthPercentage, setWidthPercentage] = useState(0);
  const animationFrameRef = useRef(null);

  const updateWidthAndAngle = () => {
    // Normalize based on the maxAngle and minAngle props
    const normalizedWidth =
      100 -
      ((Math.max(Math.min(Number(displayedAngle), maxAngle), minAngle) -
        minAngle) /
        (maxAngle - minAngle)) *
        100;
    setWidthPercentage(normalizedWidth);

    setDisplayedAngle((prevAngle) => {
      const step = (angle - prevAngle) * 0.1;
      return prevAngle + step;
    });
  };

  useEffect(() => {
    const animate = () => {
      updateWidthAndAngle();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Clean up
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [angle, maxAngle, minAngle]);

  return (
    <Box
      sx={{
        display: isLandscapeMode ? "none" : "flex",
        flexDirection: "column",
        width: "50%",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: isLandscapeMode ? "1.2rem" : "1.5rem",
          color: `white`,
          textAlign: "left",
        }}
      >
        {`${Math.round(widthPercentage)}% Posture corrects`}
      </Typography>
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          border: `1px solid white`,
          borderRadius: "15px",
        }}
      >
        {/* Progress Bar */}
        <Box
          sx={{
            width: "100%",
            height: "10px",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Box
            sx={{
              width: `${widthPercentage}%`,
              height: "100%",
              backgroundColor: `white`,
              transition: "width 0.1s ease",
              borderRadius: "15px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

AngleMeter2.propTypes = {
  title: PropTypes.string,
  angle: PropTypes.number.isRequired,
  maxAngle: PropTypes.number,
  minAngle: PropTypes.number,
};
