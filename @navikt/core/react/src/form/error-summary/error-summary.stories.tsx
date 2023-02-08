import React from "react";
import { Meta } from "@storybook/react";
import { ErrorSummary } from "..";
export default {
  title: "ds-react/Form/Errorsummary",
  component: ErrorSummary,
  argTypes: {
    headingTag: {
      control: {
        type: "text",
      },
    },
    size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    },
  },
} as Meta;

export const Default = (props) => (
  <ErrorSummary
    heading="Feiloppsummering komponent"
    headingTag={props.headingTag || "h2"}
    size={props.size ?? undefined}
  >
    <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
    <ErrorSummary.Item href="#2">
      Tekstfeltet må ha en godkjent e-mail
    </ErrorSummary.Item>
  </ErrorSummary>
);

export const Small = () => (
  <ErrorSummary heading="Feiloppsummering komponent" size="small">
    <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
    <ErrorSummary.Item href="#2">
      Tekstfeltet må ha en godkjent e-mail
    </ErrorSummary.Item>
  </ErrorSummary>
);
