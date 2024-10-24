export default class RoutineHistory {
  /**
   * @param {string} user_id
   * @param {string} routine_id
   * @param {Date} completed_at
   * @param {string} recording_URL
   * @param {number} score
   * @param {number} calories
   */
  constructor(user_id, routine_id, completed_at, recording_URL, score, calories) {
    this.user_id = user_id;
    this.routine_id = routine_id;
    this.completed_at = completed_at;
    this.recording_URL = recording_URL;
    this.score = score;
    this.calories = calories;
  }
}