import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";

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
>(({ children, className, ...rest }, ref) => {
  const { cn } = useRenameCSS();

  return (
    <header
      ref={ref}
      {...rest}
      className={cn("navds-form-summary__header", className)}
    >
      {children}
    </header>
  );
});

export default FormSummaryHeader;
