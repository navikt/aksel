import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import React from "react";
import { BodyShort } from "..";
import { VStack } from "../..";
import { typoColors } from "../types";

const meta = {
  title: "ds-react/Typography/BodyShort",
  component: BodyShort,
  decorators: [(story) => <div style={{ maxWidth: "200px" }}>{story()}</div>],
} satisfies Meta<typeof BodyShort>;

export default meta;

type Story = StoryObj<typeof meta>;

const lorem = "Du må gjøre en filtrering for å se brukere i listen.";

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
    <VStack gap="2">
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
    <VStack gap="2">
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
    <VStack gap="2">
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

export const Colors: Story = {
  render: () => (
    <VStack gap="2">
      <BodyShort color="default">{lorem}</BodyShort>
      <BodyShort color="subtle">{lorem}</BodyShort>
      <div style={{ background: "var(--a-gray-900)" }}>
        <BodyShort color="on-inverted">{lorem}</BodyShort>
      </div>
    </VStack>
  ),
};

export const Align: Story = {
  render: () => (
    <VStack gap="2">
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
