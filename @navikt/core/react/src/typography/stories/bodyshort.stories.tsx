import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, within } from "storybook/test";
import { Box } from "../../primitives/box";
import { VStack } from "../../primitives/stack";
import { renderStoriesForChromatic } from "../../utils/renderStoriesForChromatic";
import { BodyShort } from "../BodyShort";

const meta: Meta<typeof BodyShort> = {
  title: "ds-react/Typography/BodyShort",
  component: BodyShort,
  decorators: [(story) => <div style={{ maxWidth: "250px" }}>{story()}</div>],
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

type Story = StoryObj<typeof BodyShort>;

const lorem = "Du må gjøre en filtrering for å se brukere i listen.";

export const Controls: Story = {
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
    weight: {
      control: "radio",
      options: ["regular", "semibold"],
    },
    align: {
      control: "radio",
      options: ["start", "center", "end"],
    },
    textColor: {
      control: "radio",
      options: ["default", "subtle", "contrast"],
    },
  },
};

export const SizeLarge: Story = {
  render: () => (
    <VStack gap="space-8">
      <BodyShort size="large">{lorem}</BodyShort>
      <BodyShort size="large" weight="semibold">
        {lorem}
      </BodyShort>
      <BodyShort size="large" truncate>
        {lorem}
      </BodyShort>
    </VStack>
  ),
};

export const SizeMedium: Story = {
  render: () => (
    <VStack gap="space-8">
      <BodyShort size="medium">{lorem}</BodyShort>
      <BodyShort size="medium" weight="semibold">
        {lorem}
      </BodyShort>
      <BodyShort size="medium" truncate>
        {lorem}
      </BodyShort>
    </VStack>
  ),
};

export const SizeSmall: Story = {
  render: () => (
    <VStack gap="space-8">
      <BodyShort size="small">{lorem}</BodyShort>
      <BodyShort size="small" weight="semibold">
        {lorem}
      </BodyShort>
      <BodyShort size="small" truncate>
        {lorem}
      </BodyShort>
    </VStack>
  ),
};

export const SpacingLarge: Story = {
  render: () => (
    <div>
      <BodyShort size="large" spacing>
        {lorem}
      </BodyShort>
      <BodyShort size="large" spacing>
        {lorem}
      </BodyShort>
    </div>
  ),
};

export const SpacingMedium: Story = {
  render: () => (
    <div>
      <BodyShort size="medium" spacing>
        {lorem}
      </BodyShort>
      <BodyShort size="medium" spacing>
        {lorem}
      </BodyShort>
    </div>
  ),
};

export const SpacingSmall: Story = {
  render: () => (
    <div>
      <BodyShort size="small" spacing>
        {lorem}
      </BodyShort>
      <BodyShort size="small" spacing>
        {lorem}
      </BodyShort>
    </div>
  ),
};

export const Align: Story = {
  render: () => (
    <VStack gap="space-8">
      <BodyShort align="start">{lorem}</BodyShort>
      <BodyShort align="center">{lorem}</BodyShort>
      <BodyShort align="end">{lorem}</BodyShort>
    </VStack>
  ),
};

export const OverrideTag: Story = {
  render: () => (
    <div>
      <BodyShort spacing>default bodyshort</BodyShort>
      <BodyShort as="legend">legend bodyshort</BodyShort>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const defaultBodyShort = canvas.getByText("default bodyshort");
    const legendBodyShort = canvas.getByText("legend bodyshort");

    expect(defaultBodyShort.tagName).toEqual("P");
    expect(legendBodyShort.tagName).toEqual("LEGEND");
  },
};

export const ColorRole: Story = {
  render: () => (
    <VStack gap="space-8">
      <BodyShort textColor="default">{lorem}</BodyShort>
      <BodyShort textColor="subtle">{lorem}</BodyShort>
      <Box background="neutral-strong">
        <BodyShort textColor="contrast">{lorem}</BodyShort>
      </Box>
      <BodyShort data-color="brand-magenta">{lorem}</BodyShort>
      <BodyShort data-color="brand-magenta" textColor="default">
        {lorem}
      </BodyShort>
      <BodyShort data-color="brand-magenta" textColor="subtle">
        {lorem}
      </BodyShort>
      <Box background="neutral-strong">
        <BodyShort data-color="brand-magenta" textColor="contrast">
          {lorem}
        </BodyShort>
      </Box>
    </VStack>
  ),
};

export const Chromatic = renderStoriesForChromatic({
  SizeLarge,
  SpacingLarge,
  SizeMedium,
  SpacingMedium,
  SizeSmall,
  SpacingSmall,
  Align,
  OverrideTag,
  ColorRole,
});
