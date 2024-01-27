import { FormFieldProps } from "../../../useFormField";
import { FileUploadBaseProps } from "../../FileUpload.types";

export interface OnFileSelectProps {
  allFiles: File[];
  acceptedFiles: File[];
  rejectedFiles: File[];
}

export interface DropzoneProps
  extends FileUploadBaseProps,
    Omit<FormFieldProps, "size" | "disabled" | "readOnly">,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "children" | "size" | "onSelect"
    > {
  /**
   * Text shown to the user.
   */
  label: string;
}
