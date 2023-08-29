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
    visuallyHidden: false,
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["large", "medium", "small"],
    },
    textColor: {
      control: "radio",
      options: ["default", "subtle"],
    },
  },
};

export const SizeMedium: Story = {
  render: () => <Label size="medium">{lorem}</Label>,
};

export const SizeSmall: Story = {
  render: () => <Label size="small">{lorem}</Label>,
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
      <Label textColor="default">{lorem}</Label>
      <Label textColor="subtle">{lorem}</Label>
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
