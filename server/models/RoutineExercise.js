import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const RoutineExercise = sequelize.define(
  "RoutineExercise",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    routine_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    exercise_id: {
      type: DataTypes.BIGINT,
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
  },
  {
    tableName: "routine exercise",
    timestamps: false,
  }
);

export default RoutineExercise;
