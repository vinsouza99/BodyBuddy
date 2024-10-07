import { landmarkNames } from "./landmarkNames";
import { BaseCounter } from "./baseCounter";
import { calculateAngle } from "../utils";

export class PushupCounter extends BaseCounter {
  constructor() {
    super();
    this.shoulderAnkleWristAngle = null;
  }

  _processSpecificPose(landmarks) {
    const leftShoulder = landmarks[landmarkNames.LEFT_SHOULDER];
    const leftAnkle = landmarks[landmarkNames.LEFT_ANKLE];
    const leftWrist = landmarks[landmarkNames.LEFT_WRIST];

    // Process Alert
    this.#processAlert();

    // Process Count
    this.#processCount(leftShoulder, leftAnkle, leftWrist);

    return { count: this.successCount, alert: this.alert };
  }

  #processAlert() {
  }

  #processCount(leftShoulder, leftAnkle, leftWrist) {
    this.shoulderAnkleWristAngle = calculateAngle(leftShoulder, leftAnkle, leftWrist);
    console.log(this.shoulderAnkleWristAngle);

    // Judge Pushup Up (top position)
    if (this.shoulderAnkleWristAngle > 160 && !this.up) {
      this.up = true;
      this.down = false;
    }

    // Judge Pushup Down (bottom position)
    if (this.up && this.shoulderAnkleWristAngle < 45 && !this.down) {
      this.down = true;
      this.successCount += 1;
    }

    // Reset Up state when user returns to the top position
    if (this.down && this.shoulderAnkleWristAngle > 160) {
      this.up = false;
    }
  }

  getAngle() {
    return Number(this.shoulderAnkleWristAngle);
  }
}
