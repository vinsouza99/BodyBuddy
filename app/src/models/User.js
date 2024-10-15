/**
 *This single class represents all programs
 */
export class User {
  /**
   *
   * @param {string} id
   * @param {UserSettings} settings
   */
  constructor(id, settings) {
    this.id = id;
    this.settings = settings;
  }

  /**
   *
   * @param {Routine} routine - an object of the Routine class
   */
  setSettings(settings) {
    this.settings = settings;
  }
}
