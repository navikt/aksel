import React, { forwardRef, useState } from "react";
import cl from "classnames";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { BodyShort, Label, ErrorMessage, omit } from "..";
import { FormFieldProps, useFormField } from "./useFormField";
import { useId } from "..";

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
      ...rest
    } = props;

    const maxLengthId = `TextareaMaxLength-${useId()}`;
    const hasMaxLength = maxLength !== undefined && maxLength > 0;

    const [controlledValue, setControlledValue] = useState<string>(
      props?.defaultValue ?? ""
    );

    return (
      <div
        className={cl(
          className,
          "navds-form-field",
          `navds-form-field--${size}`,
          {
            "navds-textarea--error": hasError,
            "navds-textarea--disabled": !!inputProps.disabled,
          }
        )}
      >
        <Label
          htmlFor={inputProps.id}
          size={size}
          as="label"
          className={cl("navds-textarea__label", {
            "navds-sr-only": hideLabel,
          })}
        >
          {label}
        </Label>
        {!!description && (
          <BodyShort
            as="div"
            className={cl("navds-textarea__description", {
              "navds-sr-only": hideLabel,
            })}
            id={inputDescriptionId}
            size={size}
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
              [maxLengthId]: hasMaxLength,
            })}
          />
          {hasMaxLength && (
            <>
              <span id={maxLengthId} className="navds-sr-only">
                Tekstområde med plass til {maxLength} tegn., Textarea can have{" "}
                {maxLength} signs.
              </span>
              <Counter
                maxLength={maxLength}
                currentLength={props.value?.length ?? controlledValue?.length}
                size={size}
              />
            </>
          )}
        </div>
        <div id={errorId} aria-relevant="additions removals" aria-live="polite">
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
        ? `Du har ${Math.abs(difference)} tegn for mye`
        : `Du har ${difference} tegn igjen`}
    </BodyShort>
  );
};

export default Textarea;
