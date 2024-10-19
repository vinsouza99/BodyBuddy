import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Exercise from "./Exercise.js";

const RoutineExercise = sequelize.define(
  "RoutineExercise",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    routine_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    exercise_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rest_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 30000,
    },
  },
  {
    tableName: "routine_exercise",
    timestamps: false,
  }
);

RoutineExercise.belongsTo(Exercise, {
  foreignKey: "exercise_id",
});

export default RoutineExercise;
