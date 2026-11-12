interface FileMetadata {
  name: string;
  size?: number;
}

type FileItem = FileMetadata | File;

export type { FileItem, FileMetadata };
