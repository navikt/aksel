import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import * as AkselIcons from "@navikt/aksel-icons";
import type { StarFillIcon } from "@navikt/aksel-icons";
import "@navikt/aksel-icons/css/Airplane.css";
import "@navikt/aksel-icons/css/Buildings2Fill.css";
import "@navikt/aksel-icons/css/MagnifyingGlass.css";
import "@navikt/aksel-icons/css/StarFill.css";
import "@navikt/aksel-icons/css/XMarkOctagonFill.css";

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

const cssIconVariables = [
  "--aksel-icon-airplane",
  "--aksel-icon-buildings-2-fill",
  "--aksel-icon-magnifying-glass",
  "--aksel-icon-star-fill",
  "--aksel-icon-x-mark-octagon-fill",
];

export const CssIcons: Story = {
  render: () => (
    <div
      style={{ display: "flex", gap: "1rem", color: "var(--ax-text-accent)" }}
    >
      {cssIconVariables.map((variable) => (
        <span
          key={variable}
          title={variable}
          style={{
            display: "inline-block",
            width: "3rem",
            height: "3rem",
            backgroundColor: "currentColor",
            mask: `var(${variable}) center / contain no-repeat`,
          }}
        />
      ))}
    </div>
  ),
};

export const CssIconsInverted: Story = {
  render: CssIcons.render,
  globals: { theme: "dark" },
};
