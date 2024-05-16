type Status = "Safe" | "Alert" | "Danger" | "";

// Define the threshold constants
const DISTANCE_SAFE_THRESHOLD = 15.0; // Safe distance threshold in cm
const VIBRATION_SAFE_THRESHOLD = 50; // Safe vibration threshold
const MOISTURE_SAFE_THRESHOLD = 50; // Safe moisture threshold

function determineSystemStatus(
  distance: number,
  vibration: number,
  moisture: number
): string {
  // Determine system status based on sensor thresholds
  if (
    distance < DISTANCE_SAFE_THRESHOLD &&
    vibration < VIBRATION_SAFE_THRESHOLD &&
    moisture < MOISTURE_SAFE_THRESHOLD
  ) {
    return "Safe";
  } else if (
    distance >= DISTANCE_SAFE_THRESHOLD ||
    vibration >= VIBRATION_SAFE_THRESHOLD ||
    moisture >= MOISTURE_SAFE_THRESHOLD
  ) {
    if (
      (distance >= DISTANCE_SAFE_THRESHOLD &&
        distance < 2 * DISTANCE_SAFE_THRESHOLD) ||
      (vibration >= VIBRATION_SAFE_THRESHOLD &&
        vibration < 2 * VIBRATION_SAFE_THRESHOLD) ||
      (moisture >= MOISTURE_SAFE_THRESHOLD &&
        moisture < 2 * MOISTURE_SAFE_THRESHOLD &&
        !(
          distance < DISTANCE_SAFE_THRESHOLD &&
          vibration < VIBRATION_SAFE_THRESHOLD &&
          moisture < MOISTURE_SAFE_THRESHOLD
        ))
    ) {
      return "Alert";
    } else {
      return "Danger";
    }
  } else {
    return "Safe";
  }
}

export default determineSystemStatus;
export type { Status };

