import User from "./User.js";
import UserSettings from "./UserSettings.js";
import UserProgress from "./UserProgress.js";
import UserSchedule from "./UserSchedule.js";

User.hasOne(UserSettings, {
  foreignKey: "user_id",
});
UserSettings.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasOne(UserProgress, {
  foreignKey: "user_id",
});
UserProgress.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(UserSchedule, {
  foreignKey: "user_id",
});
UserSchedule.hasOne(User, {
  foreignKey: "user_id",
});
