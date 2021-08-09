import React, { forwardRef } from "react";
import cl from "classnames";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import useId from "./useId";
import ErrorMessage from "./ErrorMessage";
import { BodyShort, Label } from "../typography";
import { GenericFormProps, useFormField } from "./useFormField";

/**
 * TODO: Mulighet for lokalisering av sr-only/counter text
 */
export interface TextareaProps
  extends GenericFormProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * @ignore
   */
  className?: string;
  /**
   * Visually allowed length of content
   */
  maxLength?: number;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  /**
   * Maximum number of rows to display.
   */
  maxRows?: number;
  /**
   * Minimum number of rows to display.
   */
  minRows?: number;
  /**
   * If enabled shows the label and description for screenreaders only
   */
  label: React.ReactNode;
  hideLabel?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      "aria-describedby": ariaDescribedby,
      hideLabel,
      ...rest
    } = props;

    const maxLengthId = useId({ prefix: "TextareaMaxLength" });
    const hasMaxLength = maxLength !== undefined && maxLength > 0;

    return (
      <div
        className={cl(
          props.className,
          "navds-form-field",
          `navds-form-field--${size}`,
          { "navds-textarea--error": hasError }
        )}
      >
        {!!label && (
          <Label
            htmlFor={inputProps.id}
            size={size}
            component="label"
            className={cl("navds-textarea__label", {
              "sr-only": !!hideLabel,
            })}
          >
            {label}
          </Label>
        )}
        {!!description && (
          <BodyShort
            className={cl("navds-textarea__description", {
              "sr-only": !!hideLabel,
            })}
            id={inputDescriptionId}
            size={size}
          >
            {description}
          </BodyShort>
        )}
        <div className="navds-textarea__wrapper">
          <TextareaAutosize
            {...inputProps}
            {...rest}
            ref={ref}
            className={cl(
              className,
              "navds-textarea__input",
              "navds-body-short",
              {
                "navds-body--s": size === "s",
                "navds-textarea--counter": hasMaxLength,
              }
            )}
            aria-describedby={cl(inputProps["aria-describedby"], {
              [maxLengthId]: hasMaxLength,
            })}
          />
          {hasMaxLength && (
            <>
              <span id={maxLengthId} className="sr-only">
                Tekstområde med plass til {maxLength} tegn., Textarea can have{" "}
                {maxLength} signs.
              </span>
              <Counter
                maxLength={maxLength}
                currentLength={props.value.length}
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
      aria-live="polite"
      size={size}
    >
      {difference < 0
        ? `Du har ${Math.abs(difference)} tegn for mye`
        : `Du har ${difference} tegn igjen`}
    </BodyShort>
  );
};

export default Textarea;
