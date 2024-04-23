import cl from "clsx";
import React, { forwardRef } from "react";

export interface FormSummaryHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Must include `<FormSummary.Heading>` and optionally `<FormSummary.EditLink>`.
   */
  children: React.ReactNode;
}

export const FormSummaryHeader = forwardRef<
  HTMLDivElement,
  FormSummaryHeaderProps
>(({ children, className, ...rest }, ref) => (
  <header
    ref={ref}
    {...rest}
    className={cl("navds-form-summary__header", className)}
  >
    {children}
  </header>
));

export default FormSummaryHeader;
