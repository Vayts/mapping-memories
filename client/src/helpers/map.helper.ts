export function getExtendBounds(bounds: any, offsetKm = 20): Record<string, number> {
  const offsetDegrees = offsetKm / 111.12;
  
  return {
    north: bounds.getNorthEast().lat() + offsetDegrees,
    south: bounds.getSouthWest().lat() - offsetDegrees,
    east: bounds.getNorthEast().lng() + offsetDegrees,
    west: bounds.getSouthWest().lng() - offsetDegrees,
  };
}
