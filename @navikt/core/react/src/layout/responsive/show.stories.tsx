import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Show } from ".";
import { Tag } from "../../tag";
import { VStack } from "../stack";

export default {
  title: "ds-react/Primitives/Show",
  component: Show,
  parameters: {
    chromatic: {
      disable: true,
    },
  },
} satisfies Meta<typeof Show>;

type Story = StoryObj<typeof Show>;

export const Default: Story = {
  render: () => (
    <VStack gap="12">
      <VStack gap="2" align="center">
        <Show above="xl">
          <Tag variant="neutral">Visible above xl</Tag>
        </Show>
        <Show above="lg">
          <Tag variant="neutral">Visible above lg</Tag>
        </Show>
        <Show above="md">
          <Tag variant="neutral">Visible above md</Tag>
        </Show>
        <Show above="sm">
          <Tag variant="neutral">Visible above sm</Tag>
        </Show>
      </VStack>
      <VStack gap="2" align="center">
        <Show below="xl">
          <Tag variant="alt3">Visible below xl</Tag>
        </Show>
        <Show below="lg">
          <Tag variant="alt3">Visible below lg</Tag>
        </Show>
        <Show below="md">
          <Tag variant="alt3">Visible below md</Tag>
        </Show>
        <Show below="sm">
          <Tag variant="alt3">Visible below sm</Tag>
        </Show>
      </VStack>
    </VStack>
  ),
};

export const AsChild: Story = {
  render: () => (
    <VStack gap="12">
      <VStack gap="2" align="center">
        <Show above="xl" asChild>
          <Tag variant="neutral">Visible above xl</Tag>
        </Show>
        <Show above="lg" asChild>
          <Tag variant="neutral">Visible above lg</Tag>
        </Show>
        <Show above="md" asChild>
          <Tag variant="neutral">Visible above md</Tag>
        </Show>
        <Show above="sm" asChild>
          <Tag variant="neutral">Visible above sm</Tag>
        </Show>
      </VStack>
      <VStack gap="2" align="center">
        <Show below="xl" asChild>
          <Tag variant="alt3">Visible below xl</Tag>
        </Show>
        <Show below="lg" asChild>
          <Tag variant="alt3">Visible below lg</Tag>
        </Show>
        <Show below="md" asChild>
          <Tag variant="alt3">Visible below md</Tag>
        </Show>
        <Show below="sm" asChild>
          <Tag variant="alt3">Visible below sm</Tag>
        </Show>
      </VStack>
    </VStack>
  ),
};

export const Chromatic: Story = {
  render: (props, context) => (
    <VStack gap="4">
      <h2>Default</h2>
      {Default.render?.(props, context)}
      <h2>AsChild</h2>
      {AsChild.render?.(props, context)}
    </VStack>
  ),
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};
