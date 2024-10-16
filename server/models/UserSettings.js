import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const UserSettings = sequelize.define(
  "UserSettings",
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
  },
  {
    tableName: "user_settings",
    timestamps: false,
  }
);

export default UserSettings;
