import Routine from "../models/Routine.js";
import ProgramRoutine from "../models/ProgramRoutine.js";
import RoutineExercise from "../models/RoutineExercise.js";
import RoutineHistory from "../models/RoutineHistory.js";

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

export const getRoutinesByProgram = async (req, res) => {
  try {
    const { program_id } = req.params;
    const program_routines = await ProgramRoutine.findAll({
      where: {
        program_id: program_id,
      },
    });

    const programRoutines = [];
    for (const program_routine of program_routines) {
      const routine = await Routine.findByPk(program_routine.routine_id);
      programRoutines.push({
        id: routine.id,
        program_id: program_routine.program_id,
        name: routine.name,
        description: routine.description,
        duration: routine.duration,
        preset: routine.preset,
        estimated_calories: routine.estimated_calories,
        scheduled_date: program_routine.scheduled_date,
        completed: program_routine.completed,
      });
    }

    res.status(200).json({
      status: "200",
      message: "Success",
      data: programRoutines,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getPresetRoutines = async (req, res) => {
  try {
    const routines = await Routine.findAndCountAll({
      where: {
        preset: true,
      },
    });
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
    const {
      id,
      program_id,
      name,
      description,
      duration,
      preset,
      estimated_calories,
      scheduled_date,
      completed,
    } = req.body;
    const newRoutine = await Routine.create({
      id,
      name,
      description,
      duration,
      preset,
      estimated_calories,
    });
    const newProgramRoutine = await ProgramRoutine.create({
      program_id: program_id,
      routine_id: newRoutine.id,
      scheduled_date: scheduled_date,
      completed: completed,
    });
    res.status(201).json({
      status: "201",
      message: "Routine created successfully",
      data: {
        id: newRoutine.id,
        program_id: program_id,
        name: name,
        description: description,
        duration: duration,
        preset: preset,
        estimated_calories,
        scheduled_date: scheduled_date,
        completed: completed,
      },
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
    const { updatedData } = req.params;

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

export const getRoutineExercises = async (req, res) => {
  try {
    const routine_id = req.params.routine_id;
    const routineExercises = await RoutineExercise.findAll({
      where: {
        routine_id: routine_id,
      },
    });
    res.status(200).json({
      status: "200",
      message: "Success",
      data: routineExercises,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
export const createRoutineExercise = async (req, res) => {
  try {
    const { exercise_id, routine_id, reps, sets, order, duration, rest_time } =
      req.body;
    const newRoutineExercise = await RoutineExercise.upsert({
      exercise_id,
      routine_id,
      reps,
      sets,
      order,
      duration,
      rest_time,
    });
    res.status(201).json({
      status: "201",
      message: "Routine Exercise created successfully",
      data: newRoutineExercise,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const updateRoutineExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const routineExercise = await RoutineExercise.findByPk(id);
    if (!routineExercise) {
      return res.status(404).json({
        status: "404",
        message: "Routine Exercise not found",
      });
    }

    await routineExercise.update(updatedData);
    res.status(200).json({
      status: "200",
      message: "Routine Exercise updated successfully",
      data: routineExercise,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const deleteRoutineExercise = async (req, res) => {
  try {
    const { id } = req.params;

    const routineExercise = await RoutineExercise.findByPk(id);
    if (!routineExercise) {
      return res.status(404).json({
        status: "404",
        message: "Routine Exercise not found",
      });
    }

    await routineExercise.destroy();
    res.status(200).json({
      status: "200",
      message: "Routine Exercise deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getUserRoutineHistory = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const routineHistory = await RoutineHistory.findAll({
      where: {
        user_id: user_id,
      },
    });
    res.status(200).json({
      status: "200",
      message: "Success",
      data: routineHistory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const createRoutineHistory = async (req, res) => {
  try {
    const {
      user_id,
      completed_at,
      routine_id,
      recording_url,
      score,
      calories,
    } = req.body;
    const newRoutineHistory = await RoutineHistory.create({
      user_id,
      completed_at,
      routine_id,
      recording_url,
      score,
      calories,
    });
    res.status(201).json({
      status: "201",
      message: "Routine History created successfully",
      data: newRoutineHistory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
