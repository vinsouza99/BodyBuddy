import { Card, Typography, Avatar } from "@mui/material";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";
import { WallOfFame } from './WallOfFame';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

// TERU is Setting Click Action for "Setting" & "Logout" chips
const handleClick = () => {
  console.info("You clicked the Chip.");
};

function UserInfo(props) {
  const { user } = props;
  return (
    <>
      <Card sx={{ padding: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            alt="Haley Grimes"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 100, height: 100 }}
          />
        </Box>

        <Typography 
          variant="h3" 
          component="p" 
          align='center' 
          sx={{ margin: 3 }}
        >
        Haley Grimes
        {/* {user.name} */}
        </Typography>
        <Typography 
          variant="body2" 
          component="p"
        >
        {/* Birthday: {user.birthday} */}
        Birthday: 1988-10-25
        </Typography>
        <Typography 
          variant="body2" 
          component="p">
        {/* BWeight: {user.weight} */}
        Weight: 144 Lbs
        </Typography>
        <Box 
          sx={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}
        >
          {/* <Typography>`Primary Goal: {user.goal}`</Typography> */}
          <Typography>Primary Goal</Typography>
          <Typography>Exercise frequency</Typography>
          <Typography>Exercise intensity</Typography>
          <Typography>When can you exercise</Typography>
        </Box>

        <Grid sx={{ marginTop: 3, borderTop: 1 }}>
        <WallOfFame />
        </Grid>

      </Card>
    </>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object,
};


export default UserInfo;

        {/* <Box sx={{ padding: 3, display: "flex", gap: 5, justifyContent: "center", borderBottom: 1 }}>
          <CardContent>
              <Typography variant="body2" component="p">
                        Reach Goals
              </Typography>
              <Typography variant="h3" component="p">
                        148
              </Typography>
              <Typography variant="body2" component="p">
                        /times
              </Typography>
          </CardContent>
          <CardContent>
              <Typography variant="body2" component="p">
                        Week Continulty
              </Typography>
              <Typography variant="h3" component="p">
                        20
              </Typography>
              <Typography variant="body2" component="p">
                        /Weeks
              </Typography>
          </CardContent>
        </Box> */}

    {/* <Box sx={{ display: "flex", gap: 5, justifyContent: "center", margin: 3 }}>
      <Chip label="SETTING" variant="outlined" onClick={handleClick} />
      <Chip label="LOGOUT" variant="outlined" onClick={handleClick} />
    </Box> */}

