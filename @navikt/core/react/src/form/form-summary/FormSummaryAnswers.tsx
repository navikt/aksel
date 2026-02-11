import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

const FormSummaryAnswersContext = React.createContext(false);

export interface FormSummaryAnswersProps extends React.HTMLAttributes<HTMLDListElement> {
  /**
   * Must include one or more of `<FormSummary.Answer>`.
   */
  children: React.ReactNode;
}

export const FormSummaryAnswers = forwardRef<
  HTMLDListElement,
  FormSummaryAnswersProps
>(({ children, className, ...rest }: FormSummaryAnswersProps, ref) => {
  const isNested = React.useContext(FormSummaryAnswersContext);

  return (
    <FormSummaryAnswersContext.Provider value>
      <dl
        ref={ref}
        data-color={isNested ? "info" : undefined}
        {...rest}
        className={cl("aksel-form-summary__answers", className)}
      >
        {children}
      </dl>
    </FormSummaryAnswersContext.Provider>
  );
});

export default FormSummaryAnswers;
