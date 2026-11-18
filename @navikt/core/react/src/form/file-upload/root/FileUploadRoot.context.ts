import { createStrictContext } from "../../../utils/helpers";
import type { ComponentTranslation } from "../../../utils/i18n/i18n.types";

type FileUploadLocaleContextProps = {
  translations?: ComponentTranslation<"FileUpload">;
};

const {
  Provider: FileUploadLocaleContextProvider,
  useContext: useFileUploadTranslation,
} = createStrictContext<FileUploadLocaleContextProps>({
  name: "FileUploadLocaleContext",
});

export { FileUploadLocaleContextProvider, useFileUploadTranslation };
export type { FileUploadLocaleContextProps };
