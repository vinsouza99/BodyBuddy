import PropTypes from "prop-types";
import { useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import TrainingCard from "../components/TrainingCard";

export const TrainingProgram = (props) => {
  useEffect(() => {
    setPageTitle(props.title);
  }, []);

  return (
    <div>
      <h1>TrainingProgram</h1>
      <TrainingCard />
    </div>
  );
};
TrainingProgram.propTypes = {
  title: PropTypes.string,
};
