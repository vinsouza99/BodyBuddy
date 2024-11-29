import { Card, Typography, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { WallOfFame } from "./WallOfFame";
import { UserProgressBar } from "./UserProgressBar";
import pencil from "/assets/icon-pencil.svg";

function UserInfo({ user = {} }) {
  // Format user birthday
  const formattedBirthday = user?.birthday
    ? new Date(user.birthday).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No birthday set";
  return (
    <>
      <Card
        sx={{
          padding: 3,
          borderRadius: 2,
          width: 1,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <Box
              style={{
                border: "solid thin lightgray",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              {user.picture ? (
                <Avatar
                  alt="Avatar"
                  src={user.picture}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Avatar
                  alt="Avatar"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                >
                  {user?.name?.charAt(0)}
                </Avatar>
              )}
            </Box>
            <Box sx={{ marginLeft: 3, textAlign: "left" }}>
              <Typography
                variant="h3"
                component="p"
                textAlign="left"
                sx={{ fontWeight: 800 }}
              >
                {user?.name}
              </Typography>
            </Box>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <img
              src={pencil}
              alt="pencil Icon"
              style={{ width: "24px", height: "24px" }}
            />
          </Box>
        </Box>

        <UserProgressBar
          level={user?.progress?.level}
          levelProgress={user?.progress?.level_progress}
        />

        <Grid marginTop={1} container spacing={5}>
          <Grid
            size={{ md: 6 }}
            display={"flex"}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ fontWeight: "800" }}>Birthday</Typography>
            <Typography>{formattedBirthday}</Typography>
          </Grid>
          <Grid
            size={{ md: 6 }}
            display={"flex"}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ fontWeight: "800" }}>Weight</Typography>
            <Typography>{user?.weight} lbs</Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontWeight: "800" }}>Primary Goal</Typography>
          <Typography sx={{ textAlign: "left" }}>
            {user?.settings?.goal?.name || "No goal set"}
          </Typography>
          <Typography sx={{ marginTop: 2, fontWeight: "800" }}>
            Exercise intensity
          </Typography>
          <Typography>
            {user?.settings?.intensity?.name || "No intensity set"}
          </Typography>
          <Typography sx={{ marginTop: 2, fontWeight: "800" }}>
            When can you exercise
          </Typography>
          <Typography>
            {Array.isArray(user?.schedule)
              ? user.schedule.join(", ")
              : user?.schedule || "No availability set"}
          </Typography>
        </Box>

        <Grid sx={{ marginTop: 2, paddingTop: 2, borderTop: 1 }}>
          <WallOfFame userInfo={user} />
        </Grid>
      </Card>
    </>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object,
};

export default UserInfo;
