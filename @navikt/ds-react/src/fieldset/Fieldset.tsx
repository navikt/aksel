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
   * Fieldset description
   */
  description?: React.ReactNode;
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
    {
      children,
      className,
      legend,
      description,
      error,
      errorId = guid(),
      ...rest
    },
    ref
  ) => {
    const descriptionIdRef = useRef(description ? guid() : undefined);

    return (
      <fieldset
        ref={ref}
        className={cl("navds-fieldset", className)}
        aria-invalid={!!error}
        aria-describedby={descriptionIdRef.current + error && errorId}
        {...rest}
      >
        <legend className="navds-fieldset__legend">
          <Label spacing>{legend}</Label>
        </legend>
        {description && (
          <div className="navds-description" id={descriptionIdRef.current}>
            <Component spacing>{description}</Component>
          </div>
        )}
        {children}
      </fieldset>
    );
  }
);

export default Fieldset;
