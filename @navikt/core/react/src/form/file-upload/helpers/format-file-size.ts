import { FileItem } from "../item-root/FileUploadItemRoot.types";

const MAX_MEGA_BYTES = 500;

export function formatFileSize(file: FileItem): string | null {
  if (!file.size) {
    return null;
  }
  const megaBytes = file.size / (1024 * 1024);

  if (megaBytes <= MAX_MEGA_BYTES) {
    return formatter.format(megaBytes);
  }

  return `> ${MAX_MEGA_BYTES} MB`;
}

const formatter = new Intl.NumberFormat("nb-NO", {
  style: "unit",
  unit: "megabyte",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  // @ts-expect-error - Looks like roundingMode hasn't been added to TypeScript yet
  roundingMode: "ceil",
});
