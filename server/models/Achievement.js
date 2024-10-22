import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Achievement = sequelize.define(
  "Achievement",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "local_achievement",
    timestamps: false,
  }
);

export default Achievement;
