import type { Meta, StoryObj } from "@storybook/react";

import React from "react";
import { Heading } from "..";
import { VStack } from "../..";

const meta = {
  title: "ds-react/Typography/Heading",
  component: Heading,
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

const lorem = "Veniam consequat cillum";

export const Default: Story = {
  args: {
    spacing: false,
    children: lorem,
  },
};

export const Sizes: Story = {
  render: () => (
    <VStack gap="4">
      <Heading level="1" size="xlarge">
        {lorem}
      </Heading>
      <Heading level="2" size="large">
        {lorem}
      </Heading>
      <Heading level="3" size="medium">
        {lorem}
      </Heading>
      <Heading level="4" size="small">
        {lorem}
      </Heading>
      <Heading level="5" size="xsmall">
        {lorem}
      </Heading>
    </VStack>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div>
      <Heading level="1" size="xlarge" spacing>
        {lorem}
      </Heading>
      <Heading level="2" size="large" spacing>
        {lorem}
      </Heading>
      <Heading level="3" size="medium" spacing>
        {lorem}
      </Heading>
      <Heading level="4" size="small" spacing>
        {lorem}
      </Heading>
      <Heading level="5" size="xsmall" spacing>
        {lorem}
      </Heading>
      <Heading level="5" size="xsmall">
        {lorem}
      </Heading>
    </div>
  ),
};
