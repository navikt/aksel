import React, { forwardRef } from "react";
import { Label } from "../typography";

export interface FormSummaryLabelProps {
  children: React.ReactNode;
}

export const FormSummaryLabel = forwardRef<
  HTMLDivElement,
  FormSummaryLabelProps
>(({ children }, ref) => (
  <Label as="dt" ref={ref}>
    {children}
  </Label>
));

export default FormSummaryLabel;
