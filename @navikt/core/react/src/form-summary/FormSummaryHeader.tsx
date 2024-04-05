import React, { forwardRef } from "react";
import { HStack } from "../layout/stack";

export interface FormSummaryHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Must include `<FormSummary.Heading>` and optionally `<FormSummary.Edit>`.
   */
  children: React.ReactNode;
}

export const FormSummaryHeader = forwardRef<
  HTMLDivElement,
  FormSummaryHeaderProps
>(({ children, ...rest }, ref) => (
  <header ref={ref} {...rest} className="navds-form-summary__header">
    <HStack justify="space-between" gap="2" wrap={false}>
      {children}
    </HStack>
  </header>
));

export default FormSummaryHeader;
