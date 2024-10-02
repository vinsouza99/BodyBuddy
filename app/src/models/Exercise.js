export class Exercise {
  /**
   *
   * @param {string} id
   * @param {string} name
   * @param {string} description
   * @param {string} demo_url
   * @param {Array} types - An array that contains one or multiple of these string: "warm-up", "cardio", "workout", "stretch"
   */
  constructor(id, name, description, demo_url, types) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.demo_url = demo_url;
  }
}
