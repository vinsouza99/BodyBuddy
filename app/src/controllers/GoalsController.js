import axiosClient from "../utils/axiosClient";
//import { Goal } from "../models/Goal";

// Note: API BASE URL is set in axisoClient.js with other required common settings.
// const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";
// const TABLE = "goals";
// const API_ROUTE = URL + TABLE;
const API_ROUTE = "goals";

const getAllGoals = async () => {
  return [
    {
      name: "Build Muscles & Size",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, nam.",
    },
    {
      name: "Lose Weight & Burn Fat",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, nam.",
    },
    {
      name: "Increase Strength",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, nam.",
    },
    {
      name: "Tone Up",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, nam.",
    },
    {
      name: "Get Fitter & Feel Healthy",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, nam.",
    },
    {
      name: "Increase Mobility",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, nam.",
    },
  ];
};

export { getAllGoals };
