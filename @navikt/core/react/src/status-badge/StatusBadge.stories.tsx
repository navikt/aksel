import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { InboxIcon } from "@navikt/aksel-icons";
import { StatusBadge } from ".";
import { Button } from "../button";
import { HStack } from "../primitives/stack";
import type { AkselColor } from "../types/theme";
import { renderStoriesForChromatic } from "../utils/renderStoriesForChromatic";

const meta: Meta<typeof StatusBadge> = {
  title: "ds-react/StatusBadge",
  component: StatusBadge,
  parameters: {
    chromatic: { disable: false },
  },
};

export default meta;

type Story = StoryObj<typeof StatusBadge>;

const colors: AkselColor[] = [
  "danger",
  "success",
  "info",
  "warning",
  "neutral",
];

export const Default: Story = {
  args: {
    children: "42",
    "data-color": "danger",
  },
};

export const Dot: Story = {
  render: () => (
    <HStack gap="space-16" align="center">
      {colors.map((color) => (
        <StatusBadge key={color} data-color={color} aria-label={color} />
      ))}
    </HStack>
  ),
};

export const Count: Story = {
  render: () => (
    <HStack gap="space-16" align="center">
      <StatusBadge data-color="danger">1</StatusBadge>
      <StatusBadge data-color="danger">42</StatusBadge>
      <StatusBadge data-color="danger">42+</StatusBadge>
      <StatusBadge data-color="accent">99+</StatusBadge>
    </HStack>
  ),
};

export const Anchored: Story = {
  render: () => (
    <HStack gap="space-32" align="center">
      <StatusBadge.Anchor placement="top-right">
        <Button
          icon={<InboxIcon aria-hidden />}
          aria-label="Innboks, 42 nye meldinger"
        />
        <StatusBadge data-color="danger">42</StatusBadge>
      </StatusBadge.Anchor>
      <StatusBadge.Anchor placement="top-right">
        <Button icon={<InboxIcon aria-hidden />} aria-label="Innboks" />
        <StatusBadge data-color="danger" aria-label="Nytt varsel" />
      </StatusBadge.Anchor>
    </HStack>
  ),
};

export const Pulse: Story = {
  render: (args) => (
    <HStack gap="space-32" align="center">
      <StatusBadge.Anchor placement="top-right">
        <Button
          icon={<InboxIcon aria-hidden />}
          aria-label="Innboks, 42 nye meldinger"
        />
        <StatusBadge pulse data-color="danger" {...args}>
          42
        </StatusBadge>
      </StatusBadge.Anchor>
      <StatusBadge.Anchor placement="top-right">
        <Button icon={<InboxIcon aria-hidden />} aria-label="Innboks" />
        <StatusBadge
          pulse
          data-color="danger"
          aria-label="Nytt varsel"
          {...args}
        />
      </StatusBadge.Anchor>
    </HStack>
  ),
  args: {
    "data-color": "danger",
  },
};

export const Chromatic = renderStoriesForChromatic({
  Default,
  Count,
  Dot,
  Anchored,
});
