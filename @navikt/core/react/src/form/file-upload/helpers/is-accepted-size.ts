export function isAcceptedSize(file: File, maxSize: number = -1): boolean {
  if (maxSize <= 0 || file.size <= maxSize) {
    return true;
  }

  return false;
}
