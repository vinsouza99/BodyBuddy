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
    intensity_ID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    goal_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "user_settings",
    timestamps: false,
  }
);
export default UserSettings;
