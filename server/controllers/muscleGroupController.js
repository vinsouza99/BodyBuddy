import MuscleGroup from "../models/MuscleGroup.js";

export const getMuscleGroups = async (req, res) => {
  try {
    const muscleGroups = await MuscleGroup.findAll();
    res.status(200).json({
      status: "200",
      message: "Success",
      data: muscleGroups,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getMuscleGroup = async (req, res) => {
  try {
    const muscleGroup = await MuscleGroup.findByPk(req.params.id);
    if (!muscleGroup) {
      return res.status(404).json({
        status: "404",
        message: "Muscle Group not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: muscleGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const createMuscleGroup = async (req, res) => {
  try {
    const { id, name, description } = req.body;
    const newMuscleGroup = await MuscleGroup.create({
      id,
      name,
      description,
    });
    res.status(201).json({
      status: "201",
      message: "Muscle Group created successfully",
      data: newMuscleGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const updateMuscleGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const muscleGroup = await MuscleGroup.findByPk(id);
    if (!muscleGroup) {
      return res.status(404).json({
        status: "404",
        message: "Muscle Group not found",
      });
    }

    await muscleGroup.update(updatedData);
    res.status(200).json({
      status: "200",
      message: "Muscle Group updated successfully",
      data: muscleGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const deleteMuscleGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const muscleGroup = await MuscleGroup.findByPk(id);
    if (!muscleGroup) {
      return res.status(404).json({
        status: "404",
        message: "Muscle Group not found",
      });
    }

    await muscleGroup.destroy();
    res.status(200).json({
      status: "200",
      message: "Muscle Group deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
