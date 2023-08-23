import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import React from "react";
import { BodyLong } from "..";
import { VStack } from "../..";
import { typoColors } from "../types";

const meta = {
  title: "ds-react/Typography/BodyLong",
  component: BodyLong,
  decorators: [(story) => <div style={{ maxWidth: "700px" }}>{story()}</div>],
} satisfies Meta<typeof BodyLong>;

export default meta;

type Story = StoryObj<typeof meta>;

const lorem =
  "Hvis du ikke bor sammen med begge foreldrene dine, kan du ha rett til barnebidrag fra en eller begge foreldre mens du fullfører videregående skole eller tilsvarende.";

export const Default: Story = {
  args: {
    spacing: false,
    children: lorem,
    underline: false,
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
    color: {
      control: "radio",
      options: typoColors,
    },
  },
};

export const SizeLarge: Story = {
  render: () => (
    <VStack gap="4">
      <BodyLong size="large">{lorem}</BodyLong>
      <BodyLong size="large" underline>
        {lorem}
      </BodyLong>
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
      <BodyLong size="medium" underline>
        {lorem}
      </BodyLong>
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
      <BodyLong size="small" underline>
        {lorem}
      </BodyLong>
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

export const Colors: Story = {
  render: () => (
    <VStack gap="2">
      <BodyLong color="default">{lorem}</BodyLong>
      <BodyLong color="subtle">{lorem}</BodyLong>
      <div style={{ background: "var(--a-gray-900)" }}>
        <BodyLong color="on-inverted">{lorem}</BodyLong>
      </div>
    </VStack>
  ),
};

export const Algin: Story = {
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
