import type { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import React from "react";
import { ComponentIcon } from "@navikt/aksel-icons";
import { Tag, TagProps } from ".";
import { HStack } from "../layout/stack";
import type { AkselColor } from "../types/theme";
import { renderStoriesForChromatic } from "../utils/renderStoriesForChromatic";

const sizes: TagProps["size"][] = ["xsmall", "small", "medium"];

const legacyVariants: TagProps["variant"][] = [
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

const variants: TagProps["variant"][] = ["outline", "moderate", "strong"];

const colors: AkselColor[] = [
  "accent",
  "neutral",
  "brand-beige",
  "brand-blue",
  "brand-magenta",
  "info",
  "success",
  "warning",
  "danger",
  "meta-lime",
  "meta-purple",
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
    color: {
      defaultValue: "accent",
      control: {
        type: "radio",
      },
      options: colors,
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
    <HStack gap="space-8">
      {variants.map((variant) => (
        <Tag key={variant} variant={variant} size="small">
          {variant}
        </Tag>
      ))}
    </HStack>
  );
};

export const XSmall: StoryFn<Story> = () => {
  return (
    <HStack gap="space-8">
      {variants.map((variant) => (
        <Tag key={variant} variant={variant} size="xsmall">
          {variant}
        </Tag>
      ))}
    </HStack>
  );
};

export const Outline: StoryFn<Story> = () => {
  return (
    <HStack gap="space-8">
      {colors.map((color) => (
        <Tag key={color} variant="outline" data-color={color}>
          {color}
        </Tag>
      ))}
    </HStack>
  );
};

export const Moderate: StoryFn<Story> = () => {
  return (
    <HStack gap="space-8">
      {colors.map((color) => (
        <Tag key={color} variant="moderate" data-color={color}>
          {color}
        </Tag>
      ))}
    </HStack>
  );
};

export const Strong: StoryFn<Story> = () => {
  return (
    <HStack gap="space-8">
      {colors.map((color) => (
        <Tag key={color} variant="strong" data-color={color}>
          {color}
        </Tag>
      ))}
    </HStack>
  );
};

export const WithIcons: StoryFn<Story> = () => {
  return (
    <HStack gap="space-8" align="start">
      {sizes.reverse().map((size) => (
        <Tag key={size} size={size} icon={<ComponentIcon aria-hidden />}>
          {size}
        </Tag>
      ))}
    </HStack>
  );
};

/**
 * These variant options were removed in v8, but we still support them
 */
export const LeagcySupport: StoryFn<Story> = () => {
  return (
    <HStack gap="space-8">
      {legacyVariants.map((variant) => (
        <Tag key={variant} variant={variant}>
          {variant}
        </Tag>
      ))}
    </HStack>
  );
};

export const Chromatic = renderStoriesForChromatic({
  Small,
  XSmall,
  Outline,
  Moderate,
  Strong,
  WithIcons,
  LeagcySupport,
});
