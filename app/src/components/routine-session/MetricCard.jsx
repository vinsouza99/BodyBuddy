// Reat and Material-UI
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";
// Custom Components for Routine Session
import { useLandscapeMode } from './useLandscapeMode';

export const MetricCard = ({ value="N/A", title="N/A", color="white" }) => {
  const isLandscapeMode = useLandscapeMode();

  return (
    <Card sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography
          component="div" 
          color={color}
          sx={{
            fontWeight: "bold",
            fontSize: isLandscapeMode ? "1.2rem" : "2rem",
          }}
        >
          {value}
        </Typography>
        <Typography 
          variant="subtitle1" 
          color={color}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Defining prop types
MetricCard.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
};