export default class Exercise {
  /**
   *
   * @param {string} id
   * @param {string} name
   * @param {string} description
   * @param {string} demo_url
   * @param {string} video_tutorial_url
   * @param {Array} types - An array that contains one or multiple types
   * @param {Array} muscleGroups
   * @param {Array} goals - An array that contains one or multiple goals
   * @param {Array} Srtring - An array that contains one or multiple execution steps
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
    video_tutorial_url,
    types = new Array(),
    muscleGroups = new Array(),
    goals = new Array(),
    execution_steps = new Array()
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
    this.video_tutorial_url = video_tutorial_url;
    this.types = types;
    this.muscleGroups = muscleGroups;
    this.goals = goals;
    this.execution_steps = execution_steps;
  }

  hasMuscleGroup(muscleGroupID) {
    for (const muscleGroup of this.muscleGroups) {
      if (muscleGroup.id == muscleGroupID) return true;
    }
    return false;
  }

  hasGoal(goalID) {
    for (const goal of this.goals) {
      if (goal.id == goalID) return true;
    }
    return false;
  }
}
