export default class UserAchievement {
  /**
   *
   * @param {*} achievement_id
   * @param {*} name
   * @param {*} earned_at
   */
  constructor(achievement_id, name, earned_at) {
    this.achievement_id = achievement_id;
    this.name = name;
    this.earned_at = earned_at;
  }
}
