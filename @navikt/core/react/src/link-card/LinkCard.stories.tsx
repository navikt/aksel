import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { VStack } from "../layout/stack";
import {
  LinkAnchor,
  LinkAnchorOverlay,
  LinkCard,
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardTitle,
} from "./LinkCard";

type Story = StoryObj<typeof LinkCard>;

export default {
  title: "ds-react/LinkCard",
  component: LinkCard,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof LinkCard>;

export const Default: StoryObj = {
  render: () => {
    return (
      <VStack gap="space-8">
        <LinkCard>
          <LinkCardTitle as="span">
            <LinkCardAnchor href="https://aksel.nav.no/">Tittel</LinkCardAnchor>
          </LinkCardTitle>
        </LinkCard>

        <LinkCard>
          <LinkCardTitle as="h2">
            <LinkCardAnchor href="/href">Tittel</LinkCardAnchor>
          </LinkCardTitle>
          <LinkCardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            placeat eos nesciunt aut quae ad maiores incidunt ducimus veritatis
            velit.
          </LinkCardDescription>
        </LinkCard>
        <LinkAnchor href="#">LINK ANCHOR</LinkAnchor>
        <LinkAnchorOverlay asChild>
          <div style={{ padding: "2rem", border: "1px solid red" }}>
            <LinkAnchor href="#123">Custom LinkAnchor</LinkAnchor>
          </div>
        </LinkAnchorOverlay>
      </VStack>
    );
  },
};

export const Chromatic: Story = {
  render: () => <div>Chromatic</div>,
  parameters: {
    chromatic: { disable: false },
  },
};
