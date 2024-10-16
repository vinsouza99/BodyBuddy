export default class User {
  /**
   *
   * @param {string} id
   * @param {string} first_name
   * @param {string} last_name
   * @param {string} birthday
   * @param {date} last_login
   * @param {boolean} is_active;
   * @param {string} profile_picture_url
   * @param {string} gender
   * @param {UserSettings} settings
   * @param {UserProgress} progress
   */
  constructor(
    id,
    first_name,
    last_name,
    birthday,
    last_login,
    is_active,
    profile_picture_url,
    gender,
    settings,
    progress
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.birthday = birthday;
    this.last_login = last_login;
    this.is_active = is_active;
    this.profile_picture_url = profile_picture_url;
    this.gender = gender;
    this.settings = settings;
    this.progress = progress;
  }
}
