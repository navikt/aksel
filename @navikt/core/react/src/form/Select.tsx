import cl from "clsx";
import React, { forwardRef, SelectHTMLAttributes } from "react";

import { ChevronDownIcon } from "@navikt/aksel-icons";
import { BodyShort, ErrorMessage, Label, omit } from "..";
import { FormFieldProps, useFormField } from "./useFormField";

export interface SelectProps
  extends FormFieldProps,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /**
   * Collection of <option />-elements
   */
  children: React.ReactNode;
  /**
   * Exposes the HTML size attribute
   */
  htmlSize?: number;
  /**
   * Label for select
   */
  label: React.ReactNode;
  /**
   * If enabled shows the label and description for screenreaders only
   */
  hideLabel?: boolean;
  /**
   * Sets inline-style on select wrapper
   */
  style?: React.CSSProperties;
}

/**
 * A component that displays a select input field.
 *
 * @see https://aksel.nav.no/komponenter/core/select
 * @see {@link SelectProps}
 *
 * @example
 * ```jsx
 * <Select label="Hvilket land har du bosted i.">
 *   <option value="">Velg land</option>
 *   <option value="norge">Norge</option>
 *   <option value="sverige">Sverige</option>
 *   <option value="danmark">Danmark</option>
 * </Select>
 * ```
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const {
      inputProps,
      errorId,
      showErrorMsg,
      hasError,
      size,
      inputDescriptionId,
    } = useFormField(props, "textField");

    const {
      children,
      label,
      className,
      description,
      htmlSize,
      hideLabel = false,
      style,
      ...rest
    } = props;

    return (
      <div
        className={cl(
          className,
          "navds-form-field",
          `navds-form-field--${size}`,
          {
            "navds-form-field--disabled": !!inputProps.disabled,
            "navds-select--error": hasError,
          }
        )}
      >
        <Label
          htmlFor={inputProps.id}
          size={size}
          className={cl("navds-form-field__label", {
            "navds-sr-only": hideLabel,
          })}
        >
          {label}
        </Label>
        {!!description && (
          <BodyShort
            className={cl("navds-form-field__description", {
              "navds-sr-only": hideLabel,
            })}
            id={inputDescriptionId}
            size={size}
            as="div"
          >
            {description}
          </BodyShort>
        )}
        <div className="navds-select__container" style={style}>
          <select
            {...omit(rest, ["error", "errorId", "size"])}
            {...inputProps}
            ref={ref}
            className={cl(
              "navds-select__input",
              "navds-body-short",
              `navds-body--${size ?? "medium"}`
            )}
            size={props.htmlSize}
          >
            {children}
          </select>
          <ChevronDownIcon className="navds-select__chevron" aria-hidden />
        </div>
        <div
          className="navds-form-field__error"
          id={errorId}
          aria-relevant="additions removals"
          aria-live="polite"
        >
          {showErrorMsg && (
            <ErrorMessage size={size}>{props.error}</ErrorMessage>
          )}
        </div>
      </div>
    );
  }
);

export default Select;
