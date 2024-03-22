import React from "react";

export interface SummaryAnswerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function SummaryAnswer({ children }: SummaryAnswerProps) {
  return <>{children}</>;
}
