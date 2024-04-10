import React from "react";

export interface FormSummaryAnswerProps {
  /**
   * Must include:
   * - `<FormSummary.Label>`
   * - `<FormSummary.Value>`
   */
  children: React.ReactNode;
}

export const FormSummaryAnswer = ({ children }: FormSummaryAnswerProps) => (
  <div className="navds-form-summary__answer">{children}</div>
);

export default FormSummaryAnswer;
