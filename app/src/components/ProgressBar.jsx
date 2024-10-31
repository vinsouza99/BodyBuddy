import React from "react";
import Grid from "@mui/material/Grid2";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));

const ProgressBar = ({ progress }) => {
  return (
    <>
      <Grid container direction={"row"} spacing={2} sx={{ width: "100%" }}>
        <Box
          component={"div"}
          flexitem="true"
          flexGrow={1}
          alignContent={"center"}
        >
          <BorderLinearProgress
            variant="determinate"
            value={progress}
            sx={{ width: "100%" }}
          />
        </Box>
        <Box component={"div"} flexitem="true">
          <Typography variant={"body1"} sx={{ display: "block" }}>
            {progress.toFixed(0)}%
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default ProgressBar;
