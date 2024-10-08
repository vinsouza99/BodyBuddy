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

  _processSpecificPose(landmarks) {
    const leftShoulder = landmarks[landmarkNames.LEFT_SHOULDER];
    const leftHip = landmarks[landmarkNames.LEFT_HIP];
    const leftKnee = landmarks[landmarkNames.LEFT_KNEE];
    const leftAnkle = landmarks[landmarkNames.LEFT_ANKLE];

    // Process Alert
    this.#processAlert(leftKnee, leftAnkle);

    // Process Count
    this.#processCount(leftShoulder, leftHip, leftKnee, leftAnkle);

    return { count: this.successCount, alert: this.alert };
  }

  #processAlert(leftKnee, leftAnkle) {
    // Calculate the angle between knee and ankle
    this.kneeAnkleAngle = calculateAngle(leftKnee, leftAnkle, {
      x: leftAnkle.x + 1,
      y: leftAnkle.y,
    });

    // Check if knee goes beyond the toes by more than 10 degrees
    if (this.kneeAnkleAngle < 70) {
      this.alertCount += 1;
    }

    // Return alert message if knee goes beyond the toes for a certain number of frames
    if (this.alertCount >= this.alertThreshold) {
      this.alert = "Be careful not to let your knees go past your toes.";
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
}
