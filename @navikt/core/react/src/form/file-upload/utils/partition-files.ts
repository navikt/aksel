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
  fileLimit: FileUploadBaseProps["fileLimit"] = { max: -1, current: -1 },
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

    if (fileLimit.max > 0 && fileLimit.current + (index + 1) > fileLimit.max) {
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
