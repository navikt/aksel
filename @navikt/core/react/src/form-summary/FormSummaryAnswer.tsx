import React from "react";

export interface FormSummaryAnswerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function FormSummaryAnswer({
  children,
}: FormSummaryAnswerProps) {
  return <>{children}</>;
}
