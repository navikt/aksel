import React, { forwardRef } from "react";
import { cl } from "../../util/className";
import { CompositionWarning } from "../../util/composition-warning";

export interface FormSummaryHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Must include `<FormSummary.Heading>`.
   */
  children: React.ReactNode;
}

export const FormSummaryHeader = forwardRef<
  HTMLDivElement,
  FormSummaryHeaderProps
>(({ children, className, ...rest }: FormSummaryHeaderProps, ref) => {
  return (
    <CompositionWarning.Root name="FormSummary.Header">
      <div
        ref={ref}
        {...rest}
        className={cl("aksel-form-summary__header", className)}
      >
        {children}
      </div>
    </CompositionWarning.Root>
  );
});

export default FormSummaryHeader;
