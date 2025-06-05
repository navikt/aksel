import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { default as React } from "react";
import { VStack } from "../../layout/stack";
import Heading from "../Heading";

const meta: Meta<typeof Heading> = {
  title: "ds-react/Typography/Heading",
  component: Heading,
  decorators: [(story) => <div style={{ maxWidth: "300px" }}>{story()}</div>],
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

type Story = StoryObj<typeof Heading>;

const lorem = "Hva kan vi hjelpe deg med?";

export const Controls: Story = {
  args: {
    spacing: false,
    children: lorem,
    visuallyHidden: false,
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["xlarge", "large", "medium", "small", "xsmall"],
    },
    level: {
      control: "radio",
      options: ["1", "2", "3", "4", "5", "6"],
    },
    align: {
      control: "radio",
      options: ["start", "center", "end"],
    },
    textColor: {
      control: "radio",
      options: ["default", "subtle"],
    },
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

export const Align: Story = {
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

export const ColorRole: Story = {
  render: () => (
    <VStack gap="2">
      <Heading size="small" textColor="default">
        {lorem}
      </Heading>
      <Heading size="small" textColor="subtle">
        {lorem}
      </Heading>
      <Heading size="small" data-color="brand-magenta">
        {lorem}
      </Heading>
      <Heading size="small" data-color="brand-magenta" textColor="default">
        {lorem}
      </Heading>
      <Heading size="small" data-color="brand-magenta" textColor="subtle">
        {lorem}
      </Heading>
    </VStack>
  ),
};

export const Chromatic: Story = {
  render: (...props) => (
    <div>
      <div>
        <h2>Sizes</h2>
        {Sizes.render?.(...props)}
      </div>
      <div>
        <h2>Align</h2>
        {Align.render?.(...props)}
      </div>
      <div>
        <h2>Override Tag</h2>
        {OverrideTag.render?.(...props)}
      </div>
      <div>
        <h2>ColorRole</h2>
        {ColorRole.render?.(...props)}
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
