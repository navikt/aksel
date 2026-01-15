import React from "react";
import { useThemeInternal } from "../../theme/Theme";
import { cl } from "../../util/className";

export interface FormSummaryAnswerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Must include:
   * - `<FormSummary.Label>`
   * - `<FormSummary.Value>`
   */
  children: React.ReactNode;
}

export const FormSummaryAnswer = React.forwardRef<
  HTMLDivElement,
  FormSummaryAnswerProps
>(({ children, className, ...rest }, ref) => {
  const ctx = useThemeInternal();

  return (
    <div
      ref={ref}
      data-color={ctx.color}
      {...rest}
      className={cl("aksel-form-summary__answer", className)}
    >
      {children}
    </div>
  );
});

export default FormSummaryAnswer;
