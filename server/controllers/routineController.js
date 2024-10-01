import Routine from "../models/Routine.js";

export const getRoutines = async (req, res) => {
  try {
    const routines = await Routine.findAll();
    res.status(200).json({
      status: "200",
      message: "Success",
      data: routines,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getRoutine = async (req, res) => {
  try {
    const routine = await Routine.findByPk(req.params.id);
    if (!routine) {
      return res.status(404).json({
        status: "404",
        message: "Routine not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: routine,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const createRoutine = async (req, res) => {
  try {
    const { program_id, duration, name } = req.body;
    const newRoutine = await Routine.create({
      program_id,
      duration,
      name,
    });
    res.status(201).json({
      status: "201",
      message: "Routine created successfully",
      data: newRoutine,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const updateRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const routine = await Routine.findByPk(id);
    if (!routine) {
      return res.status(404).json({
        status: "404",
        message: "Routine not found",
      });
    }

    await routine.update(updatedData);
    res.status(200).json({
      status: "200",
      message: "Routine updated successfully",
      data: routine,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const deleteRoutine = async (req, res) => {
  try {
    const { id } = req.params;

    const routine = await Routine.findByPk(id);
    if (!routine) {
      return res.status(404).json({
        status: "404",
        message: "Routine not found",
      });
    }

    await routine.destroy();
    res.status(200).json({
      status: "200",
      message: "Routine deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};