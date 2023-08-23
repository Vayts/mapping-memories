export function getPhotoFullName(photo: File): string {
  const smallType = photo.type.split('/').pop();
  return [photo.name, smallType].join('.');
}
