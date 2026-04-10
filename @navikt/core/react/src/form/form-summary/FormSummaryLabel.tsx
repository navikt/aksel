import React, { forwardRef } from "react";
import { Label } from "../../typography";

export interface FormSummaryLabelProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const FormSummaryLabel = forwardRef<HTMLElement, FormSummaryLabelProps>(
  ({ children, ...rest }, ref) => (
    <Label ref={ref} {...rest} as="dt">
      {children}
    </Label>
  ),
);

export default FormSummaryLabel;
