import React, { HTMLAttributes, forwardRef } from "react";
import { Box } from "../layout/box";
import { SummaryAnswer } from "./SummaryAnswer";
import { FormSummaryEditButton } from "./SummaryEditButton";
import FormSummaryHeader from "./SummaryHeader";
import FormSummaryHeading from "./SummaryHeading";
import { SummaryLabel } from "./SummaryLabel";
import { SummaryValue } from "./SummaryValue";
import { injectHRBetween } from "./utils";

interface SummaryComponent
  extends React.ForwardRefExoticComponent<
    SummaryProps & React.RefAttributes<HTMLDivElement>
  > {
  children: React.ReactNode;
  Header: typeof FormSummaryHeader;
  Heading: typeof FormSummaryHeading;
  EditButton: typeof FormSummaryEditButton;
  Label: typeof SummaryLabel;
  Value: typeof SummaryValue;
  Answer: typeof SummaryAnswer;
}

export interface SummaryProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Summary = forwardRef<HTMLDivElement, SummaryProps>(
  ({ children, ...rest }, ref) => {
    const childrenArray = React.Children.toArray(children);
    // TODO: Should we check the length of childrenArray?
    const [header, ...restChildren] = childrenArray;

    return (
      <div ref={ref} {...rest}>
        <style>
          {`
dl, dd {
  margin: 0;
  padding: 0;
}
`}
        </style>
        <Box
          as="section"
          borderRadius="large"
          borderColor="border-subtle"
          borderWidth="1"
        >
          {header}
          <Box as="dl" paddingInline="6" paddingBlock="5 6">
            {injectHRBetween(restChildren)}
          </Box>
        </Box>
      </div>
    );
  },
) as SummaryComponent;

Summary.Header = FormSummaryHeader;
Summary.Heading = FormSummaryHeading;
Summary.EditButton = FormSummaryEditButton;
Summary.Label = SummaryLabel;
Summary.Value = SummaryValue;
Summary.Answer = SummaryAnswer;

export default Summary;
