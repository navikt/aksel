import React from "react";
import { injectHRBetween } from "./utils";

export interface FormSummaryAnswersProps
  extends React.HTMLAttributes<HTMLDListElement> {
  children: React.ReactNode;
}

export default function FormSummaryAnswers({
  children,
  ...rest
}: FormSummaryAnswersProps) {
  return (
    <dl className="form-summary__answers" {...rest}>
      {injectHRBetween(children)}
    </dl>
  );
}
