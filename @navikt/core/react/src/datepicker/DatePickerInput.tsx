import { Calender } from "@navikt/ds-icons";
import cl from "clsx";
import React, { forwardRef, InputHTMLAttributes, useContext } from "react";
import { Button } from "../button";
import { FormFieldProps, useFormField } from "../form/useFormField";
import { BodyShort, ErrorMessage, Label } from "../typography";
import { omit } from "../util";
import { DatePickerContext } from "./DatePicker";

export interface DatePickerInputProps
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

export type DatePickerInputType = React.ForwardRefExoticComponent<
  DatePickerInputProps & React.RefAttributes<HTMLInputElement>
>;

export const DatePickerInput: DatePickerInputType = forwardRef<
  HTMLInputElement,
  DatePickerInputProps
>((props, ref) => {
  const { onOpen } = useContext(DatePickerContext);

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
        "navds-datepicker__field",
        {
          "navds-datepicker__field--error": hasError,
          "navds-datepicker__field--disabled": !!inputProps.disabled,
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
      <div className="navds-datepicker__field-wrapper">
        <input
          ref={ref}
          {...omit(rest, ["error", "errorId", "size"])}
          {...inputProps}
          autoComplete="off"
          /* onChange={(e) => handleChange(e.target.value)} */
          className={cl(
            className,
            "navds-datepicker__field-input",
            "navds-text-field__input",
            "navds-body-short",
            `navds-body-${size}`
          )}
        />
        <Button
          variant="tertiary"
          type="button"
          size="small"
          onClick={() => onOpen()}
          className="navds-datepicker__field-input-button"
          icon={<Calender title="åpne datovelger" />}
        />
      </div>
      <div
        className="navds-form-field__error"
        id={errorId}
        aria-relevant="additions removals"
        aria-live="polite"
      >
        {showErrorMsg && <ErrorMessage size={size}>{props.error}</ErrorMessage>}
      </div>
    </div>
  );
});

export default DatePickerInput;
