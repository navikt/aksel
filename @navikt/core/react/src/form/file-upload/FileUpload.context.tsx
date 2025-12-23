import { createStrictContext } from "../../util/create-strict-context";
import { ComponentTranslation } from "../../util/i18n/i18n.types";

export type FileUploadLocaleContextProps = {
  translations?: ComponentTranslation<"FileUpload">;
};

export const {
  Provider: FileUploadLocaleContextProvider,
  useContext: useFileUploadTranslation,
} = createStrictContext<FileUploadLocaleContextProps>({
  name: "FileUploadLocaleContext",
});
