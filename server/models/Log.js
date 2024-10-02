import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Log = sequelize.define(
  "Log",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    program_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    routine_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    recording_URL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "user_activity",
    timestamps: false,
  }
);

export default Log;
