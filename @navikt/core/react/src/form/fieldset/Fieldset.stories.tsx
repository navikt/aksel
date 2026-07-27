import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { renderStoriesForChromatic } from "../../utils/renderStoriesForChromatic";
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

export const WithError: Story = {
  args: {
    legend: "Mollit eiusmod",
    description:
      "Do ullamco amet mollit labore tempor minim cupidatat dolore voluptate velit irure.",
    children: content,
    error: "Laborum officia nisi aliqua esse minim in amet.",
  },
};

export const WithErrorNoPropagation: Story = {
  args: {
    legend: "Mollit eiusmod",
    description:
      "Do ullamco amet mollit labore tempor minim cupidatat dolore voluptate velit irure.",
    errorPropagation: false,
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

export const Chromatic = renderStoriesForChromatic(
  {
    Default,
    Small,
    WithErrorNoPropagation,
    WithError,
    WithErrorSmall: {
      ...WithError,
      args: {
        ...WithError.args,
        size: "small",
      },
    },
    Disabled,
    HideLegend,
  },
  Fieldset,
);
