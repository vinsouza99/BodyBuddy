import PropTypes from "prop-types";
import { Box, Typography, Avatar } from "@mui/material";
import { UserProgressBar } from "./UserProgressBar";

export const UserProfile = ({
  username = "",
  profilePicture,
  level = 0,
  levelProgress = 0,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: 2,
        alignItems: "start",
      }}
    >
      {profilePicture ? (
        <Box
          style={{
            border: "solid thin lightgray",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <img
            src={profilePicture}
            alt="avatar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      ) : (
        <Avatar sx={{ width: 100, height: 100, fontSize: "3rem" }}>
          {username.charAt(0)}
        </Avatar>
      )}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          textAlign="left"
          sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
        >
          Hi, {username}!
        </Typography>
        <Box sx={{ width: "100%", position: "relative" }}>
          <UserProgressBar level={level} levelProgress={levelProgress} />
        </Box>
      </Box>
    </Box>
  );
};

UserProfile.propTypes = {
  level: PropTypes.number,
  levelProgress: PropTypes.number,
  profilePicture: PropTypes.string,
  username: PropTypes.string,
};
