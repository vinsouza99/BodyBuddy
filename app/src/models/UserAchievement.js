export default class UserAchievement {
  /**
   *
   * @param {*} achievement_id
   * @param {*} name
   * @param {*} description
   * @param {*} earned_at
   * @
   */
  constructor(achievement_id, name, description, earned_at) {
    this.achievement_id = achievement_id;
    this.name = name;
    this.description = description;
    this.earned_at = earned_at;
    this.compare_date = earned_at; // will have the same value as earned_at but will be use for sorting in history
    this.record_type = "achievement"; //used to differentiate records on the user history
  }
}
