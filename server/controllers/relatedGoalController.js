import RelatedGoal from "../models/RelatedGoal.js";

export const getRelatedGoals = async (req, res) => {
  try {
    const relatedGoals = await RelatedGoal.findAll();
    res.status(200).json({
      status: "200",
      message: "Success",
      data: relatedGoals,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getRelatedGoal = async (req, res) => {
  try {
    const relatedGoal = await RelatedGoal.findByPk(req.params.id);
    if (!relatedGoal) {
      return res.status(404).json({
        status: "404",
        message: "Related Goal not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: relatedGoal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const createRelatedGoal = async (req, res) => {
  try {
    const { id, user_id, goal_id, exercise_id, routine_id, program_id } =
      req.body;
    const newRelatedGoal = await RelatedGoal.create({
      id,
      user_id,
      goal_id,
      exercise_id,
      routine_id,
      program_id,
    });
    res.status(201).json({
      status: "201",
      message: "Related Goal created successfully",
      data: newRelatedGoal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const updateRelatedGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const relatedGoal = await RelatedGoal.findByPk(id);
    if (!relatedGoal) {
      return res.status(404).json({
        status: "404",
        message: "Related Goal not found",
      });
    }

    await relatedGoal.update(updatedData);
    res.status(200).json({
      status: "200",
      message: "Related Goal updated successfully",
      data: relatedGoal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const deleteRelatedGoal = async (req, res) => {
  try {
    const { id } = req.params;

    const relatedGoal = await RelatedGoal.findByPk(id);
    if (!relatedGoal) {
      return res.status(404).json({
        status: "404",
        message: "Related Goal not found",
      });
    }

    await relatedGoal.destroy();
    res.status(200).json({
      status: "200",
      message: "Related Goal deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
