import React, { SelectHTMLAttributes, forwardRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { useRenameCSS } from "../../theme/Theme";
import { BodyShort, ErrorMessage, Label } from "../../typography";
import { omit } from "../../util";
import { ReadOnlyIconWithTitle } from "../ReadOnlyIcon";
import { FormFieldProps, useFormField } from "../useFormField";

export interface SelectProps
  extends FormFieldProps,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "multiple"> {
  /**
   * Collection of <option />-elements.
   */
  children: React.ReactNode;
  /**
   * Exposes the HTML size attribute.
   */
  htmlSize?: number;
  /**
   * Sets inline-style on select wrapper.
   */
  style?: React.CSSProperties;
  /**
   * Label for select.
   */
  label: React.ReactNode;
  /**
   * Shows label and description for screenreaders only.
   */
  hideLabel?: boolean;
}

/**
 * A component that displays a select input field.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/select)
 * @see 🏷️ {@link SelectProps}
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
      readOnly,
    } = useFormField(props, "select");

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

    const { cn } = useRenameCSS();

    const readOnlyEventHandlers = {
      onMouseDown: (evt) => {
        // NOTE: does not prevent click
        if (readOnly) {
          evt.preventDefault();
          // focus on the element as per readonly input behavior
          evt.target.focus();
        }
      },
      onKeyDown: (evt) => {
        if (
          readOnly &&
          ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", " "].includes(
            evt.key,
          )
        ) {
          evt.preventDefault();
        }
      },
    };

    return (
      <div
        className={cn(
          className,
          "navds-form-field",
          `navds-form-field--${size}`,
          {
            "navds-form-field--disabled": !!inputProps.disabled,
            "navds-form-field--readonly": readOnly,
            "navds-select--error": hasError,
            "navds-select--readonly": readOnly,
          },
        )}
      >
        <Label
          htmlFor={inputProps.id}
          size={size}
          className={cn("navds-form-field__label", {
            "navds-sr-only": hideLabel,
          })}
        >
          {readOnly && <ReadOnlyIconWithTitle />}
          {label}
        </Label>
        {!!description && (
          <BodyShort
            className={cn("navds-form-field__description", {
              "navds-sr-only": hideLabel,
            })}
            id={inputDescriptionId}
            size={size}
            as="div"
          >
            {description}
          </BodyShort>
        )}
        <div className={cn("navds-select__container")} style={style}>
          <select
            {...omit(rest, ["error", "errorId", "size", "readOnly"])}
            {...inputProps}
            {...readOnlyEventHandlers}
            ref={ref}
            className={cn(
              "navds-select__input",
              "navds-body-short",
              `navds-body-short--${size ?? "medium"}`,
            )}
            size={htmlSize}
          >
            {children}
          </select>
          <ChevronDownIcon
            className={cn("navds-select__chevron")}
            aria-hidden
          />
        </div>
        <div
          className={cn("navds-form-field__error")}
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
  },
);

export default Select;
