import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const RelatedMuscleGroup = sequelize.define(
  "RelatedMuscleGroup",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    muscle_group_id: {
      type: DataTypes.UUID,
      allowNull: false,
      foreingKey: true,
    },
    exercise_id: {
      type: DataTypes.UUID,
      allowNull: true,
      foreingKey: true,
    },
    routine_id: {
      type: DataTypes.UUID,
      allowNull: true,
      foreingKey: true,
    },
    program_id: {
      type: DataTypes.UUID,
      allowNull: true,
      foreingKey: true,
    },
  },
  {
    tableName: "related_muscle_group",
    timestamps: false,
  }
);

export default RelatedMuscleGroup;
