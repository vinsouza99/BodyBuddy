import Goal from "../models/Goal.js";

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.findAll();
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
    const goal = await Goal.findByPk(req.params.id);
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

export const createGoal = async (req, res) => {
  try {
    const { id, name, description } = req.body;
    const newGoal = await Goal.create({
      id,
      name,
      description,
    });
    res.status(201).json({
      status: "201",
      message: "Goal created successfully",
      data: newGoal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const goal = await Goal.findByPk(id);
    if (!goal) {
      return res.status(404).json({
        status: "404",
        message: "Goal not found",
      });
    }

    await goal.update(updatedData);
    res.status(200).json({
      status: "200",
      message: "Goal updated successfully",
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

export const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;

    const goal = await Goal.findByPk(id);
    if (!goal) {
      return res.status(404).json({
        status: "404",
        message: "Goal not found",
      });
    }

    await goal.destroy();
    res.status(200).json({
      status: "200",
      message: "Goal deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
