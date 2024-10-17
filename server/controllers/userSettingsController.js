import UserSettings from "../models/UserSettings.js";

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
    const {
      user_id,
      past_exercise_frequency,
      desired_intensity,
      available_days,
    } = req.body;
    const newUserSettings = await UserSettings.create({
      user_id,
      past_exercise_frequency,
      desired_intensity,
      available_days,
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

export const deleteUserSettings = async (req, res) => {
  try {
    const { id } = req.params;

    const userSettings = await UserSettings.findByPk(id);
    if (!userSettings) {
      return res.status(404).json({
        status: "404",
        message: "UserSettings not found",
      });
    }

    await userSettings.destroy();
    res.status(200).json({
      status: "200",
      message: "UserSettings deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
