import React, { HTMLAttributes, forwardRef } from "react";
import { Box } from "../layout/box";
import SummaryAnswer from "./SummaryAnswer";
import SummaryAnswers from "./SummaryAnswers";
import FormSummaryEditButton from "./SummaryEditButton";
import FormSummaryHeader from "./SummaryHeader";
import FormSummaryHeading from "./SummaryHeading";
import SummaryLabel from "./SummaryLabel";
import SummaryValue from "./SummaryValue";

interface SummaryComponent
  extends React.ForwardRefExoticComponent<
    SummaryProps & React.RefAttributes<HTMLDivElement>
  > {
  children: React.ReactNode;
  Header: typeof FormSummaryHeader;
  Heading: typeof FormSummaryHeading;
  EditButton: typeof FormSummaryEditButton;
  Answers: typeof SummaryAnswers;
  Answer: typeof SummaryAnswer;
  Label: typeof SummaryLabel;
  Value: typeof SummaryValue;
}

export interface SummaryProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Summary = forwardRef<HTMLDivElement, SummaryProps>(
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
) as SummaryComponent;

Summary.Header = FormSummaryHeader;
Summary.Heading = FormSummaryHeading;
Summary.EditButton = FormSummaryEditButton;
Summary.Answers = SummaryAnswers;
Summary.Answer = SummaryAnswer;
Summary.Label = SummaryLabel;
Summary.Value = SummaryValue;

export default Summary;
