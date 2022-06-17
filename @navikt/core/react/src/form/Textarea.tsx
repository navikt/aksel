import React, { forwardRef, useState } from "react";
import cl from "classnames";
import { BodyShort, Label, ErrorMessage, omit, Detail } from "..";
import { FormFieldProps, useFormField } from "./useFormField";
import { useId } from "..";
import TextareaAutosize from "../util/TextareaAutoSize";

/**
 * TODO: Mulighet for lokalisering av sr-only/counter text
 */
export interface TextareaProps
  extends FormFieldProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Allowed character-count for content
   * @note This is just a visual validator, you need to set actual character-limits if needed
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
   * @bug Internal scrolling with `maxLength` scrolls over maxLength-text
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
}

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

    return (
      <div
        className={cl(
          className,
          "navds-form-field",
          `navds-form-field--${size}`,
          {
            "navds-form-field--disabled": !!inputProps.disabled,
            "navds-textarea--error": hasError,
            "navds-textarea--resize": resize,
          }
        )}
      >
        <Label
          htmlFor={inputProps.id}
          size={size}
          as="label"
          className={cl("navds-form-field__label", {
            "navds-sr-only": hideLabel,
          })}
        >
          {label}
        </Label>
        {!!description && (
          <>
            {size === "medium" ? (
              <BodyShort
                className={cl("navds-form-field__description", {
                  "navds-sr-only": hideLabel,
                })}
                id={inputDescriptionId}
                size="small"
                as="div"
              >
                {description}
              </BodyShort>
            ) : (
              <Detail
                className={cl("navds-form-field__description", {
                  "navds-sr-only": hideLabel,
                })}
                id={inputDescriptionId}
                size="small"
                as="div"
              >
                {description}
              </Detail>
            )}
          </>
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
            ref={ref}
            className={cl(
              "navds-textarea__input",
              "navds-body-short",
              `navds-body-${size ?? "medium"}`,
              {
                "navds-textarea--counter": hasMaxLength,
              }
            )}
            aria-describedby={cl(inputProps["aria-describedby"], {
              [maxLengthId ?? ""]: hasMaxLength,
            })}
          />
          {hasMaxLength && (
            <>
              <span id={maxLengthId} className="navds-sr-only">
                Tekstområde med plass til {maxLength} tegn.
              </span>
              <Counter
                maxLength={maxLength}
                currentLength={props.value?.length ?? controlledValue?.length}
                size={size}
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

export const Counter = ({ maxLength, currentLength, size }) => {
  const difference = maxLength - currentLength;

  return (
    <BodyShort
      className={cl("navds-textarea__counter", {
        "navds-textarea__counter--error": difference < 0,
      })}
      aria-live={difference < 20 ? "polite" : "off"}
      size={size}
    >
      {difference < 0
        ? `Antall tegn for mye ${Math.abs(difference)}`
        : `Antall tegn igjen ${difference}`}
    </BodyShort>
  );
};

export default Textarea;
