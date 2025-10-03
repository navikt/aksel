import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, within } from "storybook/test";
import { VStack } from "../../layout/stack";
import BodyLong from "../BodyLong";

const meta: Meta<typeof BodyLong> = {
  title: "ds-react/Typography/BodyLong",
  component: BodyLong,
  decorators: [(story) => <div style={{ maxWidth: "700px" }}>{story()}</div>],
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

type Story = StoryObj<typeof BodyLong>;

const lorem =
  "Hvis du ikke bor sammen med begge foreldrene dine, kan du ha rett til barnebidrag fra en eller begge foreldre mens du fullfører videregående skole eller tilsvarende.";

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
      options: ["default", "subtle"],
    },
  },
};

export const SizeLarge: Story = {
  render: () => (
    <VStack gap="4">
      <BodyLong size="large">{lorem}</BodyLong>
      <BodyLong size="large" weight="semibold">
        {lorem}
      </BodyLong>
      <BodyLong size="large" truncate>
        {lorem}
      </BodyLong>
    </VStack>
  ),
};

export const SizeMedium: Story = {
  render: () => (
    <VStack gap="2">
      <BodyLong size="medium">{lorem}</BodyLong>
      <BodyLong size="medium" weight="semibold">
        {lorem}
      </BodyLong>
      <BodyLong size="medium" truncate>
        {lorem}
      </BodyLong>
    </VStack>
  ),
};

export const SizeSmall: Story = {
  render: () => (
    <VStack gap="2">
      <BodyLong size="small">{lorem}</BodyLong>
      <BodyLong size="small" weight="semibold">
        {lorem}
      </BodyLong>
      <BodyLong size="small" truncate>
        {lorem}
      </BodyLong>
    </VStack>
  ),
};

export const SpacingLarge: Story = {
  render: () => (
    <div>
      <BodyLong size="large" spacing>
        {lorem}
      </BodyLong>
      <BodyLong size="large" spacing>
        {lorem}
      </BodyLong>
    </div>
  ),
};

export const SpacingMedium: Story = {
  render: () => (
    <div>
      <BodyLong size="medium" spacing>
        {lorem}
      </BodyLong>
      <BodyLong size="medium" spacing>
        {lorem}
      </BodyLong>
    </div>
  ),
};

export const SpacingSmall: Story = {
  render: () => (
    <div>
      <BodyLong size="small" spacing>
        {lorem}
      </BodyLong>
      <BodyLong size="small" spacing>
        {lorem}
      </BodyLong>
    </div>
  ),
};

export const Align: Story = {
  render: () => (
    <VStack gap="2">
      <BodyLong align="start">{lorem}</BodyLong>
      <BodyLong align="center">{lorem}</BodyLong>
      <BodyLong align="end">{lorem}</BodyLong>
    </VStack>
  ),
};

export const OverrideTag: Story = {
  render: () => (
    <div>
      <BodyLong spacing>default bodylong</BodyLong>
      <BodyLong as="legend">legend bodylong</BodyLong>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const defaultBodyLong = canvas.getByText("default bodylong");
    const legendBodyLong = canvas.getByText("legend bodylong");

    expect(defaultBodyLong.tagName).toEqual("P");
    expect(legendBodyLong.tagName).toEqual("LEGEND");
  },
};

export const ColorRole: Story = {
  render: () => (
    <VStack gap="2">
      <BodyLong textColor="default">{lorem}</BodyLong>
      <BodyLong textColor="subtle">{lorem}</BodyLong>
      <BodyLong data-color="brand-magenta">{lorem}</BodyLong>
      <BodyLong data-color="brand-magenta" textColor="default">
        {lorem}
      </BodyLong>
      <BodyLong data-color="brand-magenta" textColor="subtle">
        {lorem}
      </BodyLong>
    </VStack>
  ),
};

export const Chromatic: Story = {
  render: (...props) => (
    <div>
      <div>
        <h2>Large</h2>
        <h3>Size</h3>
        {SizeLarge.render?.(...props)}
        <h3>Spacing</h3>
        {SpacingLarge.render?.(...props)}
      </div>
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
