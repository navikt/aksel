import React, { forwardRef } from "react";
import cl from "classnames";
import { guid } from "nav-frontend-js-utils";
import "@nav-frontend/forms-styles";

export interface FormgroupProps {
  children: React.ReactNode;
  /**
   * User defined classname
   */
  className?: string;
  title?: string;
  description?: string;
  error?: React.ReactNode;
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
