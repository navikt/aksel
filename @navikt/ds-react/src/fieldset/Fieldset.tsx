import React, { forwardRef, HTMLAttributes, useRef } from "react";
import cl from "classnames";
import { Label, Component } from "../index";
import { v4 as guid } from "uuid";

export interface FieldsetProps extends HTMLAttributes<HTMLFieldSetElement> {
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
  /**
   * Fieldset legend
   */
  legend: React.ReactNode;
  /**
   * Fieldset caption
   */
  caption?: React.ReactNode;
  /**
   * Error stylyling and attributes
   */
  error?: React.ReactNode;
  /**
   * Custom id for error-msg
   */
  errorId?: React.ReactNode;
}

const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  (
    { children, className, legend, caption, error, errorId = guid(), ...rest },
    ref
  ) => {
    const captionIdRef = useRef<string | undefined>(
      caption ? guid() : undefined
    );

    const describe = () => {
      const desc = [caption && captionIdRef.current, error && errorId]
        .filter((x) => !!x)
        .join(" ");
      return desc === "" ? undefined : desc;
    };

    return (
      <fieldset
        ref={ref}
        className={cl("navds-fieldset", className)}
        aria-invalid={!!error}
        aria-describedby={describe()}
        {...rest}
      >
        <legend>
          <Label spacing>{legend}</Label>
          {caption && (
            <div id={captionIdRef.current}>
              <Component spacing>{caption}</Component>
            </div>
          )}
        </legend>

        {children}

        <div id={errorId} aria-relevant="additions removals" aria-live="polite">
          {error && (
            <Label spacing className="navds-typo--error">
              {error}
            </Label>
          )}
        </div>
      </fieldset>
    );
  }
);

export default Fieldset;
