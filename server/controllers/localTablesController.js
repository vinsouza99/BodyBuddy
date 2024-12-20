import Intensity from "../models/Intensity.js";
import Goal from "../models/Goal.js";
import Achievement from "../models/Achievement.js";
import MuscleGroup from "../models/MuscleGroup.js";
import Type from "../models/Type.js";

export const getIntensities = async (req, res) => {
  try {
    const IntensityList = await Intensity.findAll();
    res.set("Cache-Control", "public, max-age=3600");
    res.status(200).json({
      status: "200",
      message: "Success",
      data: IntensityList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
export const getIntensity = async (req, res) => {
  try {
    const intensity_id = req.params.intensity_id;
    const intensity = await Intensity.findByPk(intensity_id);
    if (!intensity) {
      return res.status(404).json({
        status: "404",
        message: "Intensity not found",
      });
    }
    res.set("Cache-Control", "public, max-age=3600");
    res.status(200).json({
      status: "200",
      message: "Success",
      data: intensity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.findAll();
    if (!goals) {
      return res.status(404).json({
        status: "404",
        message: "Goals not found",
      });
    }
    res.set("Cache-Control", "public, max-age=3600");
    res.status(200).json({
      status: "200",
      message: "Success",
      data: goals,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
export const getGoal = async (req, res) => {
  try {
    const goal_id = req.params.goal_id;
    const goal = await Goal.findByPk(goal_id);
    if (!goal) {
      return res.status(404).json({
        status: "404",
        message: "Goal not found",
      });
    }
    res.set("Cache-Control", "public, max-age=3600");
    res.status(200).json({
      status: "200",
      message: "Success",
      data: goal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.findAll();
    if (!achievements) {
      return res.status(404).json({
        status: "404",
        message: "Achivements not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: achievements,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
export const getAchievement = async (req, res) => {
  try {
    const achievement_id = req.params.achievement_id;
    const achievement = await Achievement.findByPk(achievement_id);
    if (!achievement) {
      return res.status(404).json({
        status: "404",
        message: "Achievement not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: achievement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
export const getMuscleGroups = async (req, res) => {
  try {
    const muscleGroups = await MuscleGroup.findAll();
    if (!muscleGroups) {
      return res.status(404).json({
        status: "404",
        message: "MuscleGroups not found",
      });
    }
    res.set("Cache-Control", "public, max-age=3600");
    res.status(200).json({
      status: "200",
      message: "Success",
      data: muscleGroups,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
export const getMuscleGroup = async (req, res) => {
  try {
    const muscle_group_id = req.params.muscle_group_id;
    const muscleGroup = await MuscleGroup.findByPk(muscle_group_id);
    if (!muscleGroup) {
      return res.status(404).json({
        status: "404",
        message: "MuscleGroup not found",
      });
    }
    res.set("Cache-Control", "public, max-age=3600");
    res.status(200).json({
      status: "200",
      message: "Success",
      data: muscleGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
export const getTypes = async (req, res) => {
  try {
    const types = await Type.findAll();
    if (!types) {
      return res.status(404).json({
        status: "404",
        message: "Types not found",
      });
    }
    res.set("Cache-Control", "public, max-age=3600");
    res.status(200).json({
      status: "200",
      message: "Success",
      data: types,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
export const getType = async (req, res) => {
  try {
    const type_id = req.params.type_id;
    const type = await Type.findByPk(type_id);
    if (!type) {
      return res.status(404).json({
        status: "404",
        message: "Type not found",
      });
    }
    res.set("Cache-Control", "public, max-age=3600");
    res.status(200).json({
      status: "200",
      message: "Success",
      data: type,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
