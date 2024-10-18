export default class UserSettings {
  /**
   *
   * @param {string} user_id
   * @param {number} past_exercise_frequency
   * @param {number} desired_intensity
   * @param {Array} available_days
   */
  constructor(
    user_id,
    past_exercise_frequency,
    desired_intensity,
    available_days
  ) {
    this.user_id = user_id;
    this.past_exercise_frequency = past_exercise_frequency;
    this.desired_intensity = desired_intensity;
    this.available_days = available_days;
  }
}
