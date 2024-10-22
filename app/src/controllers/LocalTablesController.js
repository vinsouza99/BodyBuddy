import axiosClient from "../utils/axiosClient";
import Goal from "../models/Goal";
import Intensity from "../models/Intensity";
import Achievement from "../models/Achievement";

const API_ROUTE = "local";
const API_GOALS_ROUTE = "goals";
const API_INTENSITY_ROUTE = "intensity";
const API_ACHIEVEMENT_ROUTE = "achievements";

const getAllGoals = async () => {
  try {
    const response = await axiosClient.get(`${API_ROUTE}/${API_GOALS_ROUTE}`);
    const data = await response.data.data;
    return data.map((goal) => new Goal(goal.id, goal.name, goal.description));
  } catch (e) {
    console.log(e);
  }
};
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

const getAllIntensities = async () => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_INTENSITY_ROUTE}`
    );
    const data = await response.data.data;
    return data.map((intensity) => new Intensity(intensity.id, intensity.name));
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
const getAllAchievements = async () => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_ACHIEVEMENT_ROUTE}`
    );
    const data = await response.data.data;
    return data.map(
      (achievement) =>
        new Achievement(
          achievement.id,
          achievement.name,
          achievement.description
        )
    );
  } catch (e) {
    console.log(e);
  }
};
export {
  getAllGoals,
  getGoal,
  getAllIntensities,
  getIntensity,
  getAllAchievements,
};
