import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { CompositionWarning } from "../../util/composition-warning";

/**
 * Header slot for section heading and actions in `FormSummary`.
 */
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
>(({ children, className, ...rest }: FormSummaryHeaderProps, ref) => {
  const { cn } = useRenameCSS();

  return (
    <CompositionWarning.Root name="FormSummary.Header">
      <div
        ref={ref}
        {...rest}
        className={cn("navds-form-summary__header", className)}
      >
        {children}
      </div>
    </CompositionWarning.Root>
  );
});

export default FormSummaryHeader;
