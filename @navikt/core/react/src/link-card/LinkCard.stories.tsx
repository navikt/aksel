import { StoryObj } from "@storybook/react";
import React from "react";
import { LinkCard } from "./LinkCard";

export default {
  title: "ds-react/LinkCard",
  component: LinkCard,
  parameters: {
    chromatic: { disable: true },
  },
};

type Story = StoryObj<typeof LinkCard>;

export const Default: Story = {
  args: {
    children: <div>Child</div>,
  },
};
