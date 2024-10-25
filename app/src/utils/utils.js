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
