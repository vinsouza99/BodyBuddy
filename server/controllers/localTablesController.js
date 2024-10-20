import Intensity from "../models/Intensity.js";
import Goal from "../models/Goal.js";

export const getIntensities = async (req, res) => {
  try {
    const IntensityList = await Intensity.findAll();
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
