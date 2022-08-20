import { Calender } from "@navikt/ds-icons";
import cl from "clsx";
import React, { forwardRef, InputHTMLAttributes } from "react";
import { Button } from "../button";
import { FormFieldProps, useFormField } from "../form/useFormField";
import { BodyShort, ErrorMessage, Label } from "../typography";
import { omit } from "../util";

export interface DatePickerProps
  extends FormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  /**
   * Input label
   */
  label: React.ReactNode;
  /**
   * Shows label and description for screenreaders-only
   * @default false
   */
  hideLabel?: boolean;
  /**
   * Changes padding and font-sizes
   * @default medium
   */
  size?: "medium" | "small";
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (props, ref) => {
    const {
      inputProps,
      size = "medium",
      inputDescriptionId,
      errorId,
      showErrorMsg,
      hasError,
    } = useFormField(props, "datepicker");

    const {
      className,
      hideLabel = false,
      label,
      description,
      value,
      defaultValue,
      ...rest
    } = props;

    return (
      <div
        className={cl(
          className,
          "navds-form-field",
          `navds-form-field--${size}`,
          "navds-datepicker",
          {
            "navds-datepicker--error": hasError,
            "navds-datepicker--disabled": !!inputProps.disabled,
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
            as="div"
            className={cl("navds-form-field__description", {
              "navds-sr-only": hideLabel,
            })}
            id={inputDescriptionId}
            size={size}
          >
            {description}
          </BodyShort>
        )}
        <div className="navds-datepicker__wrapper">
          <div className="navds-datepicker__wrapper-inner">
            <input
              ref={ref}
              {...omit(rest, ["error", "errorId", "size"])}
              {...inputProps}
              /* onChange={(e) => handleChange(e.target.value)} */
              className={cl(
                className,
                "navds-datepicker__input",
                "navds-text-field__input",
                "navds-body-short",
                `navds-body-${size}`
              )}
            />
            <Button
              variant="tertiary"
              type="button"
              size="small"
              /* onClick={(e) => handleClear({ trigger: "Click", event: e })} */
              className="navds-datepicker__input-button"
              icon={<Calender title="åpne datovelger" />}
            />
          </div>
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

export default DatePicker;
