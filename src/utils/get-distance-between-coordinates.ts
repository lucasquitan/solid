// Interface representing a geographical coordinate with latitude and longitude
export interface Coordinate {
  latitude: number
  longitude: number
}

// Function to calculate the distance between two geographical coordinates
export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate,
) {
  // If the coordinates are the same, the distance is zero
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  // Convert latitude from degrees to radians
  const fromRadian = (Math.PI * from.latitude) / 180
  const toRadian = (Math.PI * to.latitude) / 180

  // Calculate the difference in longitude and convert to radians
  const theta = from.longitude - to.longitude
  const radTheta = (Math.PI * theta) / 180

  // Calculate the distance using the Haversine formula
  let dist =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

  // Correct potential floating point errors
  if (dist > 1) {
    dist = 1
  }

  // Convert the arc cosine of the distance to degrees
  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI

  // Convert distance from degrees to miles
  dist = dist * 60 * 1.1515

  // Convert distance from miles to kilometers
  dist = dist * 1.609344

  // Return the calculated distance
  return dist
}
