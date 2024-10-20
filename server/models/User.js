import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    weight_unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "user",
    timestamps: false,
  }
);
export default User;
