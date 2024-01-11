import type { Meta } from "@storybook/react";
import React from "react";
import { ComponentIcon } from "@navikt/aksel-icons";
import { Tag, TagProps } from ".";
import { HStack, VStack } from "../layout/stack";

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
    iconPosition: {
      defaultValue: "left",
      control: {
        type: "radio",
      },
      options: ["left", "right"],
    },
  },
} satisfies Meta<typeof Tag>;

export const Default = {
  render: (props) => (
    <Tag
      variant={props.variant}
      size={props.size}
      iconPosition={props.iconPosition}
      icon={props.icon && <ComponentIcon aria-hidden />}
    >
      {props.children}
    </Tag>
  ),

  args: {
    children: "Id elit esse",
    variant: "info",
    icon: false,
  },
};

export const Small = () => {
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

export const XSmall = () => {
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

export const Variants = () => {
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

export const WithIcons = () => {
  return (
    <VStack gap="4">
      <HStack gap="2" align="start">
        {sizes.reverse().map((size) => (
          <Tag
            key={size}
            variant="neutral-moderate"
            size={size}
            iconPosition="left"
            icon={<ComponentIcon aria-hidden />}
          >
            {size}
          </Tag>
        ))}
      </HStack>
      <HStack gap="2" align="start">
        {sizes.map((size) => (
          <Tag
            key={size}
            variant="neutral-moderate"
            size={size}
            iconPosition="right"
            icon={<ComponentIcon aria-hidden />}
          >
            {size}
          </Tag>
        ))}
      </HStack>
    </VStack>
  );
};
