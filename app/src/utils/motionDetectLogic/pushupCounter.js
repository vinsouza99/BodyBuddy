import { landmarkNames } from "./landmarkNames";
import { BaseCounter } from "./baseCounter";
import { calculateAngle } from "../utils";

export class PushupCounter extends BaseCounter {
  constructor() {
    super();
    this.shoulderAnkleWristAngle = null;
    this.sholderHipAnkleAngle = null;
  }

  static MET = 8.0; // Metabolic equivalent of task (MET) for pushups
  static TIME_PER_REP = 6; // Time taken to complete one pushup rep

  _validateCustomConditions(landmarks) {
    // Make sure the user has his/her hands on the floor.
    const leftWrist = landmarks[landmarkNames.LEFT_WRIST];
    const rightWrist = landmarks[landmarkNames.RIGHT_WRIST];

    const groundLevel = 0.5;

    if (leftWrist.y < groundLevel || rightWrist.y < groundLevel) {
      return false;
    }
    return true;
  }

  _processSpecificPose(landmarks) {
    const leftShoulder = landmarks[landmarkNames.LEFT_SHOULDER];
    const leftElbow = landmarks[landmarkNames.LEFT_ELBOW];
    const leftWrist = landmarks[landmarkNames.LEFT_WRIST];
    const leftAnkle = landmarks[landmarkNames.LEFT_ANKLE];
    const leftHip = landmarks[landmarkNames.LEFT_HIP];

    const rightShoulder = landmarks[landmarkNames.RIGHT_SHOULDER];
    const rightElbow = landmarks[landmarkNames.RIGHT_ELBOW];
    const rightWrist = landmarks[landmarkNames.RIGHT_WRIST];
    const rightAnkle = landmarks[landmarkNames.RIGHT_ANKLE];
    const rightHip = landmarks[landmarkNames.RIGHT_HIP];

    // Process Alert
    this.#processAlert(
      leftShoulder,
      leftHip,
      leftAnkle,
      rightShoulder,
      rightHip,
      rightAnkle
    );

    // Process Count
    this.#processCount(
      leftShoulder,
      leftElbow,
      leftWrist,
      rightShoulder,
      rightElbow,
      rightWrist
    );

    return {
      count: this.successCount,
      alert: this.alert,
      calorie: PushupCounter.MET * (PushupCounter.TIME_PER_REP / 3600) * 1.05,
      score: 1,
    };
  }

  #processAlert(
    leftShoulder,
    leftHip,
    leftAnkle,
    rightShoulder,
    rightHip,
    rightAnkle
  ) {
    // Calculate the angle if the head to heel line is not straight
    this.leftSholderHipAnkleAngle = calculateAngle(
      leftShoulder,
      leftHip,
      leftAnkle
    );
    this.rightSholderHipAnkleAngle = calculateAngle(
      rightShoulder,
      rightHip,
      rightAnkle
    );
    if (
      this.leftSholderHipAnkleAngle < 160 ||
      this.rightSholderHipAnkleAngle < 160
    ) {
      this.alertCount += 1;
    }

    // Return alert message if hip is down for a certain number of frames
    if (this.alertCount >= this.alertThreshold) {
      this.alert = "Keep your body in a straight line from head to heels.";
      this.alertCount = 0;
    } else {
      this.alert = null;
    }
  }

  #processCount(
    leftShoulder,
    leftElbow,
    leftWrist,
    rightShoulder,
    rightElbow,
    rightWrist
  ) {
    this.leftShoulderElbowWristAngle = calculateAngle(
      leftShoulder,
      leftElbow,
      leftWrist
    );
    this.rightShoulderElbowWristAngle = calculateAngle(
      rightShoulder,
      rightElbow,
      rightWrist
    );

    // Judge Pushup Up (top position)
    if (
      (this.leftShoulderElbowWristAngle > 165 ||
        this.rightShoulderElbowWristAngle > 165) &&
      !this.up
    ) {
      this.up = true;
      this.down = false;
    }

    // Judge Pushup Down (bottom position)
    if (
      this.up &&
      (this.leftShoulderElbowWristAngle < 90 ||
        this.rightShoulderElbowWristAngle < 90) &&
      !this.down
    ) {
      this.down = true;
      this.successCount += 1;
    }

    // Reset Up state when user returns to the top position
    if (
      this.down &&
      (this.leftShoulderElbowWristAngle > 170 ||
        this.rightShoulderElbowWristAngle > 170)
    ) {
      this.up = false;
    }
  }

  getAngle() {
    return Number(this.leftShoulderElbowWristAngle);
  }

  getCaloriePerSec() {
    return 0;
  }

  getScorePerSec() {
    return 0;
  }
}
