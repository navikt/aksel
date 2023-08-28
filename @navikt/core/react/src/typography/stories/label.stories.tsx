import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import React from "react";
import { Label } from "..";
import { VStack } from "../..";

const meta = {
  title: "ds-react/Typography/Label",
  component: Label,
  decorators: [(story) => <div style={{ maxWidth: "400px" }}>{story()}</div>],
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

const lorem =
  "Oppgi årsaken til at du har ventet mer enn 6 måneder med å søke om refusjon";

export const Default: Story = {
  args: {
    spacing: false,
    children: lorem,
    truncate: false,
    visuallyHidden: false,
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["large", "medium", "small"],
    },
    align: {
      control: "radio",
      options: ["start", "center", "end"],
    },
    color: {
      control: "radio",
      options: ["default", "subtle", "on-inverted"],
    },
  },
};

export const SizeMedium: Story = {
  render: () => (
    <VStack gap="2">
      <Label size="medium">{lorem}</Label>
      <Label size="medium" truncate>
        {lorem}
      </Label>
    </VStack>
  ),
};

export const SizeSmall: Story = {
  render: () => (
    <VStack gap="2">
      <Label size="small">{lorem}</Label>
      <Label size="small" truncate>
        {lorem}
      </Label>
    </VStack>
  ),
};

export const SpacingMedium: Story = {
  render: () => (
    <div>
      <Label size="medium" spacing as="p">
        {lorem}
      </Label>
      <Label size="medium" spacing as="p">
        {lorem}
      </Label>
    </div>
  ),
};

export const SpacingSmall: Story = {
  render: () => (
    <div>
      <Label size="small" spacing as="p">
        {lorem}
      </Label>
      <Label size="small" spacing as="p">
        {lorem}
      </Label>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <VStack gap="2">
      <Label color="default">{lorem}</Label>
      <Label color="subtle">{lorem}</Label>
      <div style={{ background: "var(--a-gray-900)" }}>
        <Label color="on-inverted">{lorem}</Label>
      </div>
    </VStack>
  ),
};

export const Align: Story = {
  render: () => (
    <VStack gap="2">
      <Label align="start">{lorem}</Label>
      <Label align="center">{lorem}</Label>
      <Label align="end">{lorem}</Label>
    </VStack>
  ),
};

export const OverrideTag: Story = {
  render: () => (
    <div>
      <Label spacing>default label</Label>
      <Label as="legend">legend label</Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const defaultLabel = canvas.getByText("default label");
    const legendLabel = canvas.getByText("legend label");

    expect(defaultLabel.tagName).toEqual("LABEL");
    expect(legendLabel.tagName).toEqual("LEGEND");
  },
};
