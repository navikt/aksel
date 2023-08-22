import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import React from "react";
import { BodyShort } from "..";
import { VStack } from "../..";

const meta = {
  title: "ds-react/Typography/BodyShort",
  component: BodyShort,
} satisfies Meta<typeof BodyShort>;

export default meta;

type Story = StoryObj<typeof meta>;

const lorem = "Du må gjøre en filtrering for å se brukere i listen.";

export const Default: Story = {
  args: {
    spacing: false,
    children: lorem,
  },
};

export const SizeMedium: Story = {
  render: () => (
    <VStack gap="2">
      <BodyShort size="medium">{lorem}</BodyShort>
      <BodyShort size="medium">{lorem}</BodyShort>
    </VStack>
  ),
};

export const SizeSmall: Story = {
  render: () => (
    <VStack gap="2">
      <BodyShort size="small">{lorem}</BodyShort>
      <BodyShort size="small">{lorem}</BodyShort>
    </VStack>
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
