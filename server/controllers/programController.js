import Program from "../models/Program.js";
import ProgramRoutine from "../models/ProgramRoutine.js";
import { Op } from "sequelize";

export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll();
    res.status(200).json({
      status: "200",
      message: "Success",
      data: programs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getProgram = async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({
        status: "404",
        message: "Program not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: program,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getProgramsByUser = async (req, res) => {
  try {
    const program = await Program.findAndCountAll({
      where: { user_id: req.params.user_id },
    });
    if (!program) {
      return res.status(404).json({
        status: "404",
        message: "Program not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: program,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getProgramByRoutine = async (req, res) => {
  try {
    const program = await ProgramRoutine.findOne({
      where: { routine_id: req.params.routine_id },
    });
    if (!program) {
      return res.status(404).json({
        status: "404",
        message: "Program not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: program,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
}

export const getCompletedProgramsByUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const programs = await Program.findAll({
      where: {
        user_id: user_id,
        completed_at: {
          [Op.ne]: null,
        },
      },
    });
    if (!programs) {
      return res.status(404).json({
        status: "404",
        message: "Program not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: programs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const createProgram = async (req, res) => {
  try {
    const { id, user_id, name, description, duration, goal_id } = req.body;
    const newProgram = await Program.create({
      id,
      user_id,
      name,
      description,
      duration,
      goal_id,
    });
    res.status(201).json({
      status: "201",
      message: "Program created successfully",
      data: newProgram,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const program = await Program.findByPk(id);
    if (!program) {
      return res.status(404).json({
        status: "404",
        message: "Program not found",
      });
    }

    await program.update(updatedData);
    res.status(200).json({
      status: "200",
      message: "Program updated successfully",
      data: program,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;

    const program = await Program.findByPk(id);
    if (!program) {
      return res.status(404).json({
        status: "404",
        message: "Program not found",
      });
    }

    await program.destroy();
    res.status(200).json({
      status: "200",
      message: "Program deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const createProgramRoutine = async (req, res) => {
  try {
    const { program_id, routine_id, scheduled_date, completed } = req.body;
    const newProgramRoutine = await ProgramRoutine.upsert({
      program_id,
      routine_id,
      scheduled_date,
      completed,
    });
    res.status(201).json({
      status: "201",
      message: "Program Routine created successfully",
      data: newProgramRoutine,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const updateProgramRoutine = async (req, res) => {
  try {
    const { program_id, routine_id, scheduled_date, completed } = req.body;
    const updatedCount = await ProgramRoutine.update(
      { completed },
      { where: { program_id, routine_id, scheduled_date }}
    );
    res.status(200).json({
      status: "200",
      message: "Program Routine (completed flag) updated successfully",
      data: updatedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
}
