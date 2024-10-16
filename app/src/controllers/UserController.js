import axiosClient from "../utils/axiosClient";
import User from "../models/User";
import UserSettings from "../models/UserSettings";
import UserProgress from "../models/UserProgress";

const USER_ROUTE = "users";
const USER_PREFERENCES_ROUTE = "user_settings";
const USER_PROGRESS_ROUTE = "user_progress";

const getUser = async (id) => {
  try {
    const response = await axiosClient.get(`${USER_ROUTE}/${id}`);
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
    const progress = await getUserProgress(id);
    user.progress = progress;
    return user;
  } catch (e) {
    console.log(e);
  }
};
const getUserSettings = async (id) => {
  try {
    const response = await axiosClient.get(`${USER_PREFERENCES_ROUTE}/${id}`);
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
const getUserProgress = async (id) => {
  try {
    const response = await axiosClient.get(`${USER_PROGRESS_ROUTE}/${id}`);
    const data = await response.data.data;
    const progress = new UserProgress(data.user_id);
    return progress;
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
    let response = await axiosClient.post(`${USER_ROUTE}`, user);
    if (response.status() >= 200 && response.status() < 300)
      response = await createUserSettings(userObj.settings);
    return response;
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
    const response = await axiosClient.post(
      `${USER_PREFERENCES_ROUTE}`,
      settings
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
const createUserProgress = async (user_id) => {
  try {
    const progress = new UserProgress(user_id);
    const response = await axiosClient.post(`${USER_PROGRESS_ROUTE}`, progress);
    return response;
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
      `${USER_ROUTE}/${user_id}`,
      updatedUser
    );
    if (updatedUserObj.settings) {
      return await updateUserSettings(updatedUserObj.settings);
    }
    if (updatedUserObj.progress) {
      return await updateUserProgress(updatedUserObj.progress);
    }
    return response;
  } catch (e) {
    console.log(e);
  }
};
const updateUserSettings = async (user_id, updatedSettingsObj) => {
  try {
    const response = await axiosClient.put(
      `${USER_PREFERENCES_ROUTE}/${user_id}`,
      updatedSettingsObj
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
const updateUserProgress = async (user_id, updatedProgressObj) => {
  try {
    const response = await axiosClient.put(
      `${USER_PROGRESS_ROUTE}/${user_id}`,
      updatedProgressObj
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export {
  getUser,
  getUserSettings,
  getUserProgress,
  createUser,
  createUserSettings,
  createUserProgress,
  updateUser,
  updateUserSettings,
  updateUserProgress,
};
