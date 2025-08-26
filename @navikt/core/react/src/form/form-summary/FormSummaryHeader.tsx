import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { useWarnIfContainsComponent } from "../../util/usageWarnings";
import FormSummaryEditLink from "./FormSummaryEditLink";

export interface FormSummaryHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Must include `<FormSummary.Heading>`.
   */
  children: React.ReactNode;
}

export const FormSummaryHeader = forwardRef<
  HTMLDivElement,
  FormSummaryHeaderProps
>(({ children, className, ...rest }, ref) => {
  const { cn } = useRenameCSS();

  useWarnIfContainsComponent(
    children,
    FormSummaryEditLink,
    "<FormSummary.EditLink> should be placed inside <FormSummary.Footer> instead of <FormSummary.Header>.",
  );

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
