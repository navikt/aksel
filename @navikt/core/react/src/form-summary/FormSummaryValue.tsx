import React from "react";
import { BodyLong } from "../typography";

export interface FormSummaryValueProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function FormSummaryValue({ children }: FormSummaryValueProps) {
  return (
    <BodyLong as="dd" className="form-summary__value">
      {children}
    </BodyLong>
  );
}
