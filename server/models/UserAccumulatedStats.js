import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const UserAccumulatedStats = sequelize.define(
  "UserAccumulatedStats",
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      primaryKey: true,
    },
    minutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "user_accumulated_workout_stats",
    timestamps: false,
  }
);
export default UserAccumulatedStats;
