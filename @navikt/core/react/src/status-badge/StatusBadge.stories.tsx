import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { InboxIcon } from "@navikt/aksel-icons";
import { StatusBadge } from ".";
import { Button } from "../button";
import { HStack } from "../primitives/stack";
import type { AkselColor } from "../types/theme";

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
    content: "42",
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
      <StatusBadge data-color="danger" content="1" />
      <StatusBadge data-color="danger" content="42" />
      <StatusBadge data-color="danger" content="42+" />
      <StatusBadge data-color="info" content="99+" />
    </HStack>
  ),
};

export const Anchored: Story = {
  render: () => (
    <HStack gap="space-32" align="center">
      <StatusBadge content="42" placement="top-right">
        <Button
          icon={<InboxIcon aria-hidden />}
          aria-label="Innboks, 42 nye meldinger"
        />
      </StatusBadge>
      <StatusBadge placement="top-right" aria-label="Nytt varsel">
        <Button icon={<InboxIcon aria-hidden />} aria-label="Innboks" />
      </StatusBadge>
    </HStack>
  ),
};
