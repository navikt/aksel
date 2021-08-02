import cl from "classnames";
import React, { FieldsetHTMLAttributes, forwardRef } from "react";
import Description from "./Description";
import ErrorMessage from "./ErrorMessage";
import useId from "./useId";

export type FieldsetContextProps = {
  error?: string | undefined;
  errorId?: string | undefined;
  size?: "m" | "s";
};

export const FieldsetContext = React.createContext<FieldsetContextProps>({});
export interface FieldsetProps
  extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
  /**
   * Toggles between spacious and tighter design
   * @default "m"
   */
  size?: "m" | "s";
  /**
   * Fieldset legend
   */
  legend: React.ReactNode;
  /**
   * Fieldset description
   */
  description?: React.ReactNode;
  /**
   * Error message
   */
  error?: string;
  /**
   * Custom id for error message
   */
  errorId?: string;
}

const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  (
    { children, className, legend, description, error, size = "m", ...rest },
    ref
  ) => {
    const errorId = useId(rest.errorId);
    const descriptionId = useId();

    return (
      <FieldsetContext.Provider value={{ error, errorId, size }}>
        <fieldset
          ref={ref}
          className={cl(
            className,
            "navds-fieldset",
            `navds-fieldset--${size}`,
            { "navds-fieldset--error": !!error }
          )}
          aria-invalid={!!error}
          aria-describedby={cl({
            [descriptionId]: description,
            [errorId]: error,
          })}
          {...rest}
        >
          <legend
            className={cl("navds-form__legend", "navds-label", {
              "navds-label--s": size === "s",
            })}
          >
            {legend}
          </legend>
          {description && (
            <Description id={descriptionId} size={size}>
              {description}
            </Description>
          )}
          {children}
          <div
            id={errorId}
            aria-relevant="additions removals"
            aria-live="polite"
          >
            {error && <ErrorMessage size={size}>{error}</ErrorMessage>}
          </div>
        </fieldset>
      </FieldsetContext.Provider>
    );
  }
);

export default Fieldset;
