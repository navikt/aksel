import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { ErrorSummary, ErrorSummaryItem } from "..";
export default {
  title: "ds-react/form/errorsummary",
  component: ErrorSummary,
} as Meta;

export const All = () => {
  return (
    <>
      <h1>Error summary</h1>
      <ErrorSummary heading="Feiloppsummering komponent" headingTag="h4">
        <ErrorSummaryItem href="#1">Checkbox må fylles ut</ErrorSummaryItem>
        <ErrorSummaryItem href="#2">
          Tekstfeltet må ha en godkjent e-mail
        </ErrorSummaryItem>
      </ErrorSummary>
      <h2>size small</h2>
      <ErrorSummary size="small" heading="Feiloppsummering komponent">
        <ErrorSummaryItem href="#1">Checkbox må fylles ut</ErrorSummaryItem>
        <ErrorSummaryItem href="#2">
          Tekstfeltet må ha en godkjent e-mail
        </ErrorSummaryItem>
      </ErrorSummary>
    </>
  );
};
