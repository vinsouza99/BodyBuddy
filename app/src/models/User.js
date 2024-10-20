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
  constructor(
    id,
    name,
    picture,
    birthday,
    gender,
    weight,
    weight_unit,
    settings,
    progress
  ) {
    this.id = id;
    this.name = name;
    this.picture = picture;
    this.birthday = birthday;
    this.gender = gender;
    this.weight = weight;
    this.weight_unit = weight_unit;
    this.settings = settings;
    this.progress = progress;
  }
}
