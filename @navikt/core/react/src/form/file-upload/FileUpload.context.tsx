import { createContext } from "../../util/create-context";

export type FileUploadLocaleContextProps = {
  locale: "nb" | "en" | undefined;
};

export const [FileUploadLocaleContextProvider, useFileUploadLocale] =
  createContext<FileUploadLocaleContextProps>({
    strict: false,
    defaultValue: { locale: "nb" },
  });
