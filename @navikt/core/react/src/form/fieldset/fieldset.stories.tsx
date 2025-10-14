import { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { VStack } from "../../layout/stack";
import TextField from "../textfield/TextField";
import { Fieldset } from "./index";

export default {
  title: "ds-react/Fieldset",
  component: Fieldset,
  argTypes: {
    size: {
      control: {
        type: "radio",
      },
      options: ["medium", "small"],
    },
    description: {
      type: "string",
    },
    error: {
      type: "string",
    },
    hideLegend: {
      type: "boolean",
    },
    disabled: {
      type: "boolean",
    },
  },
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof Fieldset>;

type Story = StoryObj<typeof Fieldset>;

const content = (
  <>
    <TextField label="Textfield label" hideLabel />
    <TextField label="Textfield label" hideLabel />
  </>
);

const contentWithError = (
  <>
    <TextField label="Textfield label" hideLabel error="Må være fylt ut" />
    <TextField label="Textfield label" hideLabel />
  </>
);

export const Default: Story = {
  args: {
    legend: "Mollit eiusmod",
    description:
      "Do ullamco amet mollit labore tempor minim cupidatat dolore voluptate velit irure.",
    errorPropagation: true,
    children: content,
  },
};

export const Small: Story = {
  args: {
    legend: "Mollit eiusmod",
    description:
      "Do ullamco amet mollit labore tempor minim cupidatat dolore voluptate velit irure.",
    errorPropagation: true,
    children: content,
    size: "small",
  },
};

export const ErrorPropagation: Story = {
  args: {
    legend: "Mollit eiusmod",
    description:
      "Do ullamco amet mollit labore tempor minim cupidatat dolore voluptate velit irure.",
    errorPropagation: false,
    children: contentWithError,
  },
};

export const WithError: Story = {
  args: {
    legend: "Mollit eiusmod",
    description:
      "Do ullamco amet mollit labore tempor minim cupidatat dolore voluptate velit irure.",
    children: content,
    error: "Laborum officia nisi aliqua esse minim in amet.",
  },
};

export const Disabled: Story = {
  args: {
    legend: "Mollit eiusmod",
    description:
      "Do ullamco amet mollit labore tempor minim cupidatat dolore voluptate velit irure.",
    children: content,
    disabled: true,
  },
};

export const HideLegend: Story = {
  args: {
    legend: "Mollit eiusmod",
    description:
      "Do ullamco amet mollit labore tempor minim cupidatat dolore voluptate velit irure.",
    children: content,
    hideLegend: true,
  },
};

export const Chromatic: Story = {
  render: () => {
    return (
      <VStack gap="4">
        <div>
          <h2>Default</h2>
          {/* @ts-expect-error Args are Partial here */}
          <Fieldset {...Default.args} />
        </div>
        <div>
          <h2>Small</h2>
          {/* @ts-expect-error Args are Partial here */}
          <Fieldset {...Small.args} />
        </div>
        <div>
          <h2>ErrorPropagation</h2>
          {/* @ts-expect-error Args are Partial here */}
          <Fieldset {...ErrorPropagation.args} />
        </div>
        <div>
          <h2>WithError</h2>
          {/* @ts-expect-error Args are Partial here */}
          <Fieldset {...WithError.args} />
        </div>
        <div>
          <h2>WithError small</h2>
          {/* @ts-expect-error Args are Partial here */}
          <Fieldset {...WithError.args} size="small" />
        </div>
        <div>
          <h2>Disabled</h2>
          {/* @ts-expect-error Args are Partial here */}
          <Fieldset {...Disabled.args} />
        </div>
        <div>
          <h2>HideLegend</h2>
          {/* @ts-expect-error Args are Partial here */}
          <Fieldset {...HideLegend.args} />
        </div>
      </VStack>
    );
  },
  parameters: {
    chromatic: { disable: false },
  },
};
