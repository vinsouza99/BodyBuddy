import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserInfo from "../components/UserInfo";
import History from "../components/History";
import { getUser, getUserHistory } from "../controllers/UserController";
import { useAuth } from "../utils/AuthProvider";
import { useNotifications } from "@toolpad/core/useNotifications";

export const Profile = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [history, setHistory] = useState([]);
  const { user } = useAuth(); // For session management
  const notifications = useNotifications();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPageTitle(props.title);

    async function getUserData() {
      try {
        const userData = await getUser(user);
        setCurrentUser(userData);
        console.log(userData);

        const userHistoryData = await getUserHistory(user.id);
        setHistory(userHistoryData);
        console.log(userHistoryData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getUserData();
  }, []);

  useEffect(() => {
    const notification = notifications.show("Something great just happened!", {
      severity: "success",
    });
  }, []);
  return (
    <>
      {/* Backdrop for loading */}
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box textAlign="center">
          <CircularProgress color="inherit" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Box>
      </Backdrop>

      {currentUser && history ? (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} display={"flex"}>
            <UserInfo user={currentUser} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} display={"flex"}>
            <History data={history} />
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};

export default Profile;

Profile.propTypes = {
  title: PropTypes.string,
};
