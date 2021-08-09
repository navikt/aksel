import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { ErrorSummary, ErrorSummaryError } from "..";
export default {
  title: "ds-react/form/errorsummary",
  component: ErrorSummary,
} as Meta;

export const All = () => {
  return (
    <>
      <h1>Error summary</h1>
      <ErrorSummary title="Feiloppsummering komponent">
        <ErrorSummaryError formFieldId="1">
          Checkbox må fylles ut
        </ErrorSummaryError>
        <ErrorSummaryError formFieldId="2">
          Tekstfeltet må ha en godkjent e-mail
        </ErrorSummaryError>
      </ErrorSummary>
      <h2>size s</h2>
      <ErrorSummary size="s" title="Feiloppsummering komponent">
        <ErrorSummaryError formFieldId="1">
          Checkbox må fylles ut
        </ErrorSummaryError>
        <ErrorSummaryError formFieldId="2">
          Tekstfeltet må ha en godkjent e-mail
        </ErrorSummaryError>
      </ErrorSummary>
    </>
  );
};
