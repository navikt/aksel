import React, { forwardRef } from "react";
import { BodyLong } from "../../../typography";
import { cl } from "../../../utils/helpers";

interface FormSummaryValueProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FormSummaryValue = forwardRef<HTMLDivElement, FormSummaryValueProps>(
  ({ children, className, ...rest }, ref) => {
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
  },
);

export { FormSummaryValue };
export type { FormSummaryValueProps };
