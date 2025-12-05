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
          <Tag>Visible above xl</Tag>
        </Show>
        <Show above="lg">
          <Tag>Visible above lg</Tag>
        </Show>
        <Show above="md">
          <Tag>Visible above md</Tag>
        </Show>
        <Show above="sm">
          <Tag>Visible above sm</Tag>
        </Show>
      </VStack>
      <VStack gap="2" align="center">
        <Show below="xl">
          <Tag data-color="info">Visible below xl</Tag>
        </Show>
        <Show below="lg">
          <Tag data-color="info">Visible below lg</Tag>
        </Show>
        <Show below="md">
          <Tag data-color="info">Visible below md</Tag>
        </Show>
        <Show below="sm">
          <Tag data-color="info">Visible below sm</Tag>
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
          <Tag>Visible above xl</Tag>
        </Show>
        <Show above="lg" asChild>
          <Tag>Visible above lg</Tag>
        </Show>
        <Show above="md" asChild>
          <Tag>Visible above md</Tag>
        </Show>
        <Show above="sm" asChild>
          <Tag>Visible above sm</Tag>
        </Show>
      </VStack>
      <VStack gap="2" align="center">
        <Show below="xl" asChild>
          <Tag data-color="info">Visible below xl</Tag>
        </Show>
        <Show below="lg" asChild>
          <Tag data-color="info">Visible below lg</Tag>
        </Show>
        <Show below="md" asChild>
          <Tag data-color="info">Visible below md</Tag>
        </Show>
        <Show below="sm" asChild>
          <Tag data-color="info">Visible below sm</Tag>
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
