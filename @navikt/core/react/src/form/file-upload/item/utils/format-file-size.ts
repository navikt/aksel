import { FileItem } from "../Item";

const MAX_MEGA_BYTES = 500;

export function formatFileSize(file: FileItem): string | null {
  if (!file.size) {
    return null
  }
  const megaBytes = file.size / (1024 * 1024)

  if (megaBytes <= MAX_MEGA_BYTES) {
    return `${roundUpToFixed(megaBytes)} MB`.replace(".", ",")
  }

  return `> ${MAX_MEGA_BYTES} MB`
}

function roundUpToFixed(value) {
  const decimalsToKeep = 2
  var factor = Math.pow(10, decimalsToKeep);
  var rounded = Math.ceil(value * factor) / factor;
  return rounded.toFixed(decimalsToKeep);
}