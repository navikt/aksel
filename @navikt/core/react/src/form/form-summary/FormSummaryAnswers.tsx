import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";

export interface FormSummaryAnswersProps
  extends React.HTMLAttributes<HTMLDListElement> {
  /**
   * Must include one or more of `<FormSummary.Answer>`.
   */
  children: React.ReactNode;
}

export const FormSummaryAnswers = forwardRef<
  HTMLDListElement,
  FormSummaryAnswersProps
>(
  (
    {
      children,
      className,
      "data-color-role": colorRole = "info",
      ...rest
    }: FormSummaryAnswersProps,
    ref,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <dl
        ref={ref}
        data-color-role={colorRole}
        {...rest}
        className={cn("navds-form-summary__answers", className)}
      >
        {children}
      </dl>
    );
  },
);

export default FormSummaryAnswers;
