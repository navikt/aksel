import { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { renderStoriesForChromatic } from "../../util/renderStoriesForChromatic";
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

export const Chromatic = renderStoriesForChromatic(
  {
    Default,
    Small,
    ErrorPropagation,
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
