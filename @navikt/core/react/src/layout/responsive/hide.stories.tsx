import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Hide } from ".";
import { Tag } from "../../tag";
import { VStack } from "../stack";

export default {
  title: "ds-react/Primitives/Hide",
  component: Hide,
  parameters: {
    chromatic: {
      disable: true,
    },
  },
} satisfies Meta<typeof Hide>;

type Story = StoryObj<typeof Hide>;

export const Default: Story = {
  render: () => (
    <VStack gap="space-48">
      <VStack gap="space-8" align="center">
        <Hide above="xl">
          <Tag>Visible below xl</Tag>
        </Hide>
        <Hide above="lg">
          <Tag>Visible below lg</Tag>
        </Hide>
        <Hide above="md">
          <Tag>Visible below md</Tag>
        </Hide>
        <Hide above="sm">
          <Tag>Visible below sm</Tag>
        </Hide>
      </VStack>
      <VStack gap="space-8" align="center">
        <Hide below="xl">
          <Tag data-color="info">Visible above xl</Tag>
        </Hide>
        <Hide below="lg">
          <Tag data-color="info">Visible above lg</Tag>
        </Hide>
        <Hide below="md">
          <Tag data-color="info">Visible above md</Tag>
        </Hide>
        <Hide below="sm">
          <Tag data-color="info">Visible above sm</Tag>
        </Hide>
      </VStack>
    </VStack>
  ),
};

export const AsChild: Story = {
  render: () => (
    <VStack gap="space-48">
      <VStack gap="space-8" align="center">
        <Hide above="xl" asChild>
          <Tag>Hidden above xl</Tag>
        </Hide>
        <Hide above="lg" asChild>
          <Tag>Hidden above lg</Tag>
        </Hide>
        <Hide above="md" asChild>
          <Tag>Hidden above md</Tag>
        </Hide>
        <Hide above="sm" asChild>
          <Tag>Hidden above sm</Tag>
        </Hide>
      </VStack>
      <VStack gap="space-8" align="center">
        <Hide below="xl" asChild>
          <Tag data-color="info">Hidden below xl</Tag>
        </Hide>
        <Hide below="lg" asChild>
          <Tag data-color="info">Hidden below lg</Tag>
        </Hide>
        <Hide below="md" asChild>
          <Tag data-color="info">Hidden below md</Tag>
        </Hide>
        <Hide below="sm" asChild>
          <Tag data-color="info">Hidden below sm</Tag>
        </Hide>
      </VStack>
    </VStack>
  ),
};

export const Chromatic: Story = {
  render: (props, context) => (
    <VStack gap="space-16">
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
