import React, { forwardRef } from "react";
import { CompositionWarning } from "../../../utils/components/composition-warning";
import { cl } from "../../../utils/helpers";

interface FormSummaryHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Must include `<FormSummary.Heading>`.
   */
  children: React.ReactNode;
}

const FormSummaryHeader = forwardRef<HTMLDivElement, FormSummaryHeaderProps>(
  ({ children, className, ...rest }: FormSummaryHeaderProps, ref) => {
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
  },
);

export { FormSummaryHeader };
export type { FormSummaryHeaderProps };
