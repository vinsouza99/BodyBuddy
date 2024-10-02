// import React from "react";
import { useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import TrainingCard from "../components/TrainingCard";

const TrainingProgram = (props) => {
  useEffect(() => {
    setPageTitle(props.title);
  }, [props.title]);

  return (
    <div>
      <h1>TrainingProgram</h1>
      <TrainingCard title={props.title} />
    </div>
  );
};

export default TrainingProgram;
