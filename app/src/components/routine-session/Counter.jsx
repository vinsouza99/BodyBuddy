import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

export const Counter = ({ title = "Counter", count = 0, target = 0, onComplete }) => {
  const [completed, setCompleted] = useState(true);

  useEffect(() => {
    if (count < target) {
      setCompleted(false);
    }

    if (target && count >= target && onComplete && !completed) {
      console.log("Counter completed");
      onComplete();
      setCompleted(true); // This is to prevent onComplete from being called multiple times
    }
  }, [count, target, onComplete, completed]);

  return (
    <Card
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "white",
        flexGrow: 0,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold" }}
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
            variant="h4"
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            {count}
          </Typography>
          <Typography
            variant="h6"
            component="span"
            sx={{ marginLeft: "8px" }}
          >
            {target ? `/ ${target}` : ''}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

Counter.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number.isRequired,
  target: PropTypes.number,
  onComplete: PropTypes.func,
};