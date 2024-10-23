import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

export const RoutineExercisesList = ({ routineExercises = null }) => {
  return (
    <>
      <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', gap: 2}}>
        {routineExercises.map((exercise, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: '50px',
              width: '100%',
              height: '80px',
              boxShadow: 3,
            }}
          >
            <Box
              component="img"
              src={exercise.demo_url}
              alt={exercise.name}
              sx={{
                border: '2px solid',
                borderColor: 'secondary.main',
                borderRadius: '50px',
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                marginRight: '1rem',
              }}
            />
            <Typography sx={{ width: '100%', textAlign: 'left' }}>
              {exercise.name}
            </Typography>
            <Typography sx={{ width: '100%', textAlign: 'right' }}>
              {exercise.reps} Reps
            </Typography>
            <Typography sx={{ width: '100%', textAlign: 'center' }}>
              {exercise.sets} Sets
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  )
}

RoutineExercisesList.propTypes = {
  routineExercises: PropTypes.array,
};