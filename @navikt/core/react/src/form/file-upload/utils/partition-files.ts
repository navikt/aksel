import { isAcceptedFileType } from "./is-accepted-file-type";

export const partitionFiles = (
  files: File[],
  accept?: string,
  validator?: (file: File) => void
): { acceptedFiles: File[]; rejectedFiles: File[] } => {
  const acceptedFiles: File[] = [];
  const rejectedFiles: File[] = [];

  files.forEach((file) => {
    const isAccepted =
      isAcceptedFileType(file, accept) && (validator?.(file) ?? true);
    if (isAccepted) {
      acceptedFiles.push(file);
    } else {
      rejectedFiles.push(file);
    }
  });

  return {
    acceptedFiles,
    rejectedFiles,
  };
};
