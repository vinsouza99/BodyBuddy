import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const RoutineGoal = sequelize.define(
  "RoutineGoal",
  {
    goal_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    routine_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
  },
  {
    tableName: "routine_goal",
    timestamps: false,
  }
);

export default RoutineGoal;
