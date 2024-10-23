import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const RoutineHistory = sequelize.define(
  "RoutineHistory",
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      primaryKey: true,
    },
    routine_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    recording_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    score: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    calories: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    tableName: "routine_history",
    timestamps: false,
    id: false,
  }
);

export default RoutineHistory;