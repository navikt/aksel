import type { ComponentTranslation } from "../../../utils/i18n/i18n.types";
import type { FormFieldProps } from "../../useFormField";
import type { FileUploadBaseProps } from "../FileUpload.types";

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
   * i18n-API for customizing texts and labels.
   *
   * **NB:** `dragAndDrop`, `dragAndDropMultiple` and `or`
   * will be wrapped in `aria-hidden`, hence **not visible to screen readers**.
   */
  translations?: ComponentTranslation<"FileUpload">["dropzone"];
}
