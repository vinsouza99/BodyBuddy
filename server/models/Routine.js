import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Routine = sequelize.define(
  "Routine",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    preset: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    estimated_calories: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "routine",
    timestamps: false,
  }
);

export default Routine;
