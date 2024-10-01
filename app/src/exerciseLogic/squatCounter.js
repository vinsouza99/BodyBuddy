import { landmarkNames } from './landmarkNames';
import { BaseCounter } from './baseCounter';
import { calculateAngle } from './utils';

export class SquatCounter extends BaseCounter {
  constructor() {
    super();
    this.shoulderHipAngle = null;
    this.hipKneeAngle = null;
  }

  processPose(landmarks) {
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
    const kneeAnkleAngle = calculateAngle(leftKnee, leftAnkle, { x: leftAnkle.x + 1, y: leftAnkle.y });
    console.log("Knee Ankle Angle: ", kneeAnkleAngle);

    // Check if knee goes beyond the toes by more than 10 degrees
    if (kneeAnkleAngle < 70) {
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
    this.shoulderHipAngle = calculateAngle(leftShoulder, leftHip, leftKnee);
    this.hipKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);

    // Judge Squat Up 
    if (this.shoulderHipAngle > 170 && !this.up) {
      this.up = true;
      this.down = false;
    }

    // Judge Squat Down
    if (this.up && this.hipKneeAngle < 100 && !this.down) {
      this.down = true;
      this.successCount += 1;
    }

    // Reset Up state
    if (this.down && this.shoulderHipAngle > 170) {
      this.up = false;
    }
  }

  getAngle() {
    return Number(this.hipKneeAngle);
  }
}
