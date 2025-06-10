import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardHeading,
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
      <LinkCard hasArrow={false}>
        <LinkCardHeading as="h2">
          <LinkCardAnchor href="https://aksel.nav.no/">Tittel</LinkCardAnchor>
        </LinkCardHeading>
        <LinkCardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
          placeat eos nesciunt aut quae ad maiores incidunt ducimus veritatis
          velit. Reprehenderit, ea vero voluptates temporibus laudantium
          mollitia cum. Laboriosam, facilis.
        </LinkCardDescription>
      </LinkCard>
    );
  },
};

export const Chromatic: Story = {
  render: () => <div>Chromatic</div>,
  parameters: {
    chromatic: { disable: false },
  },
};
