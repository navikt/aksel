import { useContext } from "react";
import cl from "classnames";
import { FieldsetContext } from "./index";
import { useId } from "..";

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
export const useFormField = (props: FormFieldProps, prefix?: string) => {
  const { size, error, errorId: propErrorId } = props;

  const fieldset = useContext(FieldsetContext);

  const id = useId({ id: props.id, prefix: prefix ?? "" });
  const errorId = useId({ id: propErrorId, prefix: prefix + "Error" ?? "" });
  const inputDescriptionId = useId({ prefix: prefix + "Description" });

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
        }) || undefined,
      disabled,
    },
  };
};
