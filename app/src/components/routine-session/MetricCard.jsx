import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

export const MetricCard = ({ value="N/A", title="N/A" }) => {
  const theme = useTheme();
  return (
    <Card sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
      <CardContent>
        <Typography variant="h2" component="div" color={theme.palette.text.primary}>
          {value}
        </Typography>
        <Typography variant="subtitle1" color={theme.palette.text.primary} >
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