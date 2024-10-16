import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const UserProgress = sequelize.define(
  "UserProgress",
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    level_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    level_progress: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    streak: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "user_progress",
    timestamps: false,
  }
);

export default UserProgress;
