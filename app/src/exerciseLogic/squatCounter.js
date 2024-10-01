import { landmarkNames } from './landmarkNames';
import { BaseCounter } from './baseCounter';
import { calculateAngle } from './utils';

export class SquatCounter extends BaseCounter {
  constructor() {
    super();
    this.hipKneeAngle = null;
  }

  processPose(landmarks) {
    const leftShoulder = landmarks[landmarkNames.LEFT_SHOULDER];
    const leftHip = landmarks[landmarkNames.LEFT_HIP];
    const leftKnee = landmarks[landmarkNames.LEFT_KNEE];
    const leftAnkle = landmarks[landmarkNames.LEFT_ANKLE];

    const shoulderHipAngle = calculateAngle(leftShoulder, leftHip, leftKnee);
    this.hipKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
  
    // Judge Squat Up 
    if (shoulderHipAngle > 170 && !this.up) {
      this.up = true;
      this.down = false;
    }

    // Judge Squat Down
    if (this.up && this.hipKneeAngle < 100 && !this.down) {
      this.down = true;
      this.successCount += 1;
    }

    // Reset Up state
    if (this.down && shoulderHipAngle > 170) {
      this.up = false;
    }

    return this.successCount;
  }

  getAngle() {
    return Number(this.hipKneeAngle);
  }
}
