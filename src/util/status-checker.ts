type Status = "Safe" | "Alert" | "Danger" | "";

function determineSystemStatus(distance: number, vibration: number, moisture: number): string {
  const DISTANCE_SAFE_THRESHOLD = 15.0;
  const VIBRATION_SAFE_THRESHOLD = 50;
  const MOISTURE_SAFE_THRESHOLD = 50;

  let alertCount = 0;

  if (distance >= DISTANCE_SAFE_THRESHOLD) {
    alertCount++;
  }
  if (vibration >= VIBRATION_SAFE_THRESHOLD) {
    alertCount++;
  }
  if (moisture >= MOISTURE_SAFE_THRESHOLD) {
    alertCount++;
  }

  if (alertCount === 0) {
    return "Safe";
  } else if (alertCount === 1) {
    return "Alert";
  } else {
    return "Danger";
  }
}


export default determineSystemStatus;
export type { Status };

