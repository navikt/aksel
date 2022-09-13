import cl from "clsx";
import { Calender } from "@navikt/ds-icons";
import React, { forwardRef, InputHTMLAttributes, useContext } from "react";
import { Button } from "../button";
import { MonthPickerContext } from "./MonthPicker";
import { BodyShort, ErrorMessage, Label } from "..";
import { FormFieldProps, useFormField } from "../form/useFormField";
import { omit } from "../util";

export interface MonthPickerInputProps
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
  wrapperRef?: React.RefObject<HTMLDivElement>;
}

export type MonthPickerInputType = React.ForwardRefExoticComponent<
  MonthPickerInputProps & React.RefAttributes<HTMLInputElement>
>;

export const MonthPickerInput: MonthPickerInputType = forwardRef<
  HTMLInputElement,
  MonthPickerInputProps
>((props, ref) => {
  const { onOpen, buttonRef, open, ariaId } = useContext(MonthPickerContext);

  const {
    inputProps,
    size = "medium",
    inputDescriptionId,
    errorId,
    showErrorMsg,
    hasError,
  } = useFormField(props, "monthpicker-input");

  const { className, label, description, hideLabel = false, ...rest } = props;

  return (
    <div
      className={cl(
        className,
        "navds-form-field",
        `navds-form-field--${size}`,
        "navds-date__field",
        {
          "navds-date__field--error": hasError,
          "navds-date__field--disabled": !!inputProps.disabled,
        }
      )}
      ref={props?.wrapperRef}
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
          size={size}
          id={inputDescriptionId}
        >
          {description}
        </BodyShort>
      )}
      <div className="navds-date__field-wrapper">
        <input
          ref={ref}
          {...omit(rest, ["error", "errorId", "size", "wrapperRef"])}
          {...inputProps}
          autoComplete="off"
          className={cl(
            className,
            "navds-date__field-input",
            "navds-text-field__input",
            "navds-body-short",
            `navds-body-${size}`
          )}
          size={14}
          aria-haspopup="grid"
          aria-controls={ariaId}
        />
        <Button
          ref={buttonRef}
          variant="tertiary"
          type="button"
          size="small"
          onClick={() => onOpen()}
          className="navds-month__field-button"
          icon={
            <Calender
              title={open ? "Lukk månedsvelger" : "Åpne månedsvelger"}
            />
          }
          aria-haspopup="grid"
        />
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
    </div>
  );
});

export default MonthPickerInput;
