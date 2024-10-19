export default class User {
  /**
   *
   * @param {string} id
   * @param {string} name
   * @param {string} birthday
   * @param {string} gender
   * @param {UserSettings} settings
   * @param {UserProgress} progress
   */
  constructor(id, name, birthday, gender, settings, progress) {
    this.id = id;
    this.name = name;
    this.birthday = birthday;
    this.gender = gender;
    this.settings = settings;
    this.progress = progress;
  }
}
