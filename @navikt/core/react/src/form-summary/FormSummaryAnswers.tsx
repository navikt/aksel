import cl from "clsx";
import React, { forwardRef } from "react";

export interface FormSummaryAnswersProps
  extends React.HTMLAttributes<HTMLDListElement> {
  /**
   * Must include one or more of `<FormSummary.Answer>`.
   */
  children: React.ReactNode;
}

export const FormSummaryAnswers = forwardRef<
  HTMLDListElement,
  FormSummaryAnswersProps
>(({ children, className, ...rest }: FormSummaryAnswersProps, ref) => (
  <dl
    ref={ref}
    {...rest}
    className={cl("navds-form-summary__answers", className)}
  >
    {children}
  </dl>
));

export default FormSummaryAnswers;
