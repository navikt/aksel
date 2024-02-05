import { FormFieldProps } from "../../../useFormField";
import { FileUploadBaseProps } from "../../FileUpload.types";
import { ComponentTranslation } from "../../i18n/i18n.types";

export interface DropzoneProps
  extends FileUploadBaseProps,
    Omit<FormFieldProps, "size" | "readOnly"> {
  className?: string;
  /**
   * Text shown to the user.
   */
  label: string;
  /**
   * @default CloudUpIcon
   */
  icon?: React.ComponentType<any>;
  /**
   * i18n-API for easier access to customizing texts and labels
   */
  translations?: ComponentTranslation["FileUpload"];
}
