import React from "react";
import { useRenameCSS, useThemeInternal } from "../../theme/Theme";

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
  const ctx = useThemeInternal();

  return (
    <div
      ref={ref}
      data-color={ctx.color}
      {...rest}
      className={cn("navds-form-summary__answer", className)}
    >
      {children}
    </div>
  );
});

export default FormSummaryAnswer;
