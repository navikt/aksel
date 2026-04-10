import React, { forwardRef, useState } from "react";
import { BodyShort, ErrorMessage, Label } from "../../typography";
import { omit, useId } from "../../utils-external";
import TextareaAutosize from "../../utils/components/textarea-autosize/TextareaAutoSize";
import { cl, composeEventHandlers } from "../../utils/helpers";
import { ReadOnlyIcon } from "../ReadOnlyIcon";
import { FormFieldProps, useFormField } from "./../useFormField";
import Counter from "./TextareaCounter";

export interface TextareaProps
  extends FormFieldProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Allowed character-count for content
   *
   * This is just a visual indicator! You will still need to handle actual character-limits/validation if needed.
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
   * Textarea label.
   */
  label: React.ReactNode;
  /**
   * If enabled shows the label and description for screenreaders only.
   */
  hideLabel?: boolean;
  /**
   * Enables resizing of field.
   */
  resize?: boolean | "vertical" | "horizontal";
  /**
   * Textarea will stop growing and get a scrollbar when there's no more room to grow.
   * Requires `display:flex` on the parent.
   * Experimental feature that may be removed or get breaking changes in a minor version.
   */
  UNSAFE_autoScrollbar?: boolean;
  /**
   * i18n-translations for counter-text
   * @deprecated Use `<Provider />`-component
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

    const [uncontrolledValue, setUncontrolledValue] = useState(
      props?.defaultValue ?? "",
    );

    const describedBy = cl(inputProps["aria-describedby"], {
      [maxLengthId ?? ""]: hasMaxLength,
    });

    return (
      <div
        className={cl(
          className,
          "aksel-form-field",
          `aksel-form-field--${size}`,
          {
            "aksel-form-field--disabled": !!inputProps.disabled,
            "aksel-form-field--readonly": readOnly,
            "aksel-textarea--readonly": readOnly,
            "aksel-textarea--error": hasError,
            "aksel-textarea--autoscrollbar": UNSAFE_autoScrollbar,
            [`aksel-textarea--resize-${resize === true ? "both" : resize}`]:
              resize,
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
            className={cl("aksel-form-field__description", {
              "aksel-sr-only": hideLabel,
            })}
            id={inputDescriptionId}
            size={size}
            as="div"
          >
            {description}
          </BodyShort>
        )}
        <TextareaAutosize
          {...omit(rest, ["error", "errorId", "size"])}
          {...inputProps}
          onChange={composeEventHandlers(
            props.onChange,
            props.value === undefined
              ? (e) => setUncontrolledValue(e.target.value)
              : undefined,
          )}
          minRows={rest.minRows || (size === "small" ? 2 : 3)}
          autoScrollbar={UNSAFE_autoScrollbar}
          ref={ref}
          readOnly={readOnly}
          className={cl(
            "aksel-textarea__input",
            "aksel-body-short",
            `aksel-body-short--${size ?? "medium"}`,
          )}
          {...(describedBy ? { "aria-describedby": describedBy } : {})}
        />
        {hasMaxLength && !readOnly && !inputProps.disabled && (
          <Counter
            maxLengthId={maxLengthId}
            maxLength={maxLength}
            currentLength={props.value?.length ?? uncontrolledValue.length}
            size={size}
            i18n={i18n}
          />
        )}
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
  },
);

export default Textarea;
