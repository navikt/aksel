import React, { forwardRef } from "react";
import { injectHRBetween } from "./utils";

export interface FormSummaryAnswersProps
  extends React.HTMLAttributes<HTMLDListElement> {
  children: React.ReactNode;
}

export const FormSummaryAnswers = forwardRef<
  HTMLDListElement,
  FormSummaryAnswersProps
>(({ children, ...rest }: FormSummaryAnswersProps, ref) => {
  return (
    <dl className="form-summary__answers" ref={ref} {...rest}>
      {injectHRBetween(children)}
    </dl>
  );
});

export default FormSummaryAnswers;
