import History from "../models/History.js";

export const getHistorys = async (req, res) => {
  try {
    const logs = await History.findAll();
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

export const getHistory = async (req, res) => {
  try {
    const log = await History.findByPk(req.params.id);
    if (!log) {
      return res.status(404).json({
        status: "404",
        message: "History not found",
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

export const createHistory = async (req, res) => {
  try {
    const { user_id, duration } = req.body;
    const newHistory = await History.create({
      user_id,
      duration,
    });
    res.status(201).json({
      status: "201",
      message: "History created successfully",
      data: newHistory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const updateHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const log = await History.findByPk(id);
    if (!log) {
      return res.status(404).json({
        status: "404",
        message: "History not found",
      });
    }

    await log.update(updatedData);
    res.status(200).json({
      status: "200",
      message: "History updated successfully",
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

export const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const log = await History.findByPk(id);
    if (!log) {
      return res.status(404).json({
        status: "404",
        message: "History not found",
      });
    }

    await log.destroy();
    res.status(200).json({
      status: "200",
      message: "History deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
