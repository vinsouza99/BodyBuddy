import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const ProgramRoutine = sequelize.define(
  "ProgramRoutine",
  {
    program_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    routine_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    scheduled_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "program_routine",
    timestamps: false,
  }
);

export default ProgramRoutine;
