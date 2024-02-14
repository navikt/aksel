import {
  FileRejectionReason,
  FileUploadBaseProps,
  OnFileSelectProps,
} from "../FileUpload.types";
import { isAcceptedFileType } from "./is-accepted-file-type";
import { isAcceptedSize } from "./is-accepted-size";

export const partitionFiles = (
  files: File[],
  accept?: string,
  validator?: FileUploadBaseProps["validator"],
  maxSizeInBytes: number = -1,
): Pick<OnFileSelectProps, "acceptedFiles" | "rejectedFiles"> => {
  const acceptedFiles: File[] = [];
  const rejectedFiles: OnFileSelectProps["rejectedFiles"] = [];

  files.forEach((file) => {
    const acceptedFileType = isAcceptedFileType(file, accept);
    const acceptedFileSize = isAcceptedSize(file, maxSizeInBytes);
    const customValidation = validator ? validator(file) : true;

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

    if (reason.length === 0) {
      acceptedFiles.push(file);
      return;
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
