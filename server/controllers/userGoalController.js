import UserGoal from "../models/UserGoal.js";

export const getUserGoals = async (req, res) => {
  try {
    const user_id = req.params.id;
    const userGoals = await UserGoal.findAll({
      where: {
        user_id: user_id,
      },
    });
    res.status(200).json({
      status: "200",
      message: "Success",
      data: userGoals,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getUserGoal = async (req, res) => {
  try {
    const { user_id, goal_id } = req.body;
    const userGoal = await UserGoal.findOne({
      where: {
        user_id: user_id,
        goal_id: goal_id,
      },
    });
    if (!userGoal) {
      return res.status(404).json({
        status: "404",
        message: "User Goal not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: userGoal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const createUserGoal = async (req, res) => {
  try {
    const { user_id, goal_id } = req.body;
    const newUserGoal = await UserGoal.create({
      user_id,
      goal_id,
    });
    res.status(201).json({
      status: "201",
      message: "USer Goal created successfully",
      data: newUserGoal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const deleteUserGoal = async (req, res) => {
  try {
    const { user_id, goal_id } = req.params;

    const userGoal = await UserGoal.findOne({
      where: {
        user_id: user_id,
        goal_id: goal_id,
      },
    });
    if (!userGoal) {
      return res.status(404).json({
        status: "404",
        message: "User Goal not found",
      });
    }

    await userGoal.destroy();
    res.status(200).json({
      status: "200",
      message: "User Goal deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
