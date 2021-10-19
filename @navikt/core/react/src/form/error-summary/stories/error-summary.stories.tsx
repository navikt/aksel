import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { ErrorSummary } from "..";
export default {
  title: "ds-react/form/errorsummary",
  component: ErrorSummary,
} as Meta;

export const All = () => {
  return (
    <>
      <h1>Error summary</h1>
      <ErrorSummary heading="Feiloppsummering komponent" headingTag="h4">
        <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
        <ErrorSummary.Item href="#2">
          Tekstfeltet må ha en godkjent e-mail
        </ErrorSummary.Item>
      </ErrorSummary>
      <h2>size small</h2>
      <ErrorSummary size="small" heading="Feiloppsummering komponent">
        <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
        <ErrorSummary.Item href="#2">
          Tekstfeltet må ha en godkjent e-mail
        </ErrorSummary.Item>
      </ErrorSummary>
    </>
  );
};
