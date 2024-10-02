import React from "react";
import { useEffect } from "react";
import { setPageTitle } from "../utils/utils";

const TrainingProgram = (props) => {
  useEffect(() => {
    setPageTitle(props.title);
  }, []);
  return (
    <div>
      <h1>TrainingProgram</h1>
    </div>
  );
};

export default TrainingProgram;
