import Log from "../models/Log.js";

export const getLogs = async (req, res) => {
  try {
    const logs = await Log.findAll();
    res.status(200).json({
      status: "200",
      message: "Success",
      data: logs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getLog = async (req, res) => {
  try {
    const log = await Log.findByPk(req.params.id);
    if (!log) {
      return res.status(404).json({
        status: "404",
        message: "Log not found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: log,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const createLog = async (req, res) => {
  try {
    const {
      user_id,
      program_id,
      routine_id,
      recording_URL,
      description,
      created_at,
    } = req.body;
    const newLog = await Log.create({
      user_id,
      program_id,
      routine_id,
      recording_URL,
      description,
      created_at,
    });
    res.status(201).json({
      status: "201",
      message: "Log created successfully",
      data: newLog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const updateLog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const log = await Log.findByPk(id);
    if (!log) {
      return res.status(404).json({
        status: "404",
        message: "Log not found",
      });
    }

    await log.update(updatedData);
    res.status(200).json({
      status: "200",
      message: "Log updated successfully",
      data: log,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const deleteLog = async (req, res) => {
  try {
    const { id } = req.params;

    const log = await Log.findByPk(id);
    if (!log) {
      return res.status(404).json({
        status: "404",
        message: "Log not found",
      });
    }

    await log.destroy();
    res.status(200).json({
      status: "200",
      message: "Log deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
