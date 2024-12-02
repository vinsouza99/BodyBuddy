import { landmarkNames } from "./landmarkNames";
import { BaseCounter } from "./baseCounter";
import { calculateAngle } from "../utils";

export class SquatCounter extends BaseCounter {
  constructor() {
    super();
    this.shoulderHipKneeAngle = null;
    this.hipKneeAnkleAngle = null;
    this.kneeAnkleAngle = null;
  }

  static MET = 5.0; // Metabolic equivalent of task (MET) for squats
  static TIME_PER_REP = 6; // Time taken to complete one squat rep

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
      count: this.successCount,
      alert: this.alert,
      calorie: SquatCounter.MET * (SquatCounter.TIME_PER_REP / 3600) * 1.05,
      score: 1,
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
      this.alert = "Keep your hips a bit higher.";
      this.alertCount = 0;
    } else {
      this.alert = null;
    }
  }

  #processCount(leftShoulder, leftHip, leftKnee, leftAnkle) {
    this.shoulderHipKneeAngle = calculateAngle(leftShoulder, leftHip, leftKnee);
    this.hipKneeAnkleAngle = calculateAngle(leftHip, leftKnee, leftAnkle);

    // Judge Squat Up (top position)
    if (this.shoulderHipKneeAngle > 170 && !this.up) {
      this.up = true;
      this.down = false;
    }

    // Judge Squat Down (bottom position)
    if (this.up && this.hipKneeAnkleAngle < 100 && !this.down) {
      this.down = true;
      this.successCount += 1;
    }

    // Reset Up state when user returns to the top position
    if (this.down && this.shoulderHipKneeAngle > 170) {
      this.up = false;
    }
  }

  getAngle() {
    return Number(this.hipKneeAnkleAngle);
  }

  getCaloriePerSec() {
    return 0;
  }

  getScorePerSec() {
    return 0;
  }
}
