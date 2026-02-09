import { createStrictContext } from "../../../utils/helpers";
import { ComponentTranslation } from "../../../utils/i18n/i18n.types";

export type FileUploadLocaleContextProps = {
  translations?: ComponentTranslation<"FileUpload">;
};

export const {
  Provider: FileUploadLocaleContextProvider,
  useContext: useFileUploadTranslation,
} = createStrictContext<FileUploadLocaleContextProps>({
  name: "FileUploadLocaleContext",
});
