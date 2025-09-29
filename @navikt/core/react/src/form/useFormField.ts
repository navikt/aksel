import cl from "clsx";
import React, { useContext } from "react";
import { ReadMore } from "../read-more/ReadMore";
import { useId } from "../util/hooks";
import { FieldsetContext } from "./fieldset/context";

export interface FormFieldProps {
  /**
   * Error message.
   */
  error?: React.ReactNode;
  /**
   * Override internal errorId.
   */
  errorId?: string;
  /**
   * Changes font-size, padding and gaps.
   */
  size?: "medium" | "small";
  /**
   * **Avoid using if possible for accessibility purposes**.
   *
   * Disables element.
   */
  disabled?: boolean;
  /**
   * Adds a description to extend the labeling.
   */
  description?: React.ReactNode;
  /**
   * Override internal id.
   */
  id?: string;
  /**
   * Read-only state.
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
  prefix: string,
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
      "Aksel: Use of 'required' in form-elements is heavily discuouraged. Docs about why here:",
    );
    console.warn(
      "https://aksel.nav.no/god-praksis/artikler/obligatoriske-og-valgfrie-skjemafelter#dc7a536235fa",
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
            props.description && !containsReadMore(props.description),
          [errorId]: showErrorMsg,
          [fieldset?.errorId ?? ""]: hasError && fieldset?.error,
        }) || undefined,

      disabled,
    },
  };
};

export function containsReadMore(
  children: React.ReactNode,
  checkNested = true,
): boolean {
  if (React.isValidElement<{ children?: any }>(children)) {
    if (children.type === ReadMore) {
      return true;
    }
    if (children.props.children && checkNested) {
      return containsReadMore(children.props.children, false);
    }
  } else if (Array.isArray(children)) {
    return children.some((child) => containsReadMore(child, checkNested));
  }
  return false;
}
