import { Box, Typography, Button } from '@mui/material';
import { GadgetBase } from './GadgetBase';
import { MetricCard } from '../components/routine-session/MetricCard';

export const GadgetSchedule = () => {
  return (
    <GadgetBase title="Your plan">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <MetricCard title="Week Streaks" value="5" />
        <MetricCard title="Best Streaks" value="5" />
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