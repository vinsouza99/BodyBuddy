import axiosClient from "../utils/axiosClient";
import { User } from "../models/User";
import { UserSettings } from "../models/UserSettings";

// Note: API BASE URL is set in axisoClient.js with other required common settings.
// const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";
// const TABLE = "exercises";
// const API_ROUTE = URL + TABLE;
const API_ROUTE = "users";
const API_ROUTE_2 = "user_preferences";

const getUserSettings = async (id) => {
  try {
    const response = await axiosClient.get(`${API_ROUTE_2}/${id}`);
    const data = await response.data.data;
    const setting = new UserSettings(
      data.id,
      data.user_id,
      data.description,
      data.demo_url,
      data.types
    );
    return prefere;
  } catch (e) {
    console.log(e);
  }
};

export { getAllExercises, getExercise };
