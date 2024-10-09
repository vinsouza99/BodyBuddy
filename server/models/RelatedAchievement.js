import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const RelatedAchievement = sequelize.define(
  "RelatedAchievement",
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
    earned_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "user_achievement",
    timestamps: false,
  }
);

export default RelatedAchievement;
