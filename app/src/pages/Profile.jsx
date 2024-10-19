import { useState, useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import Grid from "@mui/material/Grid2";
import UserInfo from "../components/UserInfo";
import History from "../components/History";
import { getUser } from "../controllers/UserController";
import { useAuth } from "../utils/AuthProvider";

export const Profile = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const { user } = useAuth(); // For session management

  useEffect(() => {
    setPageTitle(props.title);
    async function getCurrentUser() {
      const data = await getUser(user.id);
      console.log(data);
      setCurrentUser(data);


    }
    getCurrentUser();
  }, []);

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 6 }} display={"flex"}>
          <UserInfo user={currentUser}/>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} display={"flex"}>
          <History />
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
