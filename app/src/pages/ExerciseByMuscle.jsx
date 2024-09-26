import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ExerciseByActivity } from './ExerciseByActivity';



const ExerciseByMuscle = () => {
  return (
    <div>
        <h1>ExerciseByMuscle</h1>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ExerciseByActivity />} />
            </Routes>
        </BrowserRouter>
    </div>

  )
}

export default ExerciseByMuscle;
