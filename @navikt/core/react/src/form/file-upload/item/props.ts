
export interface FileWithoutInteraction {
  name: string;
  size?: number;
}
export interface FileWithClick extends FileWithoutInteraction {
  onClick: (file: FileWithClick) => void
}
export interface FileWithLink extends FileWithoutInteraction {
  href: string;
}

export type FileMetadata = FileWithLink | FileWithClick | FileWithoutInteraction

export type FileItem = File | FileMetadata