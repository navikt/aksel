import { ComponentTranslation } from "../../i18n/i18n.types";
import { createContext } from "../../util/create-context";

export type FileUploadLocaleContextProps = {
  translations?: ComponentTranslation<"FileUpload">;
};

export const [FileUploadLocaleContextProvider, useFileUploadTranslation] =
  createContext<FileUploadLocaleContextProps>();
