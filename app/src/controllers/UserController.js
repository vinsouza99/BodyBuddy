import axiosClient from "../utils/axiosClient";
import User from "../models/User";
import UserSettings from "../models/UserSettings";

const API_ROUTE = "users";
const API_ROUTE_2 = "user_preferences";

const getUserSettings = async (id) => {
  try {
    const response = await axiosClient.get(`${API_ROUTE_2}/${id}`);
    const data = await response.data.data;
    const settings = new UserSettings(
      data.user_id,
      data.pastExerciseFrequency,
      data.desiredIntensity,
      data.availableDays
    );
    return settings;
  } catch (e) {
    console.log(e);
  }
};
const createUserSettings = async (userSettingsObj) => {
  try {
    if (!userSettingsObj) throw new Error("User settings is null");
    const settings = new UserSettings(
      userSettingsObj.user_id,
      userSettingsObj.pastExerciseFrequency,
      userSettingsObj.desiredIntensity,
      userSettingsObj.availableDays
    );
    const response = await axiosClient.post(`${API_ROUTE_2}`, settings);
    return response;
  } catch (e) {
    console.log(e);
  }
};
const createUser = async (userObj) => {
  try {
    const user = new User(
      userObj.id,
      userObj.first_name,
      userObj.last_name,
      userObj.birthday,
      userObj.last_login,
      userObj.is_active,
      userObj.profile_picture_url,
      userObj.gender
    );
    let response = await axiosClient.post(`${API_ROUTE}`, user);
    if (response.status() >= 200 && response.status() < 300)
      response = await createUserSettings(userObj.settings);
    return response;
  } catch (e) {
    console.log(e);
  }
};
const getUser = async (id) => {
  try {
    const response = await axiosClient.get(`${API_ROUTE}/${id}`);
    const data = await response.data.data;
    const user = new User(
      data.id,
      data.firstName,
      data.lastName,
      data.birthday,
      data.last_login,
      data.is_active,
      data.profile_picture_url,
      data.gender
    );
    const settings = await getUserSettings(id);
    user.settings = settings;
    return user;
  } catch (e) {
    console.log(e);
  }
};
const updateUser = async (user_id, updatedUserObj) => {
  try {
    const updatedUser = new User(
      updatedUserObj.id,
      updatedUserObj.firstName,
      updatedUserObj.lastName,
      updatedUserObj.birthday,
      updatedUserObj.last_login,
      updatedUserObj.is_active,
      updatedUserObj.profile_picture_url,
      updatedUserObj.gender
    );
    const response = await axiosClient.put(
      `${API_ROUTE}/${user_id}`,
      updatedUser
    );
    if (updatedUserObj.settings) {
      return await updateUserSettings(updatedUserObj.settings);
    }
    return response;
  } catch (e) {
    console.log(e);
  }
};
const updateUserSettings = async (user_id, updatedSettingsObj) => {
  try {
    const response = await axiosClient.put(
      `${API_ROUTE_2}/${user_id}`,
      updatedSettingsObj
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
export {
  getUser,
  getUserSettings,
  createUser,
  createUserSettings,
  updateUser,
  updateUserSettings,
};
