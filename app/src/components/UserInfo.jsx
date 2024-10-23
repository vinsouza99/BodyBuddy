import { Card, Typography, Avatar, LinearProgress } from "@mui/material";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";
import { WallOfFame } from './WallOfFame';
import theme from '../theme';




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

function UserInfo({user}) {
  // const { user } = props;
  // console.log(props);
  console.log(user)
  console.log(user.name)
  return (
    <>
      <Card sx={{ padding: 3, borderRadius: 2, width: 1}}>
        <Grid
          sx={{display: 'flex', alignItems: 'flex-start' }}
        >
          <Box>
            <Avatar
              alt="Avatar"
              // src={user.picture}
              src="/static/images/avatar/1.jpg"
              sx={{ width: 130, height: 130 }}
            />
          </Box>

          <Box>
            <Typography 
              variant="h3" 
              component="p" 
              align='center' 
              sx={{ margin: 3 }}
            >
            {user.name}
            </Typography>
            <Typography 
              variant="body2" 
              component="p"
            >
            Birthday: {user.birthday}
            </Typography>
            <Typography 
              variant="body2" 
              component="p">
            Weight: {user.weight}
            </Typography>
          </Box>
        </Grid>

          <Typography textAlign="left" >Level 0</Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  variant="determinate"
                  value={10}
                  sx={{
                    '--LinearProgress-radius': '8px',
                    '--LinearProgress-progressThickness': '30px',
                    height: '30px',
                    boxShadow: 'sm',
                    borderRadius: '15px',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: theme.palette.primary.main,
                    },
                    backgroundColor: 'grey.300',
                  }}
                >
                </LinearProgress>
              </Box>
        <Box 
          sx={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}
        >
          <Typography>Primary Goal: {user.settings.goal.name || "No goal set"}</Typography>

          {/* <Typography>Exercise frequency: {user.settings.frequency.name || "No frequency set"}</Typography> */}
          <Typography>Exercise frequency: {}</Typography>

          <Typography>Exercise intensity: {user.settings.intensity.name || "No intensity set"}</Typography>

          <Typography>When can you exercise: {user.schedule || "No availability set"}</Typography>

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

