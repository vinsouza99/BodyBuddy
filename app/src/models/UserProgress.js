export default class UserProgress {
  /**
   *
   * @param {*} level
   * @param {*} level_progress
   * @param {*} streak
   * @param {*} highest_streak
   */
  constructor(level, level_progress, streak, highest_streak) {
    this.level = level;
    this.level_progress = level_progress;
    this.streak = streak;
    this.highest_streak = highest_streak;
  }
}
