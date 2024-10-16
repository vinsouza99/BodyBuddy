export default class UserSettings {
  /**
   *
   * @param {string} user_id
   * @param {number} pastExerciseFrequency
   * @param {number} desiredIntensity
   * @param {Array} availableDays
   */
  constructor(user_id, pastExerciseFrequency, desiredIntensity, availableDays) {
    this.user_id = user_id;
    this.pastExerciseFrequency = pastExerciseFrequency;
    this.desiredIntensity = desiredIntensity;
    this.availableDays = availableDays;
  }
}
