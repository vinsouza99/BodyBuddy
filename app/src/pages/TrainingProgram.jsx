import React from "react";
import { useEffect } from "react";
<<<<<<< Updated upstream
import { setPageTitle } from "../utils";
=======
<<<<<<< Updated upstream
import { setPageTitle } from "../utils/utils";
=======
import { setPageTitle } from "../utils";
import TrainingCard from "../components/TrainingCard"
>>>>>>> Stashed changes
>>>>>>> Stashed changes

const TrainingProgram = (props) => {
  useEffect(() => {
    setPageTitle(props.title);
  }, []);
  return (
    <div>
      <h1>TrainingProgram</h1>
      <TrainingCard/>
    </div>
  );
};

export default TrainingProgram;
