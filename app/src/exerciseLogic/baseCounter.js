export class BaseCounter {
  constructor() {
    this.successCount = 0;
    this.up = false;
    this.down = false;
  }

  processPose(landmarks) {
    throw new Error("processPose() must be implemented in subclass");
  }
}