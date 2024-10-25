import axiosClient from "../utils/axiosClient";
import { historyItemComparator } from "../utils/utils";
import User from "../models/User";
import UserSettings from "../models/UserSettings";
import UserProgress from "../models/UserProgress";
import UserAchievement from "../models/UserAchievement";
import {
  getAllAchievements,
  getGoal,
  getIntensity,
} from "./LocalTablesController";
import Achievement from "../models/Achievement";
import { getUserCompletedPrograms } from "./ProgramController";
import { getUserCompletedRoutines } from "./RoutineController";

const API_ROUTE = "users";
const API_USER_SETTINGS_ROUTE = "settings";
const API_USER_PROGRESS_ROUTE = "progress";
const API_USER_SCHEDULE_ROUTE = "schedule";
const API_USER_ACHIEVEMENT_ROUTE = "achievement";
const API_USER_ACCUMULATED_TIME_ROUTE = "accumulatedTime";

const getUser = async (authUser) => {
  try {
    const response = await axiosClient.get(`${API_ROUTE}/${authUser.id}`);
    const data = await response.data.data;
    const user = new User(
      authUser.id,
      authUser?.user_metadata.full_name,
      authUser?.user_metadata.picture,
      data.birthday,
      data.gender,
      data.weight,
      data.weight_unit
    );
    const settings = await getUserSettings(user.id);
    user.settings = settings;

    const progress = await getUserProgress(user.id);
    user.progress = progress;

    const schedule = await getUserSchedule(user.id);
    user.schedule = schedule;

    const achievements = await getUserAchievements(user.id);
    user.achievements = achievements;

    return user;
  } catch (e) {
    console.log(e);
  }
};

const getUserSettings = async (id) => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_USER_SETTINGS_ROUTE}/${id}`
    );
    const data = await response.data.data;
    const goal = await getGoal(data.goal_id);
    const intensity = await getIntensity(data.intensity_id);
    return new UserSettings(goal, intensity);
  } catch (e) {
    console.log(e);
  }
};
const getUserProgress = async (id) => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_USER_PROGRESS_ROUTE}/${id}`
    );
    const data = await response.data.data;
    const progress = new UserProgress(
      data.level,
      data.level_progress,
      data.streak,
      data.highest_streak
    );
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
    let response = await axiosClient.put(`${API_ROUTE}/${user.id}`, user);
    userObj.settings.user_id = user.id;
    response = await updateUserSettings(userObj.settings);
    user.settings = response;
    response = await getUserProgress(user.id);
    user.progress = response;
    response = await createUserSchedule(user.id, userObj.schedule);
    user.schedule = response;
    return user;
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (user_id, updatedUserObj) => {
  try {
    const updatedUser = new User(
      user_id,
      updatedUserObj.name,
      updatedUserObj.picture,
      updatedUserObj.birthday,
      updatedUserObj.gender,
      updatedUserObj.weight,
      updatedUserObj.weight_unit,
      updatedUserObj.settings,
      updatedUserObj.progress,
      updatedUserObj.schedule
    );
    const response = await axiosClient.put(
      `${API_ROUTE}/${user_id}`,
      updatedUser
    );
    if (updatedUser.settings) {
      await updateUserSettings(user_id, updatedUser.settings);
    }
    if (updatedUser.progress) {
      await updateUserProgress(user_id, updatedUser.progress);
    }
    if (updatedUser.schedule) {
      //await updateUserSchedule(user_id, updatedUser.schedule);
      await createUserSchedule(user_id, updatedUser.schedule);
    }
    return response;
  } catch (e) {
    console.log(e);
  }
};
const updateUserSettings = async (user_id, updatedSettingsObj) => {
  try {
    const response = await axiosClient.put(
      `${API_ROUTE}/${API_USER_SETTINGS_ROUTE}/${user_id}`,
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
      `${API_ROUTE}/${API_USER_PROGRESS_ROUTE}/${user_id}`,
      updatedProgressObj
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
const getUserSchedule = async (user_id) => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_USER_SCHEDULE_ROUTE}/${user_id}`
    );
    return response.data.data.map((info) => info.day);
  } catch (e) {
    console.log(e);
  }
};
const createUserSchedule = async (user_id, scheduleArray) => {
  try {
    const promises = [];
    scheduleArray.forEach(async (day) => {
      promises.push(
        axiosClient.post(`${API_ROUTE}/${API_USER_SCHEDULE_ROUTE}/${user_id}`, {
          day: day,
        })
      );
    });
    Promise.all(promises).then((response) => {
      return response;
    });
  } catch (e) {
    console.log(e);
  }
};

const updateUserSchedule = async (
  user_id,
  currentScheduleArray,
  newScheduleArray
) => {
  try {
    const promises = [];
    newScheduleArray.forEach(async (day) => {
      //TODO
    });
    Promise.all(promises).then((response) => {
      console.log(response);
      return response;
    });
  } catch (e) {
    console.log(e);
  }
};
const getUserHistory = async (user_id) => {
  try {
    const programsResponse = await getUserCompletedPrograms(user_id);
    const routinesResponse = await getUserCompletedRoutines(user_id);
    const achievementsResponse = await getUserAchievements(user_id);
    const history = [
      ...programsResponse,
      ...routinesResponse,
      ...achievementsResponse,
    ];
    if (history.length > 1) history.sort(historyItemComparator);
    return history;
  } catch (e) {
    console.log(e);
  }
};

const getUserAchievements = async (user_id) => {
  try {
    const userAchievements = [];
    const userAchievementsResponse = await axiosClient.get(
      `${API_ROUTE}/${API_USER_ACHIEVEMENT_ROUTE}/${user_id}`
    );
    if (userAchievementsResponse.status >= 400) return userAchievements;

    const achievements = await getAllAchievements();
    userAchievementsResponse.data.data.forEach((achievement) => {
      let localAchievement = achievements.find(
        (element) => element.id == achievement.achievement_id
      );
      userAchievements.push(
        new UserAchievement(
          localAchievement.id,
          localAchievement.name,
          achievement.earned_at
        )
      );
    });
    return userAchievements;
  } catch (e) {
    console.log(e);
  }
};
const addUserAchievement = async (user_id, achievement_id, earned_at) => {
  try {
    let response = await axiosClient.post(
      `${API_ROUTE}/${API_USER_ACHIEVEMENT_ROUTE}`,
      { user_id: user_id, achievement_id: achievement_id, earned_at: earned_at }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
const getUserAccumulatedTimes = async (user_id) => {
  try {
    const response = await axiosClient.get(
      `${API_ROUTE}/${API_USER_PROGRESS_ROUTE}/${API_USER_ACCUMULATED_TIME_ROUTE}/${user_id}`
    );
    if (response.status >= 400) return [];
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
const updateUserAccumulatedTime = async (user_id, date, minutes) => {
  try {
    let response = await axiosClient.put(
      `${API_ROUTE}/${API_USER_PROGRESS_ROUTE}/${API_USER_ACCUMULATED_TIME_ROUTE}/${user_id}`,
      { date: date, minutes: minutes }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
export {
  getUser,
  getUserSettings,
  getUserProgress,
  createUser,
  updateUser,
  getUserHistory,
  createUserSchedule,
  updateUserSchedule,
  getUserAchievements,
  addUserAchievement,
  getUserAccumulatedTimes,
  updateUserAccumulatedTime,
};
