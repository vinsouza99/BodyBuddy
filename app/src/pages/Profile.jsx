import { useState, useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import Grid from "@mui/material/Grid2";
import UserInfo from "../components/UserInfo";
import History from "../components/History";
import { getUser } from "../controllers/UserController";
import { useAuth } from "../utils/AuthProvider";
import historyData from "../components/HistoryData.json";


export const Profile = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const [history, setHistory] = useState(historyData);
  const { user } = useAuth(); // For session management

  useEffect(() => {
    setPageTitle(props.title);
    async function getCurrentUser() {
      const data = await getUser(user);
      console.log(data);
      setCurrentUser(data);
    }

    getCurrentUser();


  }, [props.title, user]);

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 6 }} display={"flex"}>
          <UserInfo user={currentUser} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} display={"flex"}>
          <History data={history} />
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
