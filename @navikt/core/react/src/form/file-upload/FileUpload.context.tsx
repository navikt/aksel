import { createContext } from "../../util/create-context";
import type { ComponentTranslation } from "../../util/i18n/i18n.types";

export type FileUploadLocaleContextProps = {
  translations?: ComponentTranslation<"FileUpload">;
};

export const [FileUploadLocaleContextProvider, useFileUploadTranslation] =
  createContext<FileUploadLocaleContextProps>();
