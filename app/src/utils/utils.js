import { supabase } from "../utils/supabaseClient";

export const setPageTitle = (title) => {
  document.title = title || "Bodybuddy";
};
export const historyItemComparator = (a, b) => {
  if (a.compare_date > b.compare_date) {
    return -1;
  } else if (a.compare_date < b.compare_date) {
    return 1;
  }
  return 0;
};
export const calculateAngle = (a, b, c) => {
  const radians =
    Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);
  if (angle > 180.0) angle = 360 - angle;
  return angle;
};
export const calculateLevel = (points) => {
  let level = 1;
  let pointsToNextLevel = 100 + 50 * level;
  let totalPointsForPreviousLevel = 0;

  // Check if the user has enough points to level up
  while (points >= pointsToNextLevel) {
    level++;
    totalPointsForPreviousLevel = pointsToNextLevel;
    pointsToNextLevel += 100 + 50 * level;
  }

  const pointsInCurrentLevel = points - totalPointsForPreviousLevel;
  const pointsRequiredForCurrentLevel =
    pointsToNextLevel - totalPointsForPreviousLevel;
  const remainingPointsToNextLevel = pointsToNextLevel - points;

  return {
    currentLevel: level,
    pointsInCurrentLevel: pointsInCurrentLevel,
    pointsRequiredForCurrentLevel: pointsRequiredForCurrentLevel,
    remainingPointsToNextLevel: remainingPointsToNextLevel,
  };
};
/**
 *
 * @param {*} notificationObj and object that represents a notification. It should have these fields:
 *                            - user_id (the user that will receive the notification)
 *                            - title
 *                            - message
 *                            - icon_id (a number that will be mapped to one of the badges)
 */
export const sendNotification = async (obj) => {
  const notificationObj = {
    user_id: obj.user_id,
    title: obj.title,
    message: obj.message,
    icon_url: obj.icon_url,
  };
  const { error } = await supabase.from("notification").insert(notificationObj);

  if (error) {
    console.error("Error inserting notification:", error);
  } else {
    var audio = new Audio(
      "../../public/assets/app/public/assets/mixkit-positive-notification-951.wav"
    );
    audio.play();
  }
};
