import User from "../models/User.js";
import UserSchedule from "../models/UserSchedule.js";
import UserProgress from "../models/UserProgress.js";
import UserSettings from "../models/UserSettings.js";
import UserAchievement from "../models/UserAchievement.js";
import UserAccumulatedStats from "../models/UserAccumulatedStats.js";
import { toZonedTime, format } from "date-fns-tz";

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
    const { id, birthday, gender, weight, weight_unit, picture } = req.body;
    const newUser = await User.create({
      id,
      birthday,
      gender,
      weight,
      weight_unit,
      picture,
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

export const getUserAchievements = async (req, res) => {
  try {
    const user_id = req.params.id;
    const userAchievements = await UserAchievement.findAll({
      where: { user_id: user_id },
    });
    if (!userAchievements) {
      return res.status(404).json({
        status: "404",
        message: "User achievements not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: userAchievements,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const createUserAchievement = async (req, res) => {
  try {
    const { user_id, achievement_id, earned_at } = req.body;
    const userAchievement = await UserAchievement.create({
      user_id: user_id,
      achievement_id: achievement_id,
      earned_at: earned_at,
    });
    res.status(200).json({
      status: "201",
      message: "Success",
      data: userAchievement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
export const getUserAccumulatedStats = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const userAccumulatedStats = await UserAccumulatedStats.findAll({
      where: { user_id: user_id },
    });

    if (!userAccumulatedStats) {
      return res.status(404).json({
        status: "404",
        message: "User accumulated times not found",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Success",
      data: userAccumulatedStats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
export const updateUserAccumulatedStats = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const { date, minutes, calories } = req.body;
    const [userAccumulatedStats, created] =
      await UserAccumulatedStats.findOrCreate({
        where: {
          user_id: user_id,
          date: date,
        },
      });
    console.log(userAccumulatedStats);
    if (userAccumulatedStats) {
      userAccumulatedStats.minutes += minutes;
      userAccumulatedStats.caloreis += calories;
      await userAccumulatedStats.save();

      res.status(200).json({
        status: "200",
        message: "Success",
        data: userAccumulatedStats,
      });
    } else {
      throw new Error(
        "Error while finding or creating user accumulating stats"
      );
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
