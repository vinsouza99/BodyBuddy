import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Intensity = sequelize.define(
  "Intensity",
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
    tableName: "local_intensity",
    timestamps: false,
  }
);

export default Intensity;
