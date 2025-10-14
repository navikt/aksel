import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, within } from "storybook/test";
import { VStack } from "../../layout/stack";
import Label from "../Label";

const meta: Meta<typeof Label> = {
  title: "ds-react/Typography/Label",
  component: Label,
  decorators: [(story) => <div style={{ maxWidth: "400px" }}>{story()}</div>],
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

type Story = StoryObj<typeof Label>;

const lorem =
  "Oppgi årsaken til at du har ventet mer enn 6 måneder med å søke om refusjon";

export const Controls: Story = {
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

export const ColorRole: Story = {
  render: () => (
    <VStack gap="2">
      <Label textColor="default">{lorem}</Label>
      <Label textColor="subtle">{lorem}</Label>
      <Label data-color="brand-magenta">{lorem}</Label>
      <Label data-color="brand-magenta" textColor="default">
        {lorem}
      </Label>
      <Label data-color="brand-magenta" textColor="subtle">
        {lorem}
      </Label>
    </VStack>
  ),
};

export const Chromatic: Story = {
  render: (...props) => (
    <div>
      <div>
        <h2>Medium</h2>
        <h3>Size</h3>
        {SizeMedium.render?.(...props)}
        <h3>Spacing</h3>
        {SpacingMedium.render?.(...props)}
      </div>
      <div>
        <h2>Small</h2>
        <h3>Size</h3>
        {SizeSmall.render?.(...props)}
        <h3>Spacing</h3>
        {SpacingSmall.render?.(...props)}
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
