import User from "../models/User.js";
import UserSchedule from "../models/UserSchedule.js";
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

export const updateUserSettings = async (req, res) => {
  try {
    const user_id = req.params.id;
    const updatedData = req.body;

    const userSettings = await UserSettings.findByPk(user_id);
    if (!userSettings) {
      return res.status(404).json({
        status: "404",
        message: "User Settings not found",
      });
    }
    await userSettings.update(updatedData);
    res.status(200).json({
      status: "200",
      message: "User Settings updated successfully",
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

export const getUserSchedule = async (req, res) => {
  try {
    const user_id = req.params.id;
    const userSchedule = await UserSchedule.findAll({
      where: { user_id: user_id },
    });
    if (!userSchedule) {
      return res.status(404).json({
        status: "404",
        message: "User Schedule not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: userSchedule,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
export const createUserSchedule = async (req, res) => {
  try {
    const user_id = req.params.id;
    const { day } = req.body;
    console.log("day: " + day);
    const newAvailableDay = await UserSchedule.create({
      user_id: user_id,
      day: day,
      active: true,
    });
    res.status(201).json({
      status: "201",
      message: "User schedule created successfully",
      data: newAvailableDay,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
export const updateUserSchedule = async (req, res) => {
  try {
    const user_id = req.params.id;
    const { newActiveValue, day } = req.body;
    const updatedData = { user_id: user_id, day: day, active: newActiveValue };
    const userSchedule = await UserSchedule.findOne({
      where: { user_id: user_id, day: day },
    });
    if (!userSchedule) {
      return res.status(404).json({
        status: "404",
        message: "User Schedule not found",
      });
    }
    await userSchedule.update(updatedData);
    res.status(200).json({
      status: "200",
      message: "User Schedule updated successfully",
      data: userSchedule,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
