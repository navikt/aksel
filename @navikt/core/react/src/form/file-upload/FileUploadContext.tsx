import { createContext } from "react";

export type FileUploadContextProps = {
  locale: "nb" | "nn" | "en"
};

export const FileUploadContext = createContext<FileUploadContextProps | null>(null);
