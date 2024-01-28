import {
  FileRejectionReason,
  FileUploadBaseProps,
  OnFileSelectProps,
} from "../FileUpload.types";
import { isAcceptedFileType } from "./is-accepted-file-type";
import { acceptedSize } from "./is-accepted-size";

export const partitionFiles = (
  files: File[],
  accept?: string,
  validator?: FileUploadBaseProps["validator"],
  maxSizeInBytes: number = -1,
  maxFiles: number = -1,
  currentFileCount: number = -1,
): Pick<OnFileSelectProps, "acceptedFiles" | "rejectedFiles"> => {
  const acceptedFiles: File[] = [];
  const rejectedFiles: OnFileSelectProps["rejectedFiles"] = [];

  files.forEach((file, index) => {
    const acceptedFileType = isAcceptedFileType(file, accept);
    const acceptedFileSize = acceptedSize(file, maxSizeInBytes);
    const customValidation = validator ? validator(file) : true;

    if (acceptedFileType && customValidation === true) {
      acceptedFiles.push(file);
      return;
    }

    const reason: OnFileSelectProps["rejectedFiles"][0]["reason"] = [];
    if (customValidation !== true) {
      reason.push(customValidation);
    }

    if (!acceptedFileType) {
      reason.push(FileRejectionReason.FileType);
    }

    if (!acceptedFileSize) {
      reason.push(FileRejectionReason.FileSize);
    }

    if (maxFiles > 0 && currentFileCount + (index + 1) > maxFiles) {
      reason.push(FileRejectionReason.FileCount);
    }

    rejectedFiles.push({
      file,
      reason,
    });
  });

  return {
    acceptedFiles,
    rejectedFiles,
  };
};
