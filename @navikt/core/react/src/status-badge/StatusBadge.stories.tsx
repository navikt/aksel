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
      <StatusBadge data-color="info">99+</StatusBadge>
    </HStack>
  ),
};

export const Floating: Story = {
  render: () => (
    <HStack gap="space-32" align="center">
      <Button icon={<InboxIcon fontSize="2rem" aria-hidden />}>
        <StatusBadge data-color="danger" placement="top-right">
          42
        </StatusBadge>
      </Button>
      <span style={{ position: "relative", display: "inline-flex" }}>
        <InboxIcon fontSize="2rem" aria-hidden />
        <StatusBadge
          data-color="danger"
          placement="top-right"
          aria-label="Nytt varsel"
        />
      </span>
    </HStack>
  ),
};
