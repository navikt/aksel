import type { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { default as React } from "react";
import { Heading } from "..";
import { VStack } from "../..";

const meta = {
  title: "ds-react/Typography/Heading",
  component: Heading,
  decorators: [(story) => <div style={{ maxWidth: "300px" }}>{story()}</div>],
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

const lorem = "Hva kan vi hjelpe deg med?";

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

export const Colors: Story = {
  render: () => (
    <VStack gap="2">
      <Heading level="1" size="large" color="default">
        {lorem}
      </Heading>
      <Heading level="2" size="large" color="subtle">
        {lorem}
      </Heading>
      <div style={{ background: "var(--a-gray-900)" }}>
        <Heading level="3" size="large" color="on-inverted">
          {lorem}
        </Heading>
      </div>
    </VStack>
  ),
};

export const Algin: Story = {
  render: () => (
    <VStack gap="2">
      <Heading level="1" size="large" align="start">
        {lorem}
      </Heading>
      <Heading level="2" size="large" align="center">
        {lorem}
      </Heading>
      <Heading level="3" size="large" align="end">
        {lorem}
      </Heading>
    </VStack>
  ),
};

export const OverrideTag: Story = {
  render: () => (
    <div>
      <Heading spacing level="1" size="large">
        default heading
      </Heading>
      <Heading as="legend" size="large">
        legend heading
      </Heading>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const defaultHeading = canvas.getByText("default heading");
    const legendHeading = canvas.getByText("legend heading");

    expect(defaultHeading.tagName).toEqual("H1");
    expect(legendHeading.tagName).toEqual("LEGEND");
  },
};
