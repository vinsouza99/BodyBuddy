export default class UserAchievement {
  /**
   *
   * @param {*} achievement_id
   * @param {*} name
   * @param {*} earned_at
   * @
   */
  constructor(achievement_id, name, earned_at) {
    this.achievement_id = achievement_id;
    this.name = name;
    this.earned_at = earned_at;
    this.compare_date = earned_at; // will have the same value as earned_at but will be use for sorting in history
  }
}
