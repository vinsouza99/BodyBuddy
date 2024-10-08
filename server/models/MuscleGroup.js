import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const MuscleGroup = sequelize.define(
  "MuscleGroup",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
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
