import React, { forwardRef, SelectHTMLAttributes } from "react";
import cl from "classnames";
import { GenericFormProps, useFormField } from "./useFormField";
import { BodyShort, Label } from "../typography";
import ErrorMessage from "./ErrorMessage";
import { Expand } from "@navikt/ds-icons";

export interface SelectProps
  extends GenericFormProps,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /**
   * @ignore
   */
  className?: string;
  /**
   * Expose the HTML size attribute
   */
  htmlSize?: number;
  label?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, ...props }, ref) => {
    const {
      inputProps,
      errorId,
      showErrorMsg,
      hasError,
      size,
      inputDescriptionId,
    } = useFormField(props, "textField");

    const { label, className, description, htmlSize, ...rest } = props;

    return (
      <div
        className={cl(
          props.className,
          "navds-form-field",
          `navds-form-field--${size}`,
          { "navds-select--error": hasError }
        )}
      >
        {!!label && (
          <Label
            htmlFor={inputProps.id}
            size={size}
            component="label"
            className="navds-select__label"
          >
            {label}
          </Label>
        )}
        {!!description && (
          <BodyShort
            className="navds-select__description"
            id={inputDescriptionId}
            size={size}
          >
            {description}
          </BodyShort>
        )}
        <div className="navds-select__container">
          <select
            {...rest}
            {...inputProps}
            ref={ref}
            className={cl(
              className,
              "navds-select__input",
              "navds-body-short",
              {
                "navds-body--s": size === "s",
              }
            )}
            size={props.htmlSize}
          >
            {children}
          </select>
          <Expand className="navds-select__chevron" />
        </div>
        <div id={errorId} aria-relevant="additions removals" aria-live="polite">
          {showErrorMsg && (
            <ErrorMessage size={size}>{props.error}</ErrorMessage>
          )}
        </div>
      </div>
    );
  }
);

export default Select;
