import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const ExerciseMuscleGroup = sequelize.define(
  "ExerciseMuscleGroup",
  {
    muscle_group_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    exercise_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
  },
  {
    tableName: "exercise_muscle_group",
    timestamps: false,
  }
);

export default ExerciseMuscleGroup;
