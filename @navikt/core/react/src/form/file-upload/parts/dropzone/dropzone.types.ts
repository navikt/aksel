import { FormFieldProps } from "../../../useFormField";
import { FileUploadBaseProps } from "../../FileUpload.types";

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
   * @default "Dra og slipp [filer / fil] her"
   */
  dragDropText?: string;
  /**
   * @default "Velg [filer / fil]"
   */
  buttonText?: string;
  /**
   * @default ...
   */
  disabledText?: string;
}
