import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Exercise = sequelize.define(
  "Exercise",
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
    demo_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "workout",
    },
  },
  {
    tableName: "exercise",
    timestamps: false,
  }
);

export default Exercise;
