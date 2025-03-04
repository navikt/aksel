import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { BodyLong } from "../../typography";

export interface FormSummaryValueProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const FormSummaryValue = forwardRef<
  HTMLDivElement,
  FormSummaryValueProps
>(({ children, className, ...rest }, ref) => {
  const { cn } = useRenameCSS();

  return (
    <BodyLong
      ref={ref}
      {...rest}
      as="dd"
      className={cn("navds-form-summary__value", className)}
    >
      {children}
    </BodyLong>
  );
});

export default FormSummaryValue;
