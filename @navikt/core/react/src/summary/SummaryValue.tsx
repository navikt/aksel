import React from "react";

export interface SummaryValueProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function SummaryValue({ children }: SummaryValueProps) {
  return <dd className="form-summary__value">{children}</dd>;
}
