import Achievement from "../models/Achievement.js";

export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.findAll();
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
    const achievement = await Achievement.findByPk(req.params.id);
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

export const createAchievement = async (req, res) => {
  try {
    const { id, name, description } = req.body;
    const newAchievement = await Achievement.create({
      id,
      name,
      description,
    });
    res.status(201).json({
      status: "201",
      message: "Achievement created successfully",
      data: newAchievement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const achievement = await Achievement.findByPk(id);
    if (!achievement) {
      return res.status(404).json({
        status: "404",
        message: "Achievement not found",
      });
    }

    await achievement.update(updatedData);
    res.status(200).json({
      status: "200",
      message: "Achievement updated successfully",
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

export const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;

    const achievement = await Achievement.findByPk(id);
    if (!achievement) {
      return res.status(404).json({
        status: "404",
        message: "Achievement not found",
      });
    }

    await achievement.destroy();
    res.status(200).json({
      status: "200",
      message: "Achievement deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
