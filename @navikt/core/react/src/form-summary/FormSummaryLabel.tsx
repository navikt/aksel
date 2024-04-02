import React, { forwardRef } from "react";
import { Label } from "../typography";

export interface FormSummaryLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const FormSummaryLabel = forwardRef<
  HTMLDivElement,
  FormSummaryLabelProps
>(({ children, ...rest }, ref) => (
  <Label as="dt" ref={ref} {...rest}>
    {children}
  </Label>
));

export default FormSummaryLabel;
