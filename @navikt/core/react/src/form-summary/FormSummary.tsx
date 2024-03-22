import React, { HTMLAttributes, forwardRef } from "react";
import { Box } from "../layout/box";
import FormSummaryAnswer from "./FormSummaryAnswer";
import FormSummaryAnswers from "./FormSummaryAnswers";
import FormSummaryEditButton from "./FormSummaryEditButton";
import FormSummaryHeader from "./FormSummaryHeader";
import FormSummaryHeading from "./FormSummaryHeading";
import FormSummaryLabel from "./FormSummaryLabel";
import FormSummaryValue from "./FormSummaryValue";

interface FormSummaryComponent
  extends React.ForwardRefExoticComponent<
    FormSummaryProps & React.RefAttributes<HTMLDivElement>
  > {
  children: React.ReactNode;
  Header: typeof FormSummaryHeader;
  Heading: typeof FormSummaryHeading;
  EditButton: typeof FormSummaryEditButton;
  Answers: typeof FormSummaryAnswers;
  Answer: typeof FormSummaryAnswer;
  Label: typeof FormSummaryLabel;
  Value: typeof FormSummaryValue;
}

export interface FormSummaryProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const FormSummary = forwardRef<HTMLDivElement, FormSummaryProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        {...rest}
        as="section"
        borderRadius="large"
        borderColor="border-subtle"
        borderWidth="1"
      >
        {children}
      </Box>
    );
  },
) as FormSummaryComponent;

FormSummary.Header = FormSummaryHeader;
FormSummary.Heading = FormSummaryHeading;
FormSummary.EditButton = FormSummaryEditButton;
FormSummary.Answers = FormSummaryAnswers;
FormSummary.Answer = FormSummaryAnswer;
FormSummary.Label = FormSummaryLabel;
FormSummary.Value = FormSummaryValue;

export default FormSummary;
