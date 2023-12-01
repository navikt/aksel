
export interface FileWithoutInteraction {
  name: string;
  size?: number;
}
export interface FileWithClick extends FileWithoutInteraction {
  onClick: () => void
}
export interface FileWithLink extends FileWithoutInteraction {
  href: string;
}

export type FileMetadata = FileWithLink | FileWithClick | FileWithoutInteraction

export type FileItem = File | FileMetadata