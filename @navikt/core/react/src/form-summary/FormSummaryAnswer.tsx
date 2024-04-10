import cl from "clsx";
import React from "react";

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
>(({ children, className, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={cl("navds-form-summary__answer", className)}
  >
    {children}
  </div>
));

export default FormSummaryAnswer;
