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
    video_tutorial_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    execution_steps: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
  },
  {
    tableName: "exercise",
    timestamps: false,
  }
);

export default Exercise;
