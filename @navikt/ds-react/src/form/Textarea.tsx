import React, { forwardRef } from "react";
import cl from "classnames";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import useId from "./useId";
import Field from "./Field";

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
  ({ maxLength, ...props }, ref) => {
    const maxLengthId = useId();
    const hasMaxLength = maxLength !== undefined && maxLength > 0;

    return (
      <Field {...props}>
        {({ className, size, ...rest }) => (
          <div className="navds-textarea__wrapper">
            <TextareaAutosize
              {...rest}
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
              aria-describedby={cl(rest["aria-describedby"], {
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
        )}
      </Field>
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
