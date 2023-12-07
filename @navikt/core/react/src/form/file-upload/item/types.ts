export interface FileMetadata {
  name: string;
  size?: number;
}

export interface FileBase64 extends FileMetadata {
  base64: string;
}

export type FileItem = FileMetadata | File | FileBase64;
