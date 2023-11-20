import cl from "clsx";
import React, { forwardRef, useState } from "react";
import { BodyShort, ErrorMessage, Label } from "../typography";
import { omit, useId } from "../util";
import TextareaAutosize from "../util/TextareaAutoSize";
import { ReadOnlyIcon } from "./ReadOnlyIcon";
import Counter from "./TextareaCounter";
import { FormFieldProps, useFormField } from "./useFormField";

/**
 * TODO: Mulighet for lokalisering av sr-only/counter text
 */
export interface TextareaProps
  extends FormFieldProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Allowed character-count for content
   * @note This is just a visual indicator! You will need to handle actual character-limits/validation if needed
   */
  maxLength?: number;
  /**
   * Controlled value
   */
  value?: string;
  /**
   * Defaults input-value without needing controlled-state
   */
  defaultValue?: string;
  /**
   * Maximum number of character rows to display.
   */
  maxRows?: number;
  /**
   * Minimum number of character-rows to display when empty.
   */
  minRows?: number;
  /**
   * Textarea label
   */
  label: React.ReactNode;
  /**
   * If enabled shows the label and description for screenreaders only
   */
  hideLabel?: boolean;
  /**
   * Enables resizing of field
   */
  resize?: boolean;
  /**
   * Textarea will stop growing and get a scrollbar when there's no more room to grow.
   * Requires `display:flex` on the parent.
   * Experimental feature that may be removed or get breaking changes in a minor version.
   */
  UNSAFE_autoScrollbar?: boolean;
  /**
   * i18n-translations for counter-text
   */
  i18n?: {
    /** @default tegn igjen */
    counterLeft?: string;
    /** @default tegn for mye */
    counterTooMuch?: string;
  };
}

/**
 * A component that displays a textarea input field with a label.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/textarea)
 * @see 🏷️ {@link TextareaProps}
 *
 * @example
 * ```jsx
 * <Textarea label="Har du noen tilbakemeldinger?" />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const {
      inputProps,
      errorId,
      showErrorMsg,
      hasError,
      size,
      inputDescriptionId,
    } = useFormField(props, "textarea");

    const {
      label,
      className,
      description,
      maxLength,
      hideLabel = false,
      resize,
      UNSAFE_autoScrollbar,
      i18n,
      readOnly,
      ...rest
    } = props;

    const maxLengthId = useId();
    const hasMaxLength = maxLength !== undefined && maxLength > 0;

    const [controlledValue, setControlledValue] = useState<string>(
      props?.defaultValue ?? ""
    );

    const getMinRows = () => {
      let rows = rest?.minRows ? rest?.minRows : 3;
      if (size === "small") {
        rows = rest?.minRows ? rest?.minRows : 2;
      }
      return rows;
    };

    const describedBy = cl(inputProps["aria-describedby"], {
      [maxLengthId ?? ""]: hasMaxLength,
    });

    return (
      <div
        className={cl(
          className,
          "navds-form-field",
          `navds-form-field--${size}`,
          {
            "navds-form-field--disabled": !!inputProps.disabled,
            "navds-form-field--readonly": readOnly,
            "navds-textarea--readonly": readOnly,
            "navds-textarea--error": hasError,
            "navds-textarea--resize": resize,
            "navds-textarea--autoscrollbar": UNSAFE_autoScrollbar,
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
        <div className="navds-textarea__wrapper">
          <TextareaAutosize
            {...omit(rest, ["error", "errorId", "size"])}
            {...inputProps}
            onChange={(e) =>
              props.onChange
                ? props.onChange(e)
                : setControlledValue(e.target.value)
            }
            minRows={getMinRows()}
            autoScrollbar={UNSAFE_autoScrollbar}
            ref={ref}
            readOnly={readOnly}
            className={cl(
              "navds-textarea__input",
              "navds-body-short",
              `navds-body-short--${size ?? "medium"}`
            )}
            {...(describedBy ? { "aria-describedby": describedBy } : {})}
          />
          {hasMaxLength && !readOnly && !inputProps.disabled && (
            <>
              <span id={maxLengthId} className="navds-sr-only">
                {`Tekstområde med plass til ${maxLength} tegn.`}
              </span>
              <Counter
                maxLength={maxLength}
                currentLength={props.value?.length ?? controlledValue?.length}
                size={size}
                i18n={i18n}
              />
            </>
          )}
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

export default Textarea;
