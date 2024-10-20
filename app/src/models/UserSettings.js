export default class UserSettings {
  /**
   *
   * @param {Intensity} intensity
   * @param {Goal} goal
   */
  constructor(intensity_id, goal_id, intensity_name, goal_name) {
    this.intensity_id = intensity_id;
    this.goal_id = goal_id;
    this.intensity_name = intensity_name;
    this.goal_name = goal_name;
  }
}
