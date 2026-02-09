import type { ComponentTranslation } from "../../../../utils/i18n/i18n.types";
import { FormFieldProps } from "../../../useFormField";
import { FileUploadBaseProps } from "../../FileUpload.types";

export interface FileUploadDropzoneProps
  extends
    FileUploadBaseProps,
    Omit<FormFieldProps, "size" | "readOnly">,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect" | "onClick">,
    Pick<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  /**
   * Text shown to the user.
   */
  label: string;
  /**
   * @default CloudUpIcon
   */
  icon?: React.ComponentType<any>;
  /**
   * i18n-API for customizing texts and labels
   */
  translations?: ComponentTranslation<"FileUpload">["dropzone"];
}
