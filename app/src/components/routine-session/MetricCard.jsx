import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";
import { useLandscapeMode } from './useLandscapeMode';
import { useTheme } from '@mui/material/styles';

export const MetricCard = ({ value="N/A", title="N/A" }) => {
  const theme = useTheme();
  const isLandscapeMode = useLandscapeMode();

  return (
    <Card sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography
          component="div" 
          color={theme.palette.text.primary}
          fontWeight="bold"
          fontSize={isLandscapeMode ? "1.2rem" : "2rem"}
        >
          {value}
        </Typography>
        <Typography 
          variant="subtitle1" 
          color={theme.palette.text.primary}
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
};