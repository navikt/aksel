import { createContext } from "react";

export type FileUploadContextProps = {
  locale: "nb" | "nn" | "en";
  onButtonClick: () => void;
};

export const FileUploadContext = createContext<FileUploadContextProps | null>(null);
