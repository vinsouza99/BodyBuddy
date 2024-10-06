import { landmarkNames } from "./landmarkNames";

export class BaseCounter {
  constructor() {
    this.successCount = 0;
    this.up = false;
    this.down = false;
    this.alert = null;
    this.alertCount = 0;
    this.alertThreshold = 100;
  }

  processPose(landmarks) {
    throw new Error("processPose() must be implemented in subclass",landmarks);
  }

  _checkFullBodyInFrame(landmarks) {
    const requiredLandmarks = [
      landmarks[landmarkNames.NOSE],
      landmarks[landmarkNames.LEFT_FOOT_INDEX],
      landmarks[landmarkNames.RIGHT_FOOT_INDEX],
    ];

    // Check if head and feet are in the frame
    return requiredLandmarks.every((landmark) => {
      return (
        landmark.x >= 0 && landmark.x <= 1 &&
        landmark.y >= 0 && landmark.y <= 1
      );
    });
  }

  getAngle() {
    throw new Error("getAngle() must be implemented in subclass");
  }

  resetCount() {
    this.successCount = 0;
  }
}