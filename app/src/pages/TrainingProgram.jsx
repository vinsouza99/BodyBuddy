import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateWorkout } from './CreateWorkout';


const TrainingProgram = () => {
    return (
      <div>
          <h1>TrainingProgram</h1>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<CreateWorkout />} />
              </Routes>
          </BrowserRouter>
      </div>
  
    )
  }
  
  export default TrainingProgram;
  