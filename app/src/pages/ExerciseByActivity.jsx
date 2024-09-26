import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ExerciseByGoal } from './ExerciseByGoal';


const ExerciseByActivity = () => {
    return (
      <div>
          <h1>ExerciseByActivity</h1>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<ExerciseByGoal />} />
              </Routes>
          </BrowserRouter>
      </div>
  
    )
  }
  
  export default ExerciseByActivity;
  