import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { GadgetBase } from './GadgetBase';

export const GadgetAchievement = () => {
  const navigate = useNavigate();
  
  return (
    <GadgetBase title="Wall of Fame">
      <Box>

      </Box>
      <Typography>
        Keep up with your exercise plan to earn new surprised
      </Typography>
      <Button
        variant="contained" 
        sx={{ 
          width: '50%',
        }}
        onClick={() => navigate('/training')}
      >
        My program
      </Button>
    </GadgetBase>
  );
};