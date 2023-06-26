import { CalendarIcon } from "@navikt/aksel-icons";
import cl from "clsx";
import React, { forwardRef, InputHTMLAttributes } from "react";
import { BodyShort, ErrorMessage, Label, omit } from "..";
import { FormFieldProps, useFormField } from "../form/useFormField";
import { useDateInputContext } from "./context";
import { ReadOnlyIcon } from "../form/ReadOnlyIcon";

export interface DateInputProps
  extends FormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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
  /**
   * @private
   */
  variant?: "datepicker" | "monthpicker";
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>((props, ref) => {
  const {
    className,
    hideLabel = false,
    label,
    description,
    variant = "datepicker",
    ...rest
  } = props;

  const isDatepickerVariant = variant === "datepicker";

  const conditionalVariables = {
    prefix: isDatepickerVariant ? "datepicker-input" : "monthpicker-input",
    iconTitle: {
      open: isDatepickerVariant ? "Åpne datovelger" : "Åpne månedsvelger",
      close: isDatepickerVariant ? "Lukk datovelger" : "Lukk månedsvelger",
    },
  };

  const { onOpen, ariaId, open } = useDateInputContext();

  const {
    inputProps,
    size = "medium",
    inputDescriptionId,
    errorId,
    showErrorMsg,
    hasError,
    readOnly,
  } = useFormField(props, conditionalVariables.prefix);

  return (
    <div
      className={cl(
        className,
        "navds-form-field",
        `navds-form-field--${size}`,
        "navds-date__field",
        {
          "navds-text-field--error": hasError,
          "navds-date__field--error": hasError,
          "navds-form-field--disabled": !!inputProps.disabled,
          "navds-text-field--disabled": !!inputProps.disabled,
          "navds-text-field--readonly": readOnly,
          "navds-date__field--readonly": readOnly,
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
        <ReadOnlyIcon readOnly={readOnly} />
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
      <div className="navds-date__field-wrapper">
        <input
          ref={ref}
          {...omit(rest, ["error", "errorId", "size"])}
          {...inputProps}
          autoComplete="off"
          aria-controls={ariaId}
          readOnly={readOnly}
          className={cl(
            "navds-date__field-input",
            "navds-text-field__input",
            "navds-body-short",
            `navds-body-${size}`
          )}
          size={14}
        />
        <button
          disabled={inputProps.disabled || readOnly}
          tabIndex={open ? -1 : 0}
          onClick={() => onOpen()}
          type="button"
          className="navds-date__field-button"
        >
          <CalendarIcon
            pointerEvents="none"
            title={
              open
                ? conditionalVariables.iconTitle.close
                : conditionalVariables.iconTitle.open
            }
          />
        </button>
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

export const DatePickerInput = forwardRef<HTMLInputElement, DateInputProps>(
  (props, ref) => <DateInput {...props} ref={ref} />
);

export const MonthPickerInput = forwardRef<HTMLInputElement, DateInputProps>(
  (props, ref) => <DateInput {...props} variant="monthpicker" ref={ref} />
);
