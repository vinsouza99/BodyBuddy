import { Exercise } from "./Exercise";

export class RoutineExercise extends Exercise {
  /**
   * @param {string} exercise_id
   * @param {string} routine_id
   * @param {number} order - the position of this exercise on the routine if it is part of a routine
   * @param {number} sets - only if it is part of a routine
   * @param {number} reps - only if it is part of a routine
   * @param {number} duration - the amount of time this exercise takes in milliseconds (only if it is part of a routine)
   * @param {number} restPeriod - the amount of time of rest between the sets in milliseconds (only if it is part of a routine)
   */
  constructor(
    exercise_id,
    routine_id,
    order,
    sets,
    reps,
    duration,
    restPeriod
  ) {
    super();
    this.exercise_id = exercise_id;
    this.routine_id = routine_id;
    this.order = order || 0;
    this.sets = sets || 1;
    this.reps = reps || 0;
    this.duration = duration || 0;
    this.restPeriod = restPeriod || 0;
  }
}
