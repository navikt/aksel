import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { VStack } from "../../layout/stack";
import { ErrorSummary } from "./ErrorSummary";

export default {
  title: "ds-react/Errorsummary",
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
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof ErrorSummary>;

type Story = StoryObj<typeof ErrorSummary>;

export const Default: Story = {
  render: (props) => (
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
  ),
};

export const Small: Story = {
  render: () => (
    <ErrorSummary heading="Feiloppsummering komponent" size="small">
      <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
      <ErrorSummary.Item href="#2">
        Tekstfeltet må ha en godkjent e-mail
      </ErrorSummary.Item>
    </ErrorSummary>
  ),
};

export const Chromatic: Story = {
  render: () => (
    <VStack gap="4">
      <div>
        <h2>Default</h2>
        <ErrorSummary heading="Feiloppsummering komponent">
          <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
          <ErrorSummary.Item href="#2">
            Tekstfeltet må ha en godkjent e-mail
          </ErrorSummary.Item>
        </ErrorSummary>
      </div>
      <div>
        <h2>Small</h2>
        <ErrorSummary heading="Feiloppsummering komponent" size="small">
          <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
          <ErrorSummary.Item href="#2">
            Tekstfeltet må ha en godkjent e-mail
          </ErrorSummary.Item>
        </ErrorSummary>
      </div>
    </VStack>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
