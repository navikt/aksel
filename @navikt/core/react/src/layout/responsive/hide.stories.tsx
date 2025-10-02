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
    <VStack gap="12">
      <VStack gap="2" align="center">
        <Hide above="xl">
          <Tag variant="neutral">Visible below xl</Tag>
        </Hide>
        <Hide above="lg">
          <Tag variant="neutral">Visible below lg</Tag>
        </Hide>
        <Hide above="md">
          <Tag variant="neutral">Visible below md</Tag>
        </Hide>
        <Hide above="sm">
          <Tag variant="neutral">Visible below sm</Tag>
        </Hide>
      </VStack>
      <VStack gap="2" align="center">
        <Hide below="xl">
          <Tag variant="alt3">Visible above xl</Tag>
        </Hide>
        <Hide below="lg">
          <Tag variant="alt3">Visible above lg</Tag>
        </Hide>
        <Hide below="md">
          <Tag variant="alt3">Visible above md</Tag>
        </Hide>
        <Hide below="sm">
          <Tag variant="alt3">Visible above sm</Tag>
        </Hide>
      </VStack>
    </VStack>
  ),
};

export const AsChild: Story = {
  render: () => (
    <VStack gap="12">
      <VStack gap="2" align="center">
        <Hide above="xl" asChild>
          <Tag variant="neutral">Hidden above xl</Tag>
        </Hide>
        <Hide above="lg" asChild>
          <Tag variant="neutral">Hidden above lg</Tag>
        </Hide>
        <Hide above="md" asChild>
          <Tag variant="neutral">Hidden above md</Tag>
        </Hide>
        <Hide above="sm" asChild>
          <Tag variant="neutral">Hidden above sm</Tag>
        </Hide>
      </VStack>
      <VStack gap="2" align="center">
        <Hide below="xl" asChild>
          <Tag variant="alt3">Hidden below xl</Tag>
        </Hide>
        <Hide below="lg" asChild>
          <Tag variant="alt3">Hidden below lg</Tag>
        </Hide>
        <Hide below="md" asChild>
          <Tag variant="alt3">Hidden below md</Tag>
        </Hide>
        <Hide below="sm" asChild>
          <Tag variant="alt3">Hidden below sm</Tag>
        </Hide>
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
