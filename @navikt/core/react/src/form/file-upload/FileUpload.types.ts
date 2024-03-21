export const fileRejectionReason = {
  FileType: "fileType" as const,
  FileSize: "fileSize" as const,
};

export type FileRejectionReason =
  (typeof fileRejectionReason)[keyof typeof fileRejectionReason];

export type FileRejected = {
  file: File;
  error: true;
  reasons: string[];
};
export type FileAccepted = { file: File; error: false };

export type FileObject = FileRejected | FileAccepted;
export type FileRejectedPartitioned = {
  file: File;
  reasons: string[];
};
export type FilesPartitioned = {
  accepted: File[];
  rejected: FileRejectedPartitioned[];
};

export interface FileUploadBaseProps {
  /**
   * Indicates if it is possible to select multiple files at once.
   * @default true
   */
  multiple?: boolean;
  /**
   * Indicates which file types to accept.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
   */
  accept?: string;
  /**
   * Maximum size of a file to accept
   */
  maxSizeInBytes?: number;
  /**
   * Custom validator that is used to decide if a file is accepted or rejected.
   * @return true if the file is accepted, otherwise a string with the reason for rejection
   */
  validator?: (file: File) => true | string;
  /**
   * Callback triggered on file select
   */
  onSelect: (files: FileObject[], partitionedFiles: FilesPartitioned) => void;
  /**
   * Disables the dropzone when current >= max, unless `disabled` prop is set to `false`.
   */
  fileLimit?: {
    max: number;
    current: number;
  };
}
