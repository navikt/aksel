import type { InputHTMLAttributes } from "react";
import type { FormFieldProps } from "../useFormField";

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
   * Hides the label and description visually while keeping them available to screen readers.
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
