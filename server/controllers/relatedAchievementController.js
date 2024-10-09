import RelatedAchievement from "../models/RelatedAchievement.js";

export const getRelatedAchievements = async (req, res) => {
  try {
    const relatedAchievements = await RelatedAchievement.findAll();
    res.status(200).json({
      status: "200",
      message: "Success",
      data: relatedAchievements,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getRelatedAchievement = async (req, res) => {
  try {
    const relatedAchievement = await RelatedAchievement.findByPk(req.params.id);
    if (!relatedAchievement) {
      return res.status(404).json({
        status: "404",
        message: "Related Achievement not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: relatedAchievement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const createRelatedAchievement = async (req, res) => {
  try {
    const { id, user_id, achievement_id } = req.body;
    const newRelatedAchievement = await RelatedAchievement.create({
      id,
      user_id,
      achievement_id,
    });
    res.status(201).json({
      status: "201",
      message: "Related Achi created successfully",
      data: newRelatedAchievement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const updateRelatedAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const relatedAchievement = await RelatedAchievement.findByPk(id);
    if (!relatedAchievement) {
      return res.status(404).json({
        status: "404",
        message: "Related Achievement not found",
      });
    }

    await relatedAchievement.update(updatedData);
    res.status(200).json({
      status: "200",
      message: "Related Achievement updated successfully",
      data: relatedAchievement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const deleteRelatedAchievement = async (req, res) => {
  try {
    const { id } = req.params;

    const relatedAchievement = await RelatedAchievement.findByPk(id);
    if (!relatedAchievement) {
      return res.status(404).json({
        status: "404",
        message: "Related Achievement not found",
      });
    }

    await relatedAchievement.destroy();
    res.status(200).json({
      status: "200",
      message: "Related Achievement deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
