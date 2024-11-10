import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setPageTitle } from "../utils/utils";
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
  const navigate = useNavigate();

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
        navigate("/error", {
          errorDetails:
            "There was an error while loading user's information... try again later.",
        });
      } finally {
        setLoading(false);
      }
    }
    getUserData();
  }, []);
  return (
    <>
      {/* Backdrop for loading */}
      <LoadingBackdrop loading={loading} />

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
