type Status = "Safe" | "Alert" | "Danger" | "";

interface SensorReadings {
  distance: number;
  vibration: number;
  moisture: number;
}

function determineStatus(readings: SensorReadings): Status {
  // Determine air quality status
  const distanceStatus = getdistanceStatus(readings.distance);

  // Determine vibration status
  const vibrationStatus = getVibrationStatus(readings.vibration);

  // Determine soil moisture status
  const soilMoistureStatus = getSoilMoistureStatus(readings.moisture);

  // Determine the overall status based on the most severe condition
  const overallStatus = [
    distanceStatus,
    vibrationStatus,
    soilMoistureStatus,
  ].reduce((max, current) => {
    if (current === "Danger" || max === "Danger") {
      return "Danger";
    } else if (current === "Alert" || max === "Alert") {
      return "Alert";
    }
    return max;
  }, "Safe");

  return overallStatus;
}

function getdistanceStatus(distance: number): Status {
  if (distance < 51) {
    return "Safe";
  } else if (distance <= 100) {
    return "Alert";
  } else {
    return "Danger";
  }
}

function getVibrationStatus(vibration: number): Status {
  if (vibration < 51) {
    return "Safe";
  } else if (vibration <= 80) {
    return "Alert";
  } else {
    return "Danger";
  }
}

function getSoilMoistureStatus(soilMoisture: number): Status {
  if (soilMoisture < 801) {
    return "Safe";
  } else if (soilMoisture <= 1000) {
    return "Alert";
  } else {
    return "Danger";
  }
}

export default determineStatus;
export { getdistanceStatus, getVibrationStatus, getSoilMoistureStatus };
export type {Status};
