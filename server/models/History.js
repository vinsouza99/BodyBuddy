import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const History = sequelize.define(
  "History",
  {
    id: {
      type: DataTypes.BIGINT,
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
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    program_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    routine_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    recording_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "history",
    timestamps: false,
  }
);

export default History;
