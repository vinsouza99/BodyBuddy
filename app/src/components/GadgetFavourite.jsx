import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { GadgetBase } from './GadgetBase';

export const GadgetFavourite = () => {
  const navigate = useNavigate();

  return (
    <GadgetBase title="Your favourite moves">
      <Box>

      </Box>
      <Typography>
        Learning how to move correctly would significantly increase your efficiency.
        We have some good tips for you, check it out!
      </Typography>
      <Button
        variant="contained" 
        sx={{ 
          width: '50%',
        }}
        onClick={() => navigate('/learn')}
      >
        Start learning
      </Button>
    </GadgetBase>
  );
};