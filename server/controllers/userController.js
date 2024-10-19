import User from "../models/User.js";
import UserGoal from "../models/UserGoal.js";
import UserProgress from "../models/UserProgress.js";
import UserSettings from "../models/UserSettings.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      status: "200",
      message: "Success",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "404",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { id, birthday, gender, weight, weight_unit } = req.body;
    const newUser = await User.create({
      id,
      birthday,
      gender,
      weight,
      weight_unit,
    });
    res.status(201).json({
      status: "201",
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: "404",
        message: "User not found",
      });
    }

    await user.update(updatedData);
    res.status(200).json({
      status: "200",
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: "404",
        message: "User not found",
      });
    }

    await user.destroy();
    res.status(200).json({
      status: "200",
      message: "User deleted successfully",
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
    const user_id = req.params.user_id;
    const goal_id = req.params.goal_id;

    const newUserGoal = await UserGoal.create({
      user_id,
      goal_id,
    });
    res.status(201).json({
      status: "201",
      message: "User Goal created successfully",
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

export const updateUserGoal = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const goal_id = req.params.goal_id;
    const { new_goal_id } = req.body;

    await UserGoal.update(
      { goal_id: new_goal_id },
      {
        where: {
          user_id: user_id,
          goal_id: goal_id,
        },
      }
    );
    res.status(200).json({
      status: "200",
      message: "User Goal updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
export const getUserProgress = async (req, res) => {
  try {
    const userProgress = await UserProgress.findByPk(req.params.id);
    if (!userProgress) {
      return res.status(404).json({
        status: "404",
        message: "User Progress not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: userProgress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const createUserProgress = async (req, res) => {
  try {
    const user_id = req.params.id;
    const { level, level_progress, streak, highest_streak } = req.body;
    const newUserProgress = await UserProgress.create({
      user_id,
      level,
      level_progress,
      streak,
      highest_streak,
    });
    res.status(201).json({
      status: "201",
      message: "UserProgress created successfully",
      data: newUserProgress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const updateUserProgress = async (req, res) => {
  try {
    const { user_id } = req.params;
    const updatedData = req.body;

    const userProgress = await UserProgress.findByPk(user_id);
    if (!userProgress) {
      return res.status(404).json({
        status: "404",
        message: "UserProgress not found",
      });
    }

    await userProgress.update(updatedData);
    res.status(200).json({
      status: "200",
      message: "UserProgress updated successfully",
      data: userProgress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getUserSettings = async (req, res) => {
  try {
    const userSettings = await UserSettings.findByPk(req.params.id);
    if (!userSettings) {
      return res.status(404).json({
        status: "404",
        message: "User Settings not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: userSettings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const createUserSettings = async (req, res) => {
  try {
    const user_id = req.params.id;
    const { intensity_id, goal_id } = req.body;
    const newUserSettings = await UserSettings.create({
      user_id,
      intensity_id,
      goal_id,
    });
    res.status(201).json({
      status: "201",
      message: "User Settings created successfully",
      data: newUserSettings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const updateUserSettings = async (req, res) => {
  try {
    const { user_id } = req.params;
    const updatedData = req.body;

    const userSettings = await UserSettings.findByPk(user_id);
    if (!userSettings) {
      return res.status(404).json({
        status: "404",
        message: "UserSettings not found",
      });
    }

    await userSettings.update(updatedData);
    res.status(200).json({
      status: "200",
      message: "UserSettings updated successfully",
      data: userSettings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
