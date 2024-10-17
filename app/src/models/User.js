export default class User {
  /**
   *
   * @param {string} id
   * @param {string} first_name
   * @param {string} last_name
   * @param {string} birthday
   * @param {string} gender
   * @param {Array(Goal)} goals
   * @param {UserSettings} settings
   * @param {UserProgress} progress
   */
  constructor(
    id,
    first_name,
    last_name,
    birthday,
    gender,
    goals,
    settings,
    progress
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.birthday = birthday;
    this.gender = gender;
    this.goals = goals;
    this.settings = settings;
    this.progress = progress;
  }
}
