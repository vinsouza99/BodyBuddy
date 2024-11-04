import { Card, Typography, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { WallOfFame } from "./WallOfFame";
import { UserProgressBar } from "./UserProgressBar";

function UserInfo({ user = {} }) {
  console.log(user);
  console.log(user.name);
  return (
    <>
      <Card sx={{ padding: 3, borderRadius: 2, width: 1 }}>
        <Grid sx={{ display: "flex", alignItems: "center" }}>
          <Box>
            {user.picture ? (
              <Avatar
                alt="Avatar"
                src={user.picture}
                sx={{ width: 130, height: 130 }}
              />
            ) : (
              <Avatar alt="Avatar" sx={{ width: 130, height: 130 }}>
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
            <Typography sx={{ fontWeight: "800" }}>
              Birthday
            </Typography>
            <Typography>{user?.birthday}</Typography>
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
            <Typography sx={{ fontWeight: "800" }}>
              Weight
            </Typography>
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
            Exercise frequency
          </Typography>
          <Typography>
            {user?.settings?.frequency || "No frequency set"}
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