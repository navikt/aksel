import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { FieldsetContext } from "../index";
import ErrorMessage from "./ErrorMessage";
import useId from "./useId";
import Description from "./Description";
import Label from "./Label";

/**
 * TODO: Mulighet for lokalisering av sr-only/counter text
 */

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * @ignore
   */
  className?: string;
  size?: "m" | "s";
  label?: React.ReactNode;
  description?: React.ReactNode;
  /**
   * Error message
   */
  error?: string;
  /**
   * Custom id for error message
   */
  errorId?: string;
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
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      description,
      error,
      maxLength,
      value,
      disabled,
      ...rest
    },
    ref
  ) => {
    const id = useId(rest.id);
    const errorId = useId(rest.errorId);
    const maxLengthId = useId();
    const descriptionId = useId();

    const context = useContext(FieldsetContext);

    const size = rest.size ?? context.size ?? "m";

    const hasError = !disabled && !!(error || context.error);
    const hasMaxLength = maxLength !== undefined && maxLength > 0;

    return (
      <div
        className={cl("navds-form__element", {
          "navds-textarea--error": hasError,
        })}
      >
        {label && (
          <Label htmlFor={id} size={size}>
            {label}
          </Label>
        )}
        {description && (
          <Description id={descriptionId} size={size}>
            {description}
          </Description>
        )}
        <div className="navds-textarea__wrapper">
          <TextareaAutosize
            {...rest}
            id={id}
            ref={ref}
            className={cl(
              className,
              "navds-textarea",
              `navds-textarea--${size}`,
              "navds-body-short",
              {
                "navds-body--s": size === "s",
                "navds-textarea--counter": hasMaxLength,
              }
            )}
            value={value}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={cl({
              [maxLengthId]: hasMaxLength,
              [descriptionId]: description,
              [context.errorId ?? errorId]: hasError,
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
                currentLength={value.length}
                size={size}
              />
            </>
          )}
        </div>
        <div id={errorId} aria-relevant="additions removals" aria-live="polite">
          {hasError && !context.error && (
            <ErrorMessage size={size}>{error}</ErrorMessage>
          )}
        </div>
      </div>
    );
  }
);

const Counter = ({ maxLength, currentLength, size }) => {
  const difference = maxLength - currentLength;

  return (
    <p
      className={cl("navds-textarea__counter", "navds-body-short", {
        "navds-body--s": size === "s",
        "navds-textarea__counter--error": difference < 0,
      })}
      aria-live="polite"
    >
      {difference < 0
        ? `Du har ${Math.abs(difference)} tegn for mye`
        : `Du har ${difference} tegn igjen`}
    </p>
  );
};

export default Textarea;
