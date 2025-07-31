import React from "react";
import { useRenameCSS } from "../../theme/Theme";

export interface FormSummaryAnswerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Must include:
   * - `<FormSummary.Label>`
   * - `<FormSummary.Value>`
   */
  children: React.ReactNode;
}

export const FormSummaryAnswer = React.forwardRef<
  HTMLDivElement,
  FormSummaryAnswerProps
>(({ children, className, ...rest }, ref) => {
  const { cn } = useRenameCSS();

  return (
    <div
      ref={ref}
      {...rest}
      className={cn("navds-form-summary__answer", className)}
    >
      {children}
    </div>
  );
});

export default FormSummaryAnswer;
