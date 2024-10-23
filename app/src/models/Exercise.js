export class Exercise {
  /**
   *
   * @param {string} id
   * @param {string} name
   * @param {string} description
   * @param {string} demo_url
   * @param {Array} types - An array that contains one or multiple of type ids
   */
  constructor(
    id,
    routine_id,
    name,
    description,
    order,
    sets,
    reps,
    duration,
    rest_period,
    demo_url,
    types
  ) {
    this.id = id;
    this.routine_id = routine_id;
    this.name = name;
    this.description = description;
    this.order = order;
    this.sets = sets;
    this.reps = reps;
    this.duration = duration;
    this.rest_period = rest_period;
    this.demo_url = demo_url;
    this.types = types;
  }
}
