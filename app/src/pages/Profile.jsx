import { useState, useEffect } from "react";


import { setPageTitle } from '../utils/utils';
import Grid from '@mui/material/Grid2';


import UserInfo from '../components/UserInfo';
import History from "../components/History";

export const Profile = (props) => {
  useEffect(() => {
    setPageTitle(props.title);
  }, [props.title]);

  return (
    <>
    <Grid container spacing={1}>
      <Grid size={{xs:12, md:8}} display={"flex"}>
        <UserInfo />
      </Grid>
      <Grid size={{xs:12, md:4}} display={"flex"}>
        <History />
      </Grid>
    </Grid>
    </>
  );
}

export default Profile;