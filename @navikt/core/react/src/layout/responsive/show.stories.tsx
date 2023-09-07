import React from "react";
import type { Meta } from "@storybook/react";
import { Show } from ".";
import { Tag } from "../../tag";
import { VStack } from "../stack";

export default {
  title: "ds-react/Responsive/Show",
  component: Show,
} satisfies Meta<typeof Show>;

export const Default = {
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
