import Exercise from "../models/Exercise.js";
import ExerciseType from "../models/ExerciseType.js";
import ExerciseGoal from "../models/ExerciseGoal.js";
import ExerciseMuscleGroup from "../models/ExerciseMuscleGroup.js";

export const getExercises = async (req, res) => {
  const offset = req.params.offset_num;
  const limit = req.params.limit_num;
  try {
    if (offset && limit) {
      const { count, rows } = await Exercise.findAndCountAll({
        offset: offset,
        limit: limit,
      });
      res.set("Cache-Control", "public, max-age=3600");
      res.status(200).json({
        status: "200",
        message: "Success",
        data: rows,
      });
    } else {
      const exercises = await Exercise.findAll();
      res.status(200).json({
        status: "200",
        message: "Success",
        data: exercises,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
export const getExercisesCount = async (req, res) => {
  try {
    const quantity = await Exercise.count();
    if (!quantity) {
      return res.status(404).json({
        status: "404",
        message: "No exercises found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Success",
      data: quantity,
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
export const getExerciseTypes = async (req, res) => {
  try {
    const exercise_id = req.params.id;
    const exercisesTypes = await ExerciseType.findAll({
      where: {
        exercise_id: exercise_id,
      },
    });
    res.set("Cache-Control", "public, max-age=3600");
    res.status(200).json({
      status: "200",
      message: "Success",
      data: exercisesTypes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
export const getExerciseGoals = async (req, res) => {
  try {
    const exercise_id = req.params.id;
    const exercisesGoals = await ExerciseGoal.findAll({
      where: {
        exercise_id: exercise_id,
      },
    });
    res.set("Cache-Control", "public, max-age=3600");
    res.status(200).json({
      status: "200",
      message: "Success",
      data: exercisesGoals,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
export const getExerciseMuscleGroups = async (req, res) => {
  try {
    const exercise_id = req.params.id;
    const exercisesMuscleGroup = await ExerciseMuscleGroup.findAll({
      where: {
        exercise_id: exercise_id,
      },
    });
    res.set("Cache-Control", "public, max-age=3600");
    res.status(200).json({
      status: "200",
      message: "Success",
      data: exercisesMuscleGroup,
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
    const { name, description, demo_url, type } = req.body;
    const newExercise = await Exercise.create({
      name,
      description,
      demo_url,
      type,
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
