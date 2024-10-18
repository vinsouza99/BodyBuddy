import UserProgress from "../models/UserProgress.js";

export const getUserProgress = async (req, res) => {
  try {
    const userProgress = await UserProgress.findByPk(req.params.id);
    if (!userProgress) {
      return res.status(404).json({
        status: "404",
        message: "UserProgress not found",
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
    const { user_id, level_id, level_progress, streak } = req.body;
    const newUserProgress = await UserProgress.create({
      user_id,
      level_id,
      level_progress,
      streak,
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

export const deleteUserProgress = async (req, res) => {
  try {
    const { id } = req.params;

    const userProgress = await UserProgress.findByPk(id);
    if (!userProgress) {
      return res.status(404).json({
        status: "404",
        message: "UserProgress not found",
      });
    }

    await userProgress.destroy();
    res.status(200).json({
      status: "200",
      message: "UserProgress deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
