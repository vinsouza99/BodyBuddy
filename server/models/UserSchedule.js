import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const UserSchedule = sequelize.define(
  "UserSchedule",
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    tableName: "user_schedule",
    timestamps: false,
  }
);
export default UserSchedule;
