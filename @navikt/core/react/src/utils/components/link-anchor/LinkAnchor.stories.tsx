import { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Box } from "../../../primitives/box";
import { HStack, VStack } from "../../../primitives/stack";
import { LinkAnchor, LinkAnchorArrow, LinkAnchorOverlay } from "./LinkAnchor";

type Story = StoryObj<typeof LinkAnchor>;

export default {
  title: "utilities/LinkAnchor",
  component: LinkAnchor,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof LinkAnchor>;

export const Default: Story = {
  render: () => {
    return (
      <VStack gap="space-8">
        <HStack gap="space-4" align="center" asChild>
          <LinkAnchor href="https://aksel.nav.no/">
            LinkAnchor
            <LinkAnchorArrow />
          </LinkAnchor>
        </HStack>
        <HStack gap="space-4" align="center" asChild>
          <LinkAnchor href="https://aksel.nav.no/">
            LinkAnchor
            <LinkAnchorArrow />
          </LinkAnchor>
        </HStack>
        <HStack gap="space-4" align="center" asChild>
          <LinkAnchor href="https://aksel.nav.no/">
            LinkAnchor
            <LinkAnchorArrow />
          </LinkAnchor>
        </HStack>
        <HStack gap="space-4" align="center" asChild>
          <LinkAnchor href="https://aksel.nav.no/">
            LinkAnchor
            <LinkAnchorArrow />
          </LinkAnchor>
        </HStack>
      </VStack>
    );
  },
};

export const Overlay: Story = {
  render: () => {
    return (
      <VStack gap="space-8">
        <LinkAnchorOverlay asChild>
          <Box padding="space-24" borderWidth="1">
            <HStack gap="space-4" align="center" asChild>
              <LinkAnchor href="https://aksel.nav.no/">
                Anchors
                <LinkAnchorArrow />
              </LinkAnchor>
            </HStack>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              omnis exercitationem, deserunt fugit esse autem laudantium
              perferendis, at, non vitae eos. Ipsum explicabo culpa vitae!
              Veniam repellendus reiciendis unde! Earum.
            </p>
          </Box>
        </LinkAnchorOverlay>
      </VStack>
    );
  },
};
