import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

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
   *
   */
  legend: React.ReactNode;
  /**
   *
   */
  description?: React.ReactNode;
}

const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({ children, className, legend, description, ...rest }, ref) => {
    return (
      <fieldset ref={ref} className={cl("navds-fieldset", className)} {...rest}>
        <legend className="navds-fieldset__legend">{legend}</legend>
        {description && <div className="navds-description">{description}</div>}
        {children}
      </fieldset>
    );
  }
);

export default Fieldset;
