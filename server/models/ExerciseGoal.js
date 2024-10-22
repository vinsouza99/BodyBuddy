import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const ExerciseGoal = sequelize.define(
  "ExerciseGoal",
  {
    goal_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    exercise_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
  },
  {
    tableName: "exercise_goal",
    timestamps: false,
  }
);

export default ExerciseGoal;
