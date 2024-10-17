import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Program = sequelize.define(
  "Program",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "program",
    timestamps: false,
  }
);

export default Program;
