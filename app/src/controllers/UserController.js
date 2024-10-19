import axiosClient from "../utils/axiosClient";
import User from "../models/User";
import UserSettings from "../models/UserSettings";
import UserProgress from "../models/UserProgress";

const USER_ROUTE = "users";
const USER_SETTINGS_ROUTE = "settings";
const USER_PROGRESS_ROUTE = "progress";

const getUser = async (id) => {
  try {
    const response = await axiosClient.get(`${USER_ROUTE}/${id}`);
    const data = await response.data.data;
    const user = new User(
      data.id,
      data.name,
      data.profile_picture_URL,
      data.birthday,
      data.gender,
      data.weight,
      data.weight_unit
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
    const response = await axiosClient.get(
      `${USER_ROUTE}/${id}/${USER_SETTINGS_ROUTE}`
    );
    const data = await response.data.data;
    const settings = new UserSettings(data.intensity_id, data.goal_id);
    return settings;
  } catch (e) {
    console.log(e);
  }
};
const getUserProgress = async (id) => {
  try {
    const response = await axiosClient.get(
      `${USER_ROUTE}/${id}/${USER_PROGRESS_ROUTE}`
    );
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
      userObj.birthday,
      userObj.gender,
      userObj.weight,
      userObj.weight_unit
    );
    let response = await axiosClient.put(`${USER_ROUTE}/${user.id}`, user);
    userObj.settings.user_id = user.id;
    response = await updateUserSettings(userObj.settings);
    user.settings = response;
    response = await getUserProgress(user.id);
    user.progress = response;
    return user;
  } catch (e) {
    console.log(e);
  }
};
const createUserSettings = async (userSettingsObj) => {
  try {
    if (!userSettingsObj) return;
    const settings = {
      intensity_id: userSettingsObj.intensity_id,
      goal_id: userSettingsObj.goal_id,
    };
    const response = await axiosClient.post(
      `${USER_ROUTE}/${settings.user_id}/${USER_SETTINGS_ROUTE}`,
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
    const response = await axiosClient.post(
      `${USER_ROUTE}/${user_id}/${USER_PROGRESS_ROUTE}`,
      progress
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (user_id, updatedUserObj) => {
  try {
    const updatedUser = new User(
      user_id,
      updatedUserObj.birthday,
      updatedUserObj.gender,
      updatedUserObj.weight,
      updatedUserObj.weight_unit
    );
    const response = await axiosClient.put(
      `${USER_ROUTE}/${user_id}`,
      updatedUser
    );
    if (updatedUserObj.settings) {
      await updateUserSettings(updatedUserObj.settings);
    }
    if (updatedUserObj.progress) {
      await updateUserProgress(updatedUserObj.progress);
    }
    return response;
  } catch (e) {
    console.log(e);
  }
};
const updateUserSettings = async (user_id, updatedSettingsObj) => {
  try {
    const response = await axiosClient.put(
      `${USER_ROUTE}/${user_id}/${USER_SETTINGS_ROUTE}`,
      {
        user_id: user_id,
        goal_id: updatedSettingsObj.goal_id,
        intensity_id: updatedSettingsObj.intensity_id,
      }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
const updateUserProgress = async (user_id, updatedProgressObj) => {
  try {
    const response = await axiosClient.put(
      `${USER_ROUTE}/${user_id}/${USER_PROGRESS_ROUTE}`,
      updatedProgressObj
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export { getUser, createUser, updateUser };
