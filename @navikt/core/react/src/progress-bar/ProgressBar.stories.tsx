import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ProgressBar } from ".";
import { VStack } from "../layout/stack";

export default {
  title: "ds-react/ProgressBar",
  component: ProgressBar,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof ProgressBar>;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  render: () => {
    return (
      <div>
        <p id="progress-bar-label">Loading</p>
        <ProgressBar size="medium" value={0} labelId="progress-bar-label" />
      </div>
    );
  },
  args: {
    size: "medium",
    value: 66,
  },
  argTypes: {
    size: {
      options: ["large", "medium", "small"],
      control: { type: "radio" },
    },
  },
};

export const Small: Story = {
  render: () => {
    return (
      <div>
        <p id="progress-bar-label">Fremdrift i søknaden</p>
        <ProgressBar
          size="small"
          value={7}
          valueMin={2}
          valueMax={12}
          labelId="progress-bar-label"
        />
      </div>
    );
  },
  args: {
    ...Default.args,
    size: "small",
    value: 90,
  },
};

export const IndeterminateState: Story = {
  render: () => {
    return (
      <div>
        <p id="progress-bar-label">Indeterminate progress bar</p>
        <ProgressBar
          duration={5}
          size="medium"
          value={20}
          labelId="progress-bar-label"
        />
      </div>
    );
  },
  args: {
    ...Default.args,
    size: "medium",
    duration: 1,
    value: 7,
    valueMax: 10,
  },
};

export const Chromatic: Story = {
  render: () => {
    return (
      <VStack gap="4">
        <div>
          <h2>Default</h2>
          {/* @ts-expect-error Args are partial, leading to required prop mismatch */}
          <ProgressBar {...Default.args} />
        </div>
        <div>
          <h2>Small</h2>
          {/* @ts-expect-error Args are partial, leading to required prop mismatch */}
          <ProgressBar {...Small.args} />
        </div>
        <div>
          <h2>Indeterminate State Animation</h2>
          {/* @ts-expect-error Args are partial, leading to required prop mismatch */}
          <ProgressBar {...IndeterminateState.args} />
        </div>
      </VStack>
    );
  },
  parameters: {
    chromatic: { disable: false },
  },
};
