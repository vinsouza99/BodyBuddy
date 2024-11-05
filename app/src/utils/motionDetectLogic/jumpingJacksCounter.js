import { landmarkNames } from "./landmarkNames";
import { BaseCounter } from "./baseCounter";
import { calculateAngle } from "../utils";

export class JumpingJacksCounter extends BaseCounter {
  constructor() {
    super();
    this.shoulderHipKneeAngle = null;
    this.hipKneeAnkleAngle = null;
    this.kneeAnkleAngle = null;
  }

  static MET = 14.0; // Metabolic equivalent of task (MET) for jumpingjacks

  _processSpecificPose(landmarks) {
    const leftShoulder = landmarks[landmarkNames.LEFT_SHOULDER];
    const leftHip = landmarks[landmarkNames.LEFT_HIP];
    const leftKnee = landmarks[landmarkNames.LEFT_KNEE];
    const leftAnkle = landmarks[landmarkNames.LEFT_ANKLE];

    // Process Alert
    this.#processAlert(leftHip, leftKnee, leftAnkle);

    // Process Count
    this.#processCount(leftShoulder, leftHip, leftKnee, leftAnkle);

    return { 
      count: 0, 
      alert: this.alert,
      calorie: 0,
      score: 0,
    };
  }

  #processAlert(leftHip, leftKnee, leftAnkle) {
    // Calculate the angle between hip, knee, and ankle
    this.hipKneeAnkleAngle = calculateAngle(leftHip, leftKnee, leftAnkle);

    // Check if knee bends too much
    if (this.hipKneeAnkleAngle < 80) {
      this.alertCount += 1;
    }

    // Return alert message if knee bends too much for a certain number of frames
    if (this.alertCount >= this.alertThreshold) {
      this.alert = "Keep your hips a bit higher to maintain good form.";
      this.alertCount = 0;
    } else {
      this.alert = null;
    }
  }

  #processCount() {
    // No counting logic for jumping jacks
  }

  getAngle() {
    // No angle for jumping jacks
  }

  getCaloriePerSec() {
    return JumpingJacksCounter.MET / 3600 * 1.05;
  }

  getScorePerSec() {
    return 1;
  }
}
