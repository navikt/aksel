import { createStrictContext } from "../../util/create-context";
import { ComponentTranslation } from "../../util/i18n/i18n.types";

export type FileUploadLocaleContextProps = {
  translations?: ComponentTranslation<"FileUpload">;
};

export const [FileUploadLocaleContextProvider, useFileUploadTranslation] =
  createStrictContext<FileUploadLocaleContextProps>({
    name: "FileUploadLocaleContext",
  });
