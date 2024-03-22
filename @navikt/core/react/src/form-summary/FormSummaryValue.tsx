import React from "react";

export interface FormSummaryValueProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function FormSummaryValue({ children }: FormSummaryValueProps) {
  return <dd className="form-summary__value">{children}</dd>;
}
