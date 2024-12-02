import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setPageTitle } from "../utils/utils";
import { Box, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserInfo from "../components/UserInfo";
import History from "../components/History";
import { getUser, getUserHistory } from "../controllers/UserController";
import { useAuth } from "../utils/AuthProvider";
import { LoadingBackdrop } from "../components/LoadingBackdrop.jsx";

export const Profile = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [history, setHistory] = useState([]);
  const { user } = useAuth(); // For session management
  const [loading, setLoading] = useState(true);
  const [loadingHistoryData, setLoadingHistoryData] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle(props.title);

    async function getUserData() {
      try {
        const userData = await getUser(user);
        setCurrentUser(userData);
        setLoading(false);
        const userHistoryData = await getUserHistory(user.id);
        setHistory(userHistoryData);
      } catch (error) {
        navigate("/error", {
          errorDetails:
            "There was an error while loading user's information... try again later.",
        });
      } finally {
        setLoadingHistoryData(false);
      }
    }
    getUserData();
  }, []);
  return (
    <>
      {/* Backdrop for loading */}
      <LoadingBackdrop loading={loading} />
      <Grid container spacing={2}>
        {loading ? (
          <>
            <Box flex={1} display={"flex"} gap={1} flexDirection="column">
              <Box display="flex" gap={2} padding={2}>
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={140}
                  height={140}
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={3}
                  flexGrow={1}
                  justifyContent={"center"}
                >
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={250}
                    height={30}
                  />
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={150}
                    height={30}
                  />
                </Box>
              </Box>
              <Skeleton animation="wave" variant="rectangular" height={30} />
              <Skeleton animation="wave" variant="rectangular" height="300px" />
            </Box>
            <Box display="flex" padding={2} flex={1}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"100%"}
                height={"500px"}
                display="flex"
                flexGrow={1}
              />
            </Box>
          </>
        ) : currentUser && history ? (
          <>
            <Grid
              size={{ xs: 12, md: 6 }}
              display={"flex"}
              style={{ height: "850px" }}
            >
              <UserInfo user={currentUser} />
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              display={"flex"}
              style={{ height: "850px" }}
            >
              <History data={history} loading={loadingHistoryData} />
            </Grid>
          </>
        ) : null}
      </Grid>
    </>
  );
};

export default Profile;

Profile.propTypes = {
  title: PropTypes.string,
};
