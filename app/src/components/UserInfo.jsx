import {
  Card,
  Typography,
  Avatar,
} from '@mui/material';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Chip from "@mui/material/Chip";



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
    }),
}));

// TERU is Setting Click Action for "Setting" & "Logout" chips
const handleClick = () => {
  console.info('You clicked the Chip.');
};

function UserInfo() {
return (
  <>

  <Card sx={{ padding: 3, borderRadius: 2}}>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Avatar alt="Haley Grimes" src="/static/images/avatar/1.jpg" sx={{ width: 100, height: 100 }} />
    </Box>

    <Typography variant="h3" component="p" align='center' sx={{ margin: 3 }}>
      Haley Grimes
    </Typography>
    <Grid container spacing={1} sx={{ margin: 3 }} >
      <Grid size={{ sm: 12, md: 6 }}>
        <Card style={{ border: "none", boxShadow: "none" }}>
          <Grid>
            <Typography variant="body2" component="p">
              Birthday: June 19,1995
            </Typography>
            <Typography variant="body2" component="p">
              Plan: Premium
            </Typography>
            <Typography variant="body2" component="p">
              Daily Goal: 5 sets
            </Typography>
          </Grid>
        </Card>
      </Grid>
      <Grid size={{ sm: 12, md: 6 }}>
        <Card style={{ border: "none", boxShadow: "none" }}>
          <Typography variant="body2" component="p">
            Bio: I tries hard to establish a routine of working out to stay healthy and energetic, but among work and family responsibilities, I struggles to find time to do so.
          </Typography>
        </Card>
      </Grid>
    </Grid>

    <Box sx={{ display: "flex", gap: 5, justifyContent: "center", margin: 3 }}>
      <Chip label="SETTING" variant="outlined" onClick={handleClick} />
      <Chip label="LOGOUT" variant="outlined" onClick={handleClick} />
    </Box>

      <Grid>
        <Box sx={{ padding: 3, display: "flex", gap: 5, justifyContent: "center", borderTop: 1　}}>
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
                        Highest Scores
              </Typography>
              <Typography variant="h3" component="p">
                        98
              </Typography>
              <Typography variant="body2" component="p">
                        /Marks
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
        </Box>
      </Grid>
  </Card>

</>
);
}

export default UserInfo;