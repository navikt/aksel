import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

/**
 * Footer slot for actions in `FormSummary`.
 */
export interface FormSummaryFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Should include `<FormSummary.EditLink>`.
   */
  children: React.ReactNode;
}

export const FormSummaryFooter = forwardRef<
  HTMLDivElement,
  FormSummaryFooterProps
>(({ children, className, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      {...rest}
      className={cl("aksel-form-summary__footer", className)}
    >
      {children}
    </div>
  );
});

export default FormSummaryFooter;
