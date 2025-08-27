import React from "react";
import { SlotWarningProvider } from "../../util/slotWarningProvider";

/**
 * Header slot for section heading and actions in `FormSummary`.
 */
export interface FormSummaryHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const FormSummaryHeader = ({
  children,
  ...rest
}: FormSummaryHeaderProps) => (
  <SlotWarningProvider name="FormSummary.Header">
    <div {...rest}>{children}</div>
  </SlotWarningProvider>
);

export default FormSummaryHeader;
