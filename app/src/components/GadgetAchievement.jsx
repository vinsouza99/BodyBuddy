import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { GadgetBase } from './GadgetBase';
import { WallOfFame } from './WallOfFame';


export const GadgetAchievement = () => {
  const navigate = useNavigate();
  
  return (
    <GadgetBase>
      <WallOfFame />
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