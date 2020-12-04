import React, { forwardRef } from "react";
import cl from "classnames";
import { guid } from "nav-frontend-js-utils";
import "@nav-frontend/forms-styles";

export interface FormgroupProps {
  /**
   * Form elements
   */
  children: React.ReactNode;
  /**
   * User defined classname
   */
  className?: string;
  /**
   * Legend rendered at beginning of fieldset
   */
  title?: string;
  /**
   * Description rendered under lenged
   */
  description?: string;
  /**
   * String or Element to render an errormessage
   */
  error?: React.ReactNode;
  /**
   * Custom id for Errormessage for more control
   * @defaul guid()
   */
  errorId?: string;
}

const Formgroup = forwardRef<HTMLFieldSetElement, FormgroupProps>(
  (
    { children, className, title, description, error, errorId = guid() },
    ref
  ) => {
    const descriptionId = description ? guid() : undefined;

    return (
      <fieldset
        ref={ref}
        className={cl("navds-forms__formgroup", className)}
        aria-invalid={!!error}
        aria-errormessage={error ? errorId : undefined}
        aria-describedby={descriptionId}
      >
        {title && <legend className="navds-forms__legend">{title}</legend>}
        {description && (
          <div className="navds-forms__description" id={descriptionId}>
            {description}
          </div>
        )}
        {children}
        {error && (
          <div aria-live="polite" className="navds-forms__errormsg">
            {error}
          </div>
        )}
      </fieldset>
    );
  }
);

export default Formgroup;
