import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import User from "./User.js";

const UserSettings = sequelize.define(
  "UserSettings",
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    past_exercise_frequency: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    desired_intensity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    available_days: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    tableName: "user_settings",
    timestamps: false,
  }
);
export default UserSettings;
