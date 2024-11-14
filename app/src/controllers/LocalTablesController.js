import axiosClient from "../utils/axiosClient";
import Goal from "../models/Goal";
import Intensity from "../models/Intensity";
import Achievement from "../models/Achievement";
import ExerciseType from "../models/ExerciseType";
import MuscleGroup from "../models/MuscleGroup";

const API_ROUTE = "local";
const API_GOALS_ROUTE = "goals";
const API_INTENSITY_ROUTE = "intensity";
const API_ACHIEVEMENT_ROUTE = "achievements";
const API_MUSCLE_GROUPS_ROUTE = "muscleGroups";
const API_TYPE_ROUTE = "types";

const getAllGoals = async () => {
  try {
    const response = await axiosClient.get(`${API_ROUTE}/${API_GOALS_ROUTE}`);
    const data = await response.data.data;
    return data.map((goal) => new Goal(goal.id, goal.name, goal.description));
  } catch (e) {
    console.error(e);
    throw e;
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
    console.error(e);
    throw e;
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
    console.error(e);
    throw e;
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
    console.error(e);
    throw e;
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
          achievement.description,
          achievement.badge_url
        )
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};
const getAchievement = async (achievement_id) => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_ACHIEVEMENT_ROUTE}/${achievement_id}`
    );
    const data = await response.data;
    return new Achievement(
      data.id,
      data.name,
      data.description,
      data.badge_url
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getAllExerciseTypes = async () => {
  try {
    const response = await axiosClient.get(`${API_ROUTE}/${API_TYPE_ROUTE}`);
    const data = await response.data;
    return data.map(
      (type) => new ExerciseType(type.id, type.name, type.default_duration)
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getExerciseType = async (type_id) => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_TYPE_ROUTE}/${type_id}`
    );
    const type = await response.data.data;
    return new ExerciseType(type.id, type.name, type.default_duration);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getAllMuscleGroups = async () => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_MUSCLE_GROUPS_ROUTE}`
    );
    const data = await response.data;
    return data.data.map(
      (muscleGroup) => new MuscleGroup(muscleGroup.id, muscleGroup.name)
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};
const getMuscleGroup = async (muscle_group_id) => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_MUSCLE_GROUPS_ROUTE}/${muscle_group_id}`
    );
    const muscleGroup = await response.data.data;
    return new MuscleGroup(muscleGroup.id, muscleGroup.name);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export {
  getAllGoals,
  getGoal,
  getAllIntensities,
  getIntensity,
  getAllAchievements,
  getAchievement,
  getAllExerciseTypes,
  getExerciseType,
  getAllMuscleGroups,
  getMuscleGroup,
};
