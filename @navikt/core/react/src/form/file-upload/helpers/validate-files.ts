import {
  FileObject,
  FileUploadBaseProps,
  FilesPartitioned,
  fileRejectionReason,
} from "../FileUpload.types";
import { isAcceptedFileType } from "./is-accepted-file-type";
import { isAcceptedSize } from "./is-accepted-size";

export const validateFiles = (
  files: File[],
  accept?: string,
  validator?: FileUploadBaseProps["validator"],
  maxSizeInBytes: number = -1,
) => {
  const allFiles: FileObject[] = [];
  const accepted: File[] = [];
  const rejected: FilesPartitioned["rejected"] = [];

  files.forEach((file) => {
    const acceptedFileType = isAcceptedFileType(file, accept);
    const acceptedFileSize = isAcceptedSize(file, maxSizeInBytes);
    const customValidation = validator ? validator(file) : true;

    const reasons: FilesPartitioned["rejected"][0]["reasons"] = [];
    if (customValidation !== true) {
      reasons.push(customValidation);
    }

    if (!acceptedFileType) {
      reasons.push(fileRejectionReason.FileType);
    }

    if (!acceptedFileSize) {
      reasons.push(fileRejectionReason.FileSize);
    }

    allFiles.push({
      file,
      error: reasons.length > 0,
      reasons,
    });

    if (reasons.length === 0) {
      accepted.push(file);
      return;
    }

    rejected.push({
      file,
      reasons,
    });
  });

  return {
    files: allFiles,
    partitionedFiles: {
      accepted,
      rejected,
    },
  };
};
