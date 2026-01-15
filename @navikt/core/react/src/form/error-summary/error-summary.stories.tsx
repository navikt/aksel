import { Meta, StoryObj } from "@storybook/react-vite";
import React, { useRef } from "react";
import { expect, userEvent, within } from "storybook/test";
import { VStack } from "../../layout/stack";
import { ErrorSummary } from "./ErrorSummary";

export default {
  title: "ds-react/ErrorSummary",
  component: ErrorSummary,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof ErrorSummary>;

type Story = StoryObj<typeof ErrorSummary>;

export const Default: Story = {
  render: ({ headingTag, ...rest }) => (
    <ErrorSummary headingTag={headingTag || undefined} {...rest}>
      <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
      <ErrorSummary.Item href="#2">
        Tekstfeltet må ha en godkjent e-post
      </ErrorSummary.Item>
    </ErrorSummary>
  ),
  argTypes: {
    heading: {
      control: {
        type: "text",
      },
    },
    headingTag: {
      control: {
        type: "text",
      },
    },
    size: {
      control: {
        type: "radio",
      },
      options: ["medium", "small"],
    },
  },
};

export const Small: Story = {
  render: () => (
    <ErrorSummary heading="Feiloppsummering komponent" size="small">
      <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
      <ErrorSummary.Item href="#2">
        Tekstfeltet må ha en godkjent e-post
      </ErrorSummary.Item>
    </ErrorSummary>
  ),
};

export const A11yDemo: Story = {
  name: "A11y Demo",
  render: () => {
    const ref = useRef<HTMLHeadingElement>(null);
    return (
      <div>
        <button
          onClick={() => {
            ref.current?.focus();
          }}
        >
          Fokuser ErrorSummary
        </button>
        <ErrorSummary heading="Feiloppsummering tittel" ref={ref}>
          <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
          <ErrorSummary.Item href="#2">
            Tekstfeltet må ha en godkjent e-post
          </ErrorSummary.Item>
        </ErrorSummary>
      </div>
    );
  },
};

export const FocusDemo: Story = {
  render: () => {
    const ref = useRef<HTMLHeadingElement>(null);
    return (
      <div>
        <button onClick={() => ref.current?.focus()}>Focus summary</button>
        <ErrorSummary heading="Feiloppsummering tittel" ref={ref}>
          <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
          <ErrorSummary.Item href="#2">
            Tekstfeltet må ha en godkjent e-post
          </ErrorSummary.Item>
        </ErrorSummary>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByText("Focus summary");
    const heading = canvas.getByText("Feiloppsummering tittel");

    await step("click button", async () => {
      await userEvent.click(button);
    });

    expect(heading).toHaveFocus();
  },
};

export const Chromatic: Story = {
  render: () => (
    <VStack gap="space-16">
      <div>
        <h2>Default</h2>
        <ErrorSummary heading="Feiloppsummering komponent">
          <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
          <ErrorSummary.Item href="#2">
            Tekstfeltet må ha en godkjent e-post
          </ErrorSummary.Item>
        </ErrorSummary>
      </div>
      <div>
        <h2>Small</h2>
        <ErrorSummary heading="Feiloppsummering komponent" size="small">
          <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
          <ErrorSummary.Item href="#2">
            Tekstfeltet må ha en godkjent e-post
          </ErrorSummary.Item>
        </ErrorSummary>
      </div>
    </VStack>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
