import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const UserAccumulatedTime = sequelize.define(
  "UserAccumulatedTime",
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
  },
  {
    tableName: "user_accumulated_workout_time",
    timestamps: false,
  }
);
export default UserAccumulatedTime;
