import PropTypes from "prop-types";
import { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
// import { getAllExercises } from '../controllers/ExerciseController';
// import axiosClient from '../utils/axiosClient';
import { GadgetBase } from './GadgetBase';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const GadgetFavourite = ({ exerciseInfo = null }) => {
  const navigate = useNavigate();
  // const [exerciseInfo, setExerciseInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 2;
  const totalPages = Math.ceil(exerciseInfo.length / itemsPerPage);

  const currentItems = exerciseInfo.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };
  
  const handlePrevious = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const filledItems = [...currentItems];
  while (filledItems.length < itemsPerPage) {
    filledItems.push({
      id: `dummy-${filledItems.length}`,
      name: 'dummy',
    });
  }

  // useEffect(() => {
  //   // Get all exercise information from the database
  //   const fetchExerciseInfo = async () => {
  //     try {
  //       const response = await getAllExercises();     
  //       setExerciseInfo(response);
  //     } catch (error) {
  //       console.error("Error fetching exercise:", error);
  //     }
  //   };
  //   fetchExerciseInfo();
  // }, []);

  return (
    <GadgetBase title="Your favourite moves">
      <Box 
        sx={{
          display: 'flex',
          direction: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <IconButton
          sx={{
            "&:focus": { outline: 'none' },
            "&:hover": { backgroundColor: 'transparent' },
            alignSelf: 'center',
          }}
          onClick={handlePrevious}
        >
          <ArrowBackIosNewIcon />
        </IconButton>   

        {filledItems.map((exercise) => (
          <Box
            key={exercise.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box 
              sx={{
                maxWidth: '200px',
                height: '200px',
                backgroundColor: 'white',
                padding: '10px',
                boxSizing: 'border-box',
                borderRadius: '15px',
                border: exercise.name == "dummy" ? '' : '1px solid #E8E8E8',
              }}
            >
              {exercise.name == "dummy" ? null :
                <img
                  src={exercise.demo_url}
                  alt={exercise.name}
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'contain',
                    backgroundColor: 'white',
                  }}
                />
              }
            </Box>
            <Typography>
              {exercise.name == "dummy" ? '' : exercise.name}
            </Typography>
          </Box>
        ))}

        <IconButton 
          onClick={handleNext}
          sx={{
            "&:focus": { outline: 'none' },
            "&:hover": { backgroundColor: 'transparent' },
            alignSelf: 'center',
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>

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

GadgetFavourite.propTypes = {
  exerciseInfo: PropTypes.array,
};