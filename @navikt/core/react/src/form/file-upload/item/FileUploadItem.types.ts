export interface FileMetadata {
  name: string;
  size?: number;
}

export type FileItem = FileMetadata | File;
