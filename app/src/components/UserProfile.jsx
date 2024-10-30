import PropTypes from "prop-types";
import { Box, Typography, Avatar, LinearProgress } from "@mui/material";
import { useAuth } from "../utils/AuthProvider.jsx";

export const UserProfile = ({
  username = "",
  profilePicture,
  level = 0,
  levelProgress = 0,
}) => {
  const { user } = useAuth();

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
      {profilePicture ? (
        <img
          src={profilePicture}
          alt="avatar"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ) : (
        <Avatar sx={{ width: 100, height: 100, fontSize: "3rem" }}>
          {username.charAt(0)}
        </Avatar>
      )}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h2"
          textAlign="left"
          sx={{ fontVariationSettings: "'wght' 800" }}
        >
          Hi, {username}!
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
          }}
        >
          <Typography textAlign="left">Level {level}</Typography>
          <Typography textAlign="left">
            Earn {100 - levelProgress} points to level up
          </Typography>
        </Box>
        <Box sx={{ width: "100%", position: "relative" }}>
          <LinearProgress
            variant="determinate"
            value={levelProgress}
            valueBuffer={100}
            sx={{
              "--LinearProgress-radius": "8px",
              "--LinearProgress-progressThickness": "30px",
              height: "20px",
              boxShadow: "sm",
              borderRadius: "15px",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "primary.main",
              },
              backgroundColor: "grey.300",
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
            }}
          >
            {`${levelProgress} / 100`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

UserProfile.propTypes = {
  level: PropTypes.number,
  levelProgress: PropTypes.number,
};
