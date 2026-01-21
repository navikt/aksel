import { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { renderStoriesForChromatic } from "../utils/renderStoriesForChromatic";
import Loader, { LoaderProps } from "./Loader";

export default {
  title: "ds-react/Loader",
  component: Loader,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof Loader>;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  render: (props: LoaderProps) => <Loader {...props} />,

  argTypes: {
    size: {
      control: { type: "radio" },
      options: [
        "3xlarge",
        "2xlarge",
        "xlarge",
        "large",
        "medium",
        "small",
        "xsmall",
      ],
    },
    variant: {
      control: { type: "radio" },
      options: ["neutral", "interaction", "inverted"],
    },
    transparent: {
      control: { type: "boolean" },
    },
    title: {
      control: { type: "text" },
    },
  },
};

export const Size = () => (
  <div>
    <Loader size="3xlarge" />
    <Loader size="2xlarge" />
    <Loader size="xlarge" />
    <Loader size="large" />
    <Loader size="medium" />
    <Loader size="small" />
    <Loader size="xsmall" />
  </div>
);

export const Variant = () => (
  <div className="colgap">
    <div>
      <Loader size="3xlarge" variant="neutral" />
      <Loader size="3xlarge" variant="inverted" />
      <Loader size="3xlarge" variant="interaction" />
    </div>
    <div style={{ backgroundColor: "var(--ax-neutral-1000, #23262a)" }}>
      <Loader size="3xlarge" variant="neutral" />
      <Loader size="3xlarge" variant="inverted" />
      <Loader size="3xlarge" variant="interaction" />
    </div>
  </div>
);

export const Transparent = () => (
  <div className="colgap">
    <div>
      <Loader size="3xlarge" transparent variant="neutral" />
      <Loader size="3xlarge" transparent variant="inverted" />
      <Loader size="3xlarge" transparent variant="interaction" />
    </div>
    <div style={{ backgroundColor: "var(--ax-neutral-1000, #23262a)" }}>
      <Loader size="3xlarge" transparent variant="neutral" />
      <Loader size="3xlarge" transparent variant="inverted" />
      <Loader size="3xlarge" transparent variant="interaction" />
    </div>
  </div>
);

export const ColorRole = () => (
  <div className="colgap">
    <div>
      <Loader data-color="brand-magenta" size="3xlarge" variant="neutral" />
      <Loader data-color="brand-magenta" size="3xlarge" variant="inverted" />
      <Loader data-color="brand-magenta" size="3xlarge" variant="interaction" />
    </div>
    <div style={{ backgroundColor: "var(--ax-neutral-1000, #23262a)" }}>
      <Loader data-color="brand-magenta" size="3xlarge" variant="neutral" />
      <Loader data-color="brand-magenta" size="3xlarge" variant="inverted" />
      <Loader data-color="brand-magenta" size="3xlarge" variant="interaction" />
    </div>
  </div>
);

export const Chromatic = renderStoriesForChromatic({
  Size,
  Variant,
  Transparent,
  ColorRole,
});
