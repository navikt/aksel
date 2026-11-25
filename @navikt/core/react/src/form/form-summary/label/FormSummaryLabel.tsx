import React, { forwardRef } from "react";
import { Label } from "../../../typography";

interface FormSummaryLabelProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const FormSummaryLabel = forwardRef<HTMLElement, FormSummaryLabelProps>(
  ({ children, ...rest }, ref) => (
    <Label ref={ref} {...rest} as="dt">
      {children}
    </Label>
  ),
);

export { FormSummaryLabel };
export type { FormSummaryLabelProps };
