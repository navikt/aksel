
export interface FileMetadata {
  name: string;
  size?: number;
}

export type FileItem = File | FileMetadata