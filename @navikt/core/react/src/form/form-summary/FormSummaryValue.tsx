import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyLong } from "../../typography";

export interface FormSummaryValueProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const FormSummaryValue = forwardRef<
  HTMLDivElement,
  FormSummaryValueProps
>(({ children, className, ...rest }, ref) => (
  <BodyLong
    ref={ref}
    {...rest}
    as="dd"
    className={cl("navds-form-summary__value", className)}
  >
    {children}
  </BodyLong>
));

export default FormSummaryValue;
