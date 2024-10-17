import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const UserGoal = sequelize.define(
  "UserGoal",
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    goal_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
  },
  {
    tableName: "user_goal",
    timestamps: false,
  }
);

export default UserGoal;
