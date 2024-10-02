/**
 *This single class represents all routines, whether they are pre-set or part of a program.
 * If they are pre-set, then the "program_id" property will be NULL and "name" and "description"
 * will have values.
 */
export default class Routine {
  /**
   *
   * @param {string} id
   * @param {Date} created_at
   * @param {Date} completed_at
   * @param {number} duration
   * @param {string} program_id
   * @param {string} name
   * @param {string} description
   * @param {Array} exercises - an array of objects of the class Exercise that refers to all the
   * exercises that are part of this routine
   */
  constructor(
    id,
    created_at,
    completed_at,
    duration,
    program_id,
    name,
    description,
    exercises
  ) {
    this.id = id;
    this.created_at = created_at;
    this.completed_at = completed_at;
    this.duration = duration;
    this.program_id = program_id;
    this.name = name;
    this.description = description;
    this.exercises = exercises || [];
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
