import React, { InputHTMLAttributes, forwardRef, useRef } from "react";
import { CalendarIcon } from "@navikt/aksel-icons";
import { ReadOnlyIcon } from "../form/ReadOnlyIcon";
import { FormFieldProps, useFormField } from "../form/useFormField";
import { BodyShort, ErrorMessage, Label } from "../typography";
import { omit } from "../utils-external";
import { cl, createStrictContext } from "../utils/helpers";
import { useDateTranslationContext } from "./Date.locale";

interface DateInputContextProps {
  /**
   * Open state for popover
   */
  open: boolean;
  /**
   * Callback for onOpen toggle
   */
  onOpen: () => void;
  /**
   * Aria-connected ID
   */
  ariaId?: string;
  /**
   * Flag for enabled-check
   */
  defined: boolean;
}

export const {
  Provider: DateInputContextProvider,
  useContext: useDateInputContext,
} = createStrictContext<DateInputContextProps>({
  name: "DateInputContext",
  errorMessage: "useDateInputContext must be used with DateInputContext",
});

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
  const translate = useDateTranslationContext().translate;

  const isDatepickerVariant = variant === "datepicker";

  const conditionalVariables = {
    prefix: isDatepickerVariant ? "datepicker-input" : "monthpicker-input",
    iconTitle: {
      open: isDatepickerVariant ? "openDatePicker" : "openMonthPicker",
      close: isDatepickerVariant ? "closeDatePicker" : "closeMonthPicker",
    },
  } as const;

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
        "aksel-form-field",
        `aksel-form-field--${size}`,
        "aksel-date__field",
        {
          "aksel-text-field--error": hasError,
          "aksel-date__field--error": hasError,
          "aksel-form-field--disabled": !!inputProps.disabled,
          "aksel-text-field--disabled": !!inputProps.disabled,
          "aksel-form-field--readonly": readOnly,
          "aksel-text-field--readonly": readOnly,
          "aksel-date__field--readonly": readOnly,
        },
      )}
    >
      <Label
        htmlFor={inputProps.id}
        size={size}
        className={cl("aksel-form-field__label", {
          "aksel-sr-only": hideLabel,
        })}
      >
        {readOnly && <ReadOnlyIcon />}
        {label}
      </Label>
      {!!description && (
        <BodyShort
          as="div"
          className={cl("aksel-form-field__description", {
            "aksel-sr-only": hideLabel,
          })}
          id={inputDescriptionId}
          size={size}
        >
          {description}
        </BodyShort>
      )}
      <div className="aksel-date__field-wrapper">
        <input
          ref={ref}
          {...omit(rest, ["error", "errorId", "size"])}
          {...inputProps}
          autoComplete="off"
          aria-controls={context?.open ? context.ariaId : undefined}
          readOnly={readOnly}
          className={cl(
            "aksel-date__field-input",
            "aksel-text-field__input",
            "aksel-body-short",
            `aksel-body-short--${size}`,
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
          className="aksel-date__field-button"
          ref={buttonRef}
        >
          <CalendarIcon
            title={translate(
              conditionalVariables.iconTitle[context?.open ? "close" : "open"],
            )}
          />
        </button>
      </div>
      <div
        className="aksel-form-field__error"
        id={errorId}
        aria-relevant="additions removals"
        aria-live="polite"
      >
        {showErrorMsg && (
          <ErrorMessage size={size} showIcon>
            {props.error}
          </ErrorMessage>
        )}
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
