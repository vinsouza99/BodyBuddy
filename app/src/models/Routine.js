/**
 *This single class represents all routines, whether they are pre-set or part of a program.
 * If they are pre-set, then the "program_id" property will be NULL and "name" and "description"
 * will have values.
 */
export default class Routine {
  /**
   *
   * @param {string} id
   * @param {number} duration
   * @param {string} program_id
   * @param {string} name
   * @param {string} description
   * @param {number} estimated_calories
   * @param {Date} scheduled_date,
   * @param {Boolean} completed
   * @param {Array} exercises - an array of objects of the class Exercise that refers to all the
   * exercises that are part of this routine
   * @param {Date} compare_date - will have the same value as completed_at but will be use for sorting in history
   */
  constructor(
    id,
    duration,
    program_id,
    name,
    description,
    estimated_calories,
    scheduled_date,
    completed,
    exercises = new Array(),
    completed_at
  ) {
    this.id = id;
    this.duration = duration;
    this.program_id = program_id;
    this.name = name;
    this.description = description;
    this.estimated_calories = estimated_calories;
    this.scheduled_date = scheduled_date;
    this.completed = completed;
    this.exercises = exercises;
    this.completed_at = completed_at;
    this.compare_date = completed_at;
  }
  /**
   * Adds an exercise to the routine and sorts the array according to the order of the exercise
   * @param {Exercise} exercise - object of the class Exercise
   */
  addExercise(exercise) {
    this.exercises.push(exercise);
    this.exercises.sort(this.#exerciseComparator);
  }
  /**
   * @param {string} id - the id of the exercise to be deleted
   */
  deleteExercise(id) {
    let index = this.exercises.findIndex((exercise) => exercise.id == id);
    this.exercises.splice(index, 1);
  }

  /**
   * A private method that compares two Exercise objects according to the "order" property
   * @param {Exercise} a
   * @param {Exercise} b
   * @returns number
   */
  #exerciseComparator(a, b) {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  }
}
