import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import * as AkselIcons from "@navikt/aksel-icons";
import { StarFillIcon } from "@navikt/aksel-icons";

const meta: Meta<typeof StarFillIcon> = {
  title: "aksel-icons/Icons",
  parameters: { html: { disable: true } },
};
export default meta;

type Story = StoryObj<typeof StarFillIcon>;

export const Icons: Story = {
  render: () => (
    <div>
      {Object.entries(AkselIcons).map(([key, Icon]) => (
        <Icon key={key} fontSize="3rem" aria-hidden title={key} />
      ))}
    </div>
  ),
};

export const IconsInverted: Story = {
  render: Icons.render,
  globals: { theme: "dark" },
};
