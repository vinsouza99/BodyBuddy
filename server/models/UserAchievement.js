import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const UserAchievement = sequelize.define(
  "UserAchievement",
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    achievement_id: {
      type: DataTypes.UUID,
      primaryKey: true,
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
export default UserAchievement;
