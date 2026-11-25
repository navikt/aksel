import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";

interface FormSummaryFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Should include `<FormSummary.EditLink>`.
   */
  children: React.ReactNode;
}

/**
 * Footer component for the form summary, if applicable this is a good place for `<FormSummary.EditLink>`.
 */
const FormSummaryFooter = forwardRef<HTMLDivElement, FormSummaryFooterProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        {...rest}
        className={cl("aksel-form-summary__footer", className)}
      >
        {children}
      </div>
    );
  },
);

export { FormSummaryFooter };
export type { FormSummaryFooterProps };
