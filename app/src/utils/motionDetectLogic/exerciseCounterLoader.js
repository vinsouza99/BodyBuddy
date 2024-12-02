import { SquatCounter } from "./squatCounter";
import { PushupCounter } from "./pushupCounter";

export const exerciseCounterLoader = {
  // Specify the exercuse ID and the corresponding counter class
  "ed999b28-ae50-4009-b29c-c7f6a28857c9": PushupCounter,
  "fb7180ab-f3e2-4a5d-b731-a2c0fc5de9fa": SquatCounter,
};
