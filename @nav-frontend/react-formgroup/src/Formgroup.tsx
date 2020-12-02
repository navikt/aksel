import React, { forwardRef } from "react";
import cl from "classnames";
import "@nav-frontend/forms-styles";

export interface FormgroupProps {
  /**
   * User defined classname
   */
  className?: string;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Formgroup = forwardRef<HTMLFieldSetElement, FormgroupProps>(
  ({ children, className, title, description }, ref) => {
    return (
      <fieldset ref={ref} className={cl("navds-formgroup", className)}>
        {title && <legend>{title}</legend>}
        {description && <div>{description}</div>}
        {children}
      </fieldset>
    );
  }
);

export default Formgroup;
