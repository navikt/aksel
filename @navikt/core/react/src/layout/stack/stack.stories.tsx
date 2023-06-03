import React from "react";
import type { Meta } from "@storybook/react";
import { HStack, VStack } from ".";

export default {
  title: "ds-react/Stack",
  component: HStack,
} satisfies Meta<typeof HStack>;

export const Horizontal = {
  render: () => (
    <HStack gap="4">
      <Placeholders count={4} />
    </HStack>
  ),
};

export const Spacer = {
  render: () => (
    <VStack gap="8" align="stretch">
      <HStack gap="4">
        <Placeholders count={1} />
        <HStack.Spacer />
        <Placeholders count={1} />
      </HStack>
      <HStack gap="4">
        <Placeholders count={1} />
        <Placeholders count={1} />
      </HStack>
    </VStack>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

export const Vertical = {
  render: () => (
    <VStack gap="4">
      <Placeholders count={4} />
    </VStack>
  ),
};

export const OverrideComponent = {
  render: () => (
    <VStack gap="4" as="form" onSubmit={(e) => e.preventDefault()}>
      <Placeholders count={4} />
    </VStack>
  ),
};

export const Responsive = {
  render: () => (
    <VStack gap={{ xs: "1", sm: "3", md: "6", lg: "10", xl: "16" }}>
      <Placeholders count={4} />
    </VStack>
  ),
};

export const Nested = {
  render: () => (
    <VStack gap="16">
      <Placeholders count={2}>
        <VStack gap="4">
          <Placeholders count={2} color="gray" />
        </VStack>
      </Placeholders>
    </VStack>
  ),
};

function Placeholders({
  count,
  children,
  color,
}: {
  count: number;
  children?: React.ReactNode;
  color?: string;
}) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            backgroundColor: color ?? "var(--a-purple-200)",
            height: children ? "" : "3rem",
            width: children ? "" : "3rem",
          }}
        >
          {children}
        </div>
      ))}
    </>
  );
}
