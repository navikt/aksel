import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LinkCard } from "./LinkCard";

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
    return <LinkCard />;
  },
};

export const Chromatic: Story = {
  render: () => <div>Chromatic</div>,
  parameters: {
    chromatic: { disable: false },
  },
};
