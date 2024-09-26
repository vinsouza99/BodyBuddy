import React from 'react'
import { TrainingProgram } from './TrainingProgram';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



const Assesment = () => {
  return (
    <div>
        <h1>Assesment</h1>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TrainingProgram />} />
            </Routes>
        </BrowserRouter>
    </div>

  )
}

export default Assesment;
