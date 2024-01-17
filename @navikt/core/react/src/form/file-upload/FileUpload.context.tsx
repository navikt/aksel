import { createContext } from "../../util/create-context";

export type FileUploadLocaleContextProps = {
  locale: "nb" | "nn" | "en" | undefined;
};

export const [FileUploadLocaleContextProvider, useFileUploadLocale] =
  createContext<FileUploadLocaleContextProps>({ strict: false });
