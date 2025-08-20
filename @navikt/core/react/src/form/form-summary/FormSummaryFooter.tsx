import React, { forwardRef } from "react";

export interface FormSummaryFooterProps
  extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const FormSummaryFooter = forwardRef<
  HTMLElement,
  FormSummaryFooterProps
>(({ children, className, ...rest }, ref) => (
  <footer
    ref={ref}
    {...rest}
    className={`navds-form-summary__footer${className ? ` ${className}` : ""}`}
  >
    {children}
  </footer>
));

export default FormSummaryFooter;
