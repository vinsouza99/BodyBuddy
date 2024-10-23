import PropTypes from "prop-types";
import { Box, Typography, Button } from '@mui/material';
import { GadgetBase } from './GadgetBase';
import { MetricCard } from './routine-session/MetricCard';
import flame1 from '../assets/flame-solid_1.png';
import flame2 from '../assets/flame-solid_2.png';

export const GadgetStreaks = ({ userProgress = null }) => {
  return (
    <GadgetBase>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <img src={flame1} alt="Flame 1"></img>
          <MetricCard
            title="Week Streaks"
            value={userProgress ? String(userProgress.streak) : "0"}
            color="black"/>
        </Box>
        <Box>
          <img src={flame2} alt="Flame 2"></img>
          <MetricCard
            title="Best Streaks"
            value={userProgress ? String(userProgress.highest_streak) : "0"}
            color="black" />
        </Box>
      </Box>
      <Typography>
        Exercise at least 3 times a week to keep your streak not reset
      </Typography>
      <Button
        variant="contained" 
        sx={{ 
          width: '50%',
        }} 
      >
        Start Today&apos;sexercise
      </Button>
    </GadgetBase>
  );
};

GadgetStreaks.propTypes = {
  userProgress: PropTypes.object,
};