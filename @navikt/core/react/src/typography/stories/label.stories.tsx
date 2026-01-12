import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, within } from "storybook/test";
import { Box } from "../../layout/box";
import { VStack } from "../../layout/stack";
import { renderStoriesForChromatic } from "../../util/renderStoriesForChromatic";
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
      options: ["default", "subtle", "contrast"],
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
    <VStack gap="space-8">
      <Label textColor="default">{lorem}</Label>
      <Label textColor="subtle">{lorem}</Label>
      <Box background="neutral-strong">
        <Label textColor="contrast">{lorem}</Label>
      </Box>
      <Label data-color="brand-magenta">{lorem}</Label>
      <Label data-color="brand-magenta" textColor="default">
        {lorem}
      </Label>
      <Label data-color="brand-magenta" textColor="subtle">
        {lorem}
      </Label>
      <Box background="neutral-strong">
        <Label data-color="brand-magenta" textColor="contrast">
          {lorem}
        </Label>
      </Box>
    </VStack>
  ),
};

export const Chromatic = renderStoriesForChromatic({
  SizeMedium,
  SpacingMedium,
  SizeSmall,
  SpacingSmall,
  OverrideTag,
  ColorRole,
});
