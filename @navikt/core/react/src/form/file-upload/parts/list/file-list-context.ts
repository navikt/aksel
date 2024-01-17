import { createContext } from "react";

export type FileListContextProps = {
  locale: "nb" | "nn" | "en" | undefined;
};

export const FileListContext = createContext<FileListContextProps | null>(null);
