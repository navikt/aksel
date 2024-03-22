import React from "react";
import { Label } from "../typography";

export interface FormSummaryLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function FormSummaryLabel({ children }: FormSummaryLabelProps) {
  return <Label as="dt">{children}</Label>;
}
