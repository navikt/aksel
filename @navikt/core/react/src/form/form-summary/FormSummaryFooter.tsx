import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";

export interface FormSummaryFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Footer slot in `FormSummary`, typically used for actions like
 * `<FormSummary.EditLink>`.
 */
export const FormSummaryFooter = forwardRef<
  HTMLDivElement,
  FormSummaryFooterProps
>(({ children, className, ...rest }, ref) => {
  const { cn } = useRenameCSS();
  return (
    <div
      ref={ref}
      {...rest}
      className={cn("navds-form-summary__footer", className)}
    >
      {children}
    </div>
  );
});

export default FormSummaryFooter;
