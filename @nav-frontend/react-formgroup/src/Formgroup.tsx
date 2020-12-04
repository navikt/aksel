import React, { forwardRef } from "react";
import cl from "classnames";
import { guid } from "nav-frontend-js-utils";
import "@nav-frontend/forms-styles";

export type FormGroupErrorContextProps = {
  error?: React.ReactNode | boolean;
  errorId?: string;
};

export const FormGroupErrorContext = React.createContext<
  Partial<FormGroupErrorContextProps>
>({});

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
   * Boolean or Element to rdisplay error
   */
  error?: React.ReactNode | boolean;
  /**
   * Custom id for Errormessage for more control
   * @defaul guid()
   */
  errorId?: string;
  /**
   * Propegates errors to children of not false
   * @default true
   */
  propagateError?: boolean;
}

const Formgroup = forwardRef<HTMLFieldSetElement, FormgroupProps>(
  (
    {
      children,
      className,
      title,
      description,
      error,
      errorId = guid(),
      propagateError = true,
    },
    ref
  ) => {
    const descriptionId = description ? guid() : undefined;

    const childrenWithContext = (
      <FormGroupErrorContext.Provider value={{ error, errorId }}>
        {children}
      </FormGroupErrorContext.Provider>
    );

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
        {propagateError ? childrenWithContext : children}
        {error && typeof error !== "boolean" && (
          <div aria-live="polite" className="navds-forms__errormsg">
            {error}
          </div>
        )}
      </fieldset>
    );
  }
);

export default Formgroup;
