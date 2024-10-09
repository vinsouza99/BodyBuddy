import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Goal = sequelize.define(
  "Goal",
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "local_goal",
    timestamps: false,
  }
);

export default Goal;
