export class User {
  /**
   *
   * @param {string} id
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} birthday
   * @param {date} last_login
   * @param {boolean} is_active;
   * @param {string} profile_picture_url
   * @param {string} gender
   */
  constructor(
    id,
    firstName,
    lastName,
    birthday,
    last_login,
    is_active,
    profile_picture_url,
    gender
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.last_login = last_login;
    this.is_active = is_active;
    this.profile_picture_url = profile_picture_url;
    this.gender = gender;
  }
}
