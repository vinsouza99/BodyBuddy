import axiosClient from "../utils/axiosClient";
import Goal from "../models/Goal";
import Intensity from "../models/Intensity";

const API_ROUTE = "local";
const API_GOALS_ROUTE = "goals";
const API_INTENSITY_ROUTE = "intensity";

const getGoal = async (goal_id) => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_GOALS_ROUTE}/${goal_id}`
    );
    const data = await response.data.data;
    return new Goal(data.id, data.name, data.description);
  } catch (e) {
    console.log(e);
  }
};
const getIntensity = async (intensity_id) => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_INTENSITY_ROUTE}/${intensity_id}`
    );
    const data = await response.data.data;
    return new Intensity(data.id, data.name);
  } catch (e) {
    console.log(e);
  }
};

export { getGoal, getIntensity };
