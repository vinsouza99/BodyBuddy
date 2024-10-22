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
    throw new Error("processPose() must be implemented in subclass");
  }

  getAngle() {
    throw new Error("getAngle() must be implemented in subclass");
  }
}