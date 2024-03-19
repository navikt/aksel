import React from "react";
import { Label } from "../typography";

export interface SummaryLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SummaryLabel = ({ children }: SummaryLabelProps) => {
  return <Label as="dt">{children}</Label>;
};
