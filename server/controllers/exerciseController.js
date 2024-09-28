import Exercise from "../models/Exercise.js";

export const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.findAll();
    res.status(200).json({
      status: "200",
      message: "Success",
      data: exercises,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id);
    if (!exercise) {
      return res.status(404).json({
        status: "404",
        message: "Exercise not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: exercise,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const createExercise = async (req, res) => {
  try {
    const { name, description, demo_url } = req.body;
    const newExercise = await Exercise.create({
      name,
      description,
      demo_url,
    });
    res.status(201).json({
      status: "201",
      message: "Exercise created successfully",
      data: newExercise,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const exercise = await Exercise.findByPk(id);
    if (!exercise) {
      return res.status(404).json({
        status: "404",
        message: "Exercise not found",
      });
    }

    await exercise.update(updatedData);
    res.status(200).json({
      status: "200",
      message: "Exercise updated successfully",
      data: exercise,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;

    const exercise = await Exercise.findByPk(id);
    if (!exercise) {
      return res.status(404).json({
        status: "404",
        message: "Exercise not found",
      });
    }

    await exercise.destroy();
    res.status(200).json({
      status: "200",
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
