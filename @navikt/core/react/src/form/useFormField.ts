import React, { useContext } from "react";
import cl from "clsx";
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
  size?: "medium" | "small";
  /**
   * Disables element
   * @note Avoid using if possible for accessibility purposes
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
  /**
   * Read only-state
   */
  readOnly?: boolean;
}

export interface FormFieldType {
  showErrorMsg: boolean;
  hasError: boolean;
  errorId: string;
  inputDescriptionId: string;
  size: "small" | "medium";
  inputProps: {
    id: string;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
    disabled?: boolean;
  };
  readOnly?: boolean;
}

/**
 * Handles props and their state for various form-fields in context with Fieldset
 */
export const useFormField = (
  props: FormFieldProps,
  prefix: string
): FormFieldType => {
  const { size, error, errorId: propErrorId } = props;

  const fieldset = useContext(FieldsetContext);

  const genId = useId();

  const id = props.id ?? `${prefix}-${genId}`;
  const errorId = propErrorId ?? `${prefix}-error-${genId}`;
  const inputDescriptionId = `${prefix}-description-${genId}`;

  const disabled = fieldset?.disabled || props.disabled;
  const readOnly =
    ((fieldset?.readOnly || props.readOnly) && !disabled) || undefined;

  const hasError: boolean =
    !disabled && !readOnly && !!(error || fieldset?.error);
  const showErrorMsg =
    !disabled && !readOnly && !!error && typeof error !== "boolean";

  const ariaInvalid = { ...(hasError ? { "aria-invalid": true } : {}) };

  if ((props as any)?.required && process.env.NODE_ENV !== "production") {
    console.warn(
      "Aksel: Use of 'required' in form-elements is heavily discuouraged. Docs about why here:"
    );
    console.warn(
      "https://aksel.nav.no/god-praksis/artikler/obligatoriske-og-valgfrie-skjemafelter#h3bfe00453471"
    );
  }

  return {
    showErrorMsg,
    hasError,
    errorId,
    inputDescriptionId,
    size: size ?? fieldset?.size ?? "medium",
    readOnly,
    inputProps: {
      id,
      ...ariaInvalid,
      "aria-describedby":
        cl(props["aria-describedby"], {
          [inputDescriptionId]:
            !!props?.description && typeof props?.description === "string",
          [errorId]: showErrorMsg,
          [fieldset?.errorId ?? ""]: hasError && !!fieldset?.error,
        }) || undefined,

      disabled,
    },
  };
};
