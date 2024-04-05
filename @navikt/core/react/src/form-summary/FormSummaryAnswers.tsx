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
>(({ children, ...rest }: FormSummaryAnswersProps, ref) => (
  <dl className="navds-form-summary__answers" ref={ref} {...rest}>
    {children}
  </dl>
));

export default FormSummaryAnswers;
