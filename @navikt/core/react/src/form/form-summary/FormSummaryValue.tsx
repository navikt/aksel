import React, { forwardRef } from "react";
import { BodyLong } from "../../typography";
import { cl } from "../../utils/helpers";

export interface FormSummaryValueProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const FormSummaryValue = forwardRef<
  HTMLDivElement,
  FormSummaryValueProps
>(({ children, className, ...rest }, ref) => {
  return (
    <BodyLong
      ref={ref}
      {...rest}
      as="dd"
      className={cl("aksel-form-summary__value", className)}
    >
      {children}
    </BodyLong>
  );
});

export default FormSummaryValue;
