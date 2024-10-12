export class PromptInfo {
  /**
   *
   * @param {String} gender
   * @param {Array} primaryGoals - an Array that contains all the goals of the user
   * @param {String} pastExerciseFrequency
   * @param {string} intensity
   * @param {Array} availability - an Array that contains all the days the user is available for exercising
   */
  constructor(
    gender,
    primaryGoals,
    pastExerciseFrequency,
    intensity,
    availability
  ) {
    this.gender = gender;
    this.primaryGoals = primaryGoals;
    this.pastExerciseFrequency = pastExerciseFrequency;
    this.intensity = intensity;
    this.duration = duration;
    this.availability = availability;
  }
}
