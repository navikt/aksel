import React from "react";
import { Box } from "../layout/box";

export interface SummaryAnswerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SummaryAnswer = ({ children }: SummaryAnswerProps) => {
  return <Box className="summary__answer">{children}</Box>;
};
