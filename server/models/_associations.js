import User from "./User.js";
import UserSettings from "./UserSettings.js";
import UserProgress from "./UserProgress.js";
import RelatedGoal from "./RelatedGoal.js";
import Log from "./Log.js";

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
