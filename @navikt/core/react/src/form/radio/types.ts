import { InputHTMLAttributes } from "react";
import { FormFieldProps } from "../useFormField";

export interface RadioProps
  extends
    Omit<FormFieldProps, "error" | "errorId" | "readOnly">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value"> {
  /**
   * Radio label.
   */
  children: React.ReactNode;
  /**
   * Radio value.
   */
  value: any;
  /**
   * Adds a description to extend the labeling.
   */
  description?: string;
}
