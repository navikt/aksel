import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, within } from "storybook/test";
import { VStack } from "../../layout/stack";
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
      options: ["default", "subtle"],
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

export const ColorRole: Story = {
  render: () => (
    <VStack gap="2">
      <BodyShort textColor="default">{lorem}</BodyShort>
      <BodyShort textColor="subtle">{lorem}</BodyShort>
      <BodyShort data-color="brand-magenta">{lorem}</BodyShort>
      <BodyShort data-color="brand-magenta" textColor="default">
        {lorem}
      </BodyShort>
      <BodyShort data-color="brand-magenta" textColor="subtle">
        {lorem}
      </BodyShort>
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
