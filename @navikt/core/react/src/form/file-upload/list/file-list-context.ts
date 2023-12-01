import { createContext } from "react";
import { FileItem } from "../item/props";

export type FileListContextProps = {
  locale: "nb" | "nn" | "en" | undefined;
  onRetry: ((file: FileItem) => void) | undefined;
  onDelete: ((file: FileItem) => void) | undefined;
};

export const FileListContext = createContext<FileListContextProps | null>(null);
