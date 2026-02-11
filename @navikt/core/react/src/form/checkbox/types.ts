import { InputHTMLAttributes } from "react";
import { FormFieldProps } from "../useFormField";

export interface CheckboxProps
  extends
    FormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value"> {
  /**
   * Adds error indication on checkbox.
   * @default false
   */
  error?: boolean;
  /**
   * Id for error resulting in checkbox having error.
   */
  errorId?: string;
  /**
   * Checkbox label.
   */
  children: React.ReactNode;
  /**
   * Hides label and makes it viewable for screen-readers only.
   */
  hideLabel?: boolean;
  /**
   * Checkbox value.
   */
  value?: any;
  /**
   * Specify whether the Checkbox is in an indeterminate state.
   * @default false
   */
  indeterminate?: boolean;
  /**
   * Adds a description to extend the labeling.
   */
  description?: string;
}
