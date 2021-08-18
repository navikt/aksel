import { useContext } from "react";
import cl from "classnames";
import { FieldsetContext } from "./index";
import { useId } from "../index";

export interface FormFieldProps {
  /**
   * Error message for element
   */
  error?: React.ReactNode;
  /**
   * Override internal errorId
   */
  errorId?: string;
  /**
   * Changes font-size, padding and gaps
   */
  size?: "m" | "s";
  /**
   * Disables element
   */
  disabled?: boolean;
  /**
   * Adds a description to extend labling of a field
   */
  description?: React.ReactNode;
  /**
   * Override internal id
   */
  id?: string;
}

/**
 * Handles props and their state for various form-fields in context with Fieldset
 */
export const useFormField = (props: FormFieldProps, prefix: string) => {
  const { size, error, errorId: propErrorId } = props;

  const fieldset = useContext(FieldsetContext);

  const genId = useId();

  const id = props.id ?? `${prefix}-${genId}`;
  const errorId = propErrorId ?? `${prefix}-error-${genId}`;
  const inputDescriptionId = `${prefix}-description-${genId}`;

  const disabled = fieldset?.disabled || props.disabled;
  const hasError: boolean = !disabled && !!(error || fieldset?.error);
  const showErrorMsg = !disabled && !!error && typeof error !== "boolean";

  return {
    showErrorMsg,
    hasError,
    errorId,
    inputDescriptionId,
    size: size ?? fieldset?.size ?? "m",
    inputProps: {
      id,
      "aria-invalid": hasError,
      "aria-describedby":
        cl(props["aria-describedby"], {
          [inputDescriptionId]: !!props?.description,
          [errorId]: showErrorMsg,
          [fieldset?.errorId ?? ""]: hasError && !!fieldset?.error,
        }) || undefined,
      disabled,
    },
  };
};
