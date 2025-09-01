import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";

/**
 * Footer slot for actions in `FormSummary`.
 */
export interface FormSummaryFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const FormSummaryFooter = forwardRef<
  HTMLDivElement,
  FormSummaryFooterProps
>(({ children, className, ...rest }, ref) => {
  const { cn } = useRenameCSS();

  return (
    <div
      ref={ref}
      data-color="info"
      {...rest}
      className={cn("navds-form-summary__footer", className)}
    >
      {children}
    </div>
  );
});

export default FormSummaryFooter;
