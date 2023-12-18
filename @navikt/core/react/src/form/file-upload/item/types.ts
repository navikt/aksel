export interface FileMetadata {
  name: string;
  size?: number;
}

export interface FileBase64 extends FileMetadata {
  /**
   * The base64 data URL representation of the file, including both
   * the media type (aka MIME type) and the data.
   * Also known as a "data URI scheme".
   * Format: "data:<media-type>;base64,<data>"
   */
  base64DataUrl: string;
}

export type FileItem = FileMetadata | File | FileBase64;
