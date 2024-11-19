import PropTypes from "prop-types";
import { Box, Typography, LinearProgress } from "@mui/material";
import { calculateLevel } from "../utils/utils";

export const UserProgressBar = ({ levelProgress = 0 }) => {
  const userLevel = calculateLevel(levelProgress);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: 2,
        alignItems: "center",
        marginTop: 2.5, // Adjustment
        marginBottom: 2.5, // Adjustment
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            marginBottom: 1,
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
          }}
        >
          <Typography textAlign="left" sx={{ fontWeight: "800" }}>
            Level {userLevel.currentLevel}
          </Typography>
          <Typography textAlign="left">
            Earn {userLevel.remainingPointsToNextLevel} points to level up
          </Typography>
        </Box>
        <Box sx={{ width: "100%", position: "relative" }}>
          <LinearProgress
            variant="determinate"
            value={
              (userLevel.pointsInCurrentLevel /
                userLevel.pointsRequiredForCurrentLevel) *
              100
            }
            valueBuffer={100}
            sx={{
              "--LinearProgress-radius": "8px",
              "--LinearProgress-progressThickness": "30px",
              height: "20px",
              boxShadow: "sm",
              border: "1px solid #abd3f3",
              borderRadius: "15px",
              "& .MuiLinearProgress-bar": {
                backgroundImage:
                  "linear-gradient(to right, #1c89e3, #2d90e0, #abd3f3)",
                clipPath:
                  "polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%)", //"Add a diagonal cut."
              },
              backgroundColor: "#E7F5FF",
            }}
          ></LinearProgress>
          <Typography
            color="text.primary"
            sx={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              textAlign: "center",
              lineHeight: "20px",
              color: "black",
            }}
          >
            {`${userLevel.pointsInCurrentLevel} / ${userLevel.pointsRequiredForCurrentLevel}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

UserProgressBar.propTypes = {
  levelProgress: PropTypes.number.isRequired,
};
