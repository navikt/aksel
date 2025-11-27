import type { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import React from "react";
import { ComponentIcon } from "@navikt/aksel-icons";
import { Tag, TagProps } from ".";
import { HStack } from "../layout/stack";
import { renderStoriesForChromatic } from "../util/renderStoriesForChromatic";

const sizes: TagProps["size"][] = ["xsmall", "small", "medium"];

const variants: TagProps["variant"][] = [
  "warning",
  "error",
  "info",
  "success",
  "neutral",
  "alt1",
  "alt2",
  "alt3",
  "warning-filled",
  "error-filled",
  "info-filled",
  "success-filled",
  "neutral-filled",
  "alt1-filled",
  "alt2-filled",
  "alt3-filled",
  "warning-moderate",
  "error-moderate",
  "info-moderate",
  "success-moderate",
  "neutral-moderate",
  "alt1-moderate",
  "alt2-moderate",
  "alt3-moderate",
];

export default {
  title: "ds-react/Tag",
  component: Tag,
  argTypes: {
    variant: {
      defaultValue: "info",
      control: {
        type: "radio",
      },
      options: variants,
    },
    size: {
      defaultValue: "medium",
      control: {
        type: "radio",
      },
      options: ["xsmall", "small", "medium"],
    },
  },
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof Tag>;

type Story = StoryObj<typeof Tag>;

export const Default = {
  render: (props) => (
    <Tag
      variant={props.variant ?? "info"}
      size={props.size}
      icon={props.icon && <ComponentIcon aria-hidden />}
    >
      {props.children ?? "Id elit esse"}
    </Tag>
  ),

  args: {
    children: "Id elit esse",
    variant: "info",
    icon: false,
  },
};

export const Small: StoryFn<Story> = () => {
  return (
    <div className="rowgap rowgap-wrap">
      {variants.map((variant) => (
        <Tag key={variant} variant={variant} size="small">
          {variant}
        </Tag>
      ))}
    </div>
  );
};

export const XSmall: StoryFn<Story> = () => {
  return (
    <div className="rowgap rowgap-wrap">
      {variants.map((variant) => (
        <Tag key={variant} variant={variant} size="xsmall">
          {variant}
        </Tag>
      ))}
    </div>
  );
};

export const Variants: StoryFn<Story> = () => {
  return (
    <div className="rowgap rowgap-wrap">
      {variants.map((variant) => (
        <Tag key={variant} variant={variant}>
          {variant}
        </Tag>
      ))}
    </div>
  );
};

export const VariantsWithAccentRoleOverride: StoryFn<Story> = () => {
  return (
    <div className="rowgap rowgap-wrap">
      {variants.map((variant) => (
        <Tag key={variant} variant={variant} data-color="accent">
          {variant}
        </Tag>
      ))}
    </div>
  );
};

export const WithIcons: StoryFn<Story> = () => {
  return (
    <HStack gap="2" align="start">
      {sizes.reverse().map((size) => (
        <Tag
          key={size}
          variant="neutral-moderate"
          size={size}
          icon={<ComponentIcon aria-hidden />}
        >
          {size}
        </Tag>
      ))}
    </HStack>
  );
};

export const Chromatic = renderStoriesForChromatic({
  Default,
  Small,
  XSmall,
  Variants,
  WithIcons,
});
