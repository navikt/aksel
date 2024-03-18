import cl from "clsx";
import React, { InputHTMLAttributes, forwardRef, useRef } from "react";
import { CalendarIcon } from "@navikt/aksel-icons";
import { ReadOnlyIcon } from "../../form/ReadOnlyIcon";
import { FormFieldProps, useFormField } from "../../form/useFormField";
import { BodyShort, ErrorMessage, Label } from "../../typography";
import { omit } from "../../util";
import { useDateInputContext } from "../context";

export interface DateInputProps
  extends FormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Input label
   */
  label: React.ReactNode;
  /**
   * Shows label and description for screen readers only
   * @default false
   */
  hideLabel?: boolean;
  /**
   * Changes padding and font-sizes
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * @private
   */
  variant?: "datepicker" | "monthpicker";
  /**
   * @private
   */
  setAnchorRef?: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>((props, ref) => {
  const {
    className,
    hideLabel = false,
    label,
    description,
    variant = "datepicker",
    setAnchorRef,
    ...rest
  } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);

  const isDatepickerVariant = variant === "datepicker";

  const conditionalVariables = {
    prefix: isDatepickerVariant ? "datepicker-input" : "monthpicker-input",
    iconTitle: {
      open: isDatepickerVariant ? "Åpne datovelger" : "Åpne månedsvelger",
      close: isDatepickerVariant ? "Lukk datovelger" : "Lukk månedsvelger",
    },
  };

  const context = useDateInputContext();

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
          "navds-form-field--readonly": readOnly,
          "navds-text-field--readonly": readOnly,
          "navds-date__field--readonly": readOnly,
        },
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
          aria-controls={context?.open ? context.ariaId : undefined}
          readOnly={readOnly}
          className={cl(
            "navds-date__field-input",
            "navds-text-field__input",
            "navds-body-short",
            `navds-body-short--${size}`,
          )}
          size={isDatepickerVariant ? 11 : 14}
        />
        <button
          disabled={inputProps.disabled || readOnly}
          tabIndex={readOnly ? -1 : context?.open ? -1 : 0}
          onClick={() => {
            context?.onOpen();
            setAnchorRef?.(buttonRef.current);
          }}
          type="button"
          className="navds-date__field-button"
          ref={buttonRef}
        >
          <CalendarIcon
            pointerEvents="none"
            title={
              context?.open
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
  (props, ref) => <DateInput {...props} ref={ref} />,
);

export const MonthPickerInput = forwardRef<HTMLInputElement, DateInputProps>(
  (props, ref) => <DateInput {...props} variant="monthpicker" ref={ref} />,
);
