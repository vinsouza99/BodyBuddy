import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const MuscleGroup = sequelize.define(
  "MuscleGroup",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "local_muscle_group",
    timestamps: false,
  }
);

export default MuscleGroup;
