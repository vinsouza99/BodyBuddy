import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const RelatedGoal = sequelize.define(
  "RelatedGoal",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      foreingKey: true,
    },
    goal_id: {
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
    tableName: "related_goal",
    timestamps: false,
  }
);

export default RelatedGoal;
