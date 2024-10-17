import axiosClient from "../utils/axiosClient";
import Goal from "../models/Goal";

// Note: API BASE URL is set in axisoClient.js with other required common settings.
// const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";
// const TABLE = "goals";
// const API_ROUTE = URL + TABLE;
const API_ROUTE = "goals";
const USER_GOAL_ROUTE = "user_goals";

const getAllGoals = async () => {
  return (await axiosClient.get(API_ROUTE)).data.data;
};
const getUserGoals = async (id) => {
  try {
    const response = await axiosClient.get(`${USER_GOAL_ROUTE}/${id}`);
    const data = await response.data.data;
    const goals = data.map(
      (item) => new Goal(item.id, item.name, item.description)
    );
    return goals;
  } catch (e) {
    console.log(e);
  }
};
const createUserGoals = async (user_id, goalsArray) => {
  try {
    if (!goalsArray) throw new Error("User goals are null");
    let promises = [];
    goalsArray.forEach((goal_id) => {
      promises.push(
        axiosClient.post(`${USER_GOAL_ROUTE}`, {
          user_id: user_id,
          goal_id: goal_id,
        })
      );
    });
    return Promise.all(promises).then((response) => response);
  } catch (e) {
    console.log(e);
  }
};
export { getAllGoals, getUserGoals, createUserGoals };
