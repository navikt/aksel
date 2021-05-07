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
  /**
   *
   */
  inline?: boolean;
}

const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  (
    { children, className, legend, description, inline = false, ...rest },
    ref
  ) => {
    return (
      <fieldset
        ref={ref}
        className={cl("navds-fieldset", className, {
          "navds-fieldset--inline": inline,
        })}
        {...rest}
      >
        <legend className="navds-fieldset__legend">{legend}</legend>
        {description && !inline && (
          <span className="navds-description">{description}</span>
        )}
        {children}
        {description && inline && (
          <span className="navds-description">{description}</span>
        )}
      </fieldset>
    );
  }
);

export default Fieldset;
