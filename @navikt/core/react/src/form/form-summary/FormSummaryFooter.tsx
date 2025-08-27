import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { SlotWarningProvider } from "../../util/slotWarningProvider";

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
    <SlotWarningProvider name="FormSummary.Footer">
      <div
        ref={ref}
        {...rest}
        className={cn("navds-form-summary__footer", className)}
      >
        {children}
      </div>
    </SlotWarningProvider>
  );
});

export default FormSummaryFooter;
