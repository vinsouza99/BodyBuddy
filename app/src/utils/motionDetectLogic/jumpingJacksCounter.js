import { landmarkNames } from "./landmarkNames";
import { BaseCounter } from "./baseCounter";

export class JumpingJacksCounter extends BaseCounter {
  constructor() {
    super();
    this.shoulderHipKneeAngle = null;
    this.hipKneeAnkleAngle = null;
    this.kneeAnkleAngle = null;
    this.alertThreshold = 180;
  }

  static MET = 14.0; // Metabolic equivalent of task (MET) for jumpingjacks

  _processSpecificPose(landmarks) {
    const leftShoulder = landmarks[landmarkNames.LEFT_SHOULDER];
    const rightShoulder = landmarks[landmarkNames.RIGHT_SHOULDER];
    const leftHand = landmarks[landmarkNames.LEFT_WRIST];
    const rightHand = landmarks[landmarkNames.RIGHT_WRIST];

    // Process Alert
    this.#processAlert(leftShoulder, rightShoulder, leftHand, rightHand);

    // Process Count
    this.#processCount();

    return { 
      count: 0, 
      alert: this.alert,
      calorie: 0,
      score: 0,
    };
  }

  #processAlert(leftShoulder, rightShoulder, leftHand, rightHand) {
    const handsUp = leftHand.y < leftShoulder.y && rightHand.y < rightShoulder.y;
    const handsDown = leftHand.y > leftShoulder.y && rightHand.y > rightShoulder.y;

    // Check if knee bends too much
    if (handsDown) {
      this.alertCount += 1;
    } else if (handsUp) {
      this.alertCount = 0;
    }

    // Return alert message if knee bends too much for a certain number of frames
    if (this.alertCount >= this.alertThreshold) {
      this.alert = "Keep it going. Don’t stop.";
      this.alertCount = 0;
    } else {
      this.alert = "";
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
