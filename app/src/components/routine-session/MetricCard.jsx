// Reat and Material-UI
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";
// Custom Components for Routine Session
import { useLandscapeMode } from "./useLandscapeMode";

export const MetricCard = ({ value = 0, title = "N/A", color = "white" }) => {
  const isLandscapeMode = useLandscapeMode();

  return (
    <Card
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <CardContent
        sx={{
          textAlign: "center",
          margin: "0",
          padding: "0",
          paddingBottom: "0 !important",
        }}
      >
        <Typography
          component="div"
          color={color}
          sx={{
            fontWeight: "bold",
            fontSize: isLandscapeMode ? "1.5rem" : "2.8rem",
          }}
        >
          {value}
        </Typography>
        <Typography variant="subtitle1" color={color}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Defining prop types
MetricCard.propTypes = {
  value: PropTypes.number,
  title: PropTypes.string,
  color: PropTypes.string,
};
