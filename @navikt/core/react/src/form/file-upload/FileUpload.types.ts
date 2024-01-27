export interface OnFileSelectProps {
  allFiles: File[];
  acceptedFiles: File[];
  rejectedFiles: File[];
}

export interface FileUploadBaseProps {
  /**
   * Indicates if it is possible
   * to select multiple files at once.
   * @default true
   */
  multiple?: boolean;
  /**
   * Indicates which file types to accept.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
   */
  accept?: string;
  /**
   * Callback triggered on file select
   */
  onSelect: (files: OnFileSelectProps) => void;
  /**
   * Custom validator that is used to decide
   * if a file is accepted or rejected.
   */
  validator?: (file: File) => boolean;
}
