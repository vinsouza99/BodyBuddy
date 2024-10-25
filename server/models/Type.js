import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Type = sequelize.define(
  "Type",
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
    default_duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "local_type",
    timestamps: false,
  }
);

export default Type;
