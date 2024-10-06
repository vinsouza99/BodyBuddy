import { landmarkNames } from "./landmarkNames";

export class BaseCounter {
  constructor() {
    this.successCount = 0;
    this.up = false;
    this.down = false;
    this.alert = null;
    this.alertCount = 0;
    this.alertThreshold = 100;

    this.previousLandmarks = null; // Store the previous frame's landmarks
    this.movementThreshold = 0.1; // Threshold for detecting large movements
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

  _isLandmarkUnstable(landmark) {
    if (!this.previousLandmarks) {
      this.previousLandmarks = landmark;
      return false; // First frame, no comparison possible
    }

    // Calculate the movement of landmarks between frames
    let unstable = false;
    landmark.forEach((landmark, index) => {
      const prevLandmark = this.previousLandmarks[index];
      const dx = landmark.x - prevLandmark.x;
      const dy = landmark.y - prevLandmark.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      // If the landmark moves more than the threshold, mark as unstable
      if (distance > this.movementThreshold) {
        unstable = true;
      }
    });

    // Update previous landmarks
    this.previousLandmarks = landmark;

    return unstable;
  }

  getAngle() {
    throw new Error("getAngle() must be implemented in subclass");
  }

  resetCount() {
    this.successCount = 0;
  }
}