import React from "react";
import { injectHRBetween } from "./utils";

export interface SummaryAnswersProps
  extends React.HTMLAttributes<HTMLDListElement> {
  children: React.ReactNode;
}

export default function SummaryAnswers({
  children,
  ...rest
}: SummaryAnswersProps) {
  return (
    <dl className="form-summary__answers" {...rest}>
      {injectHRBetween(children)}
    </dl>
  );
}
