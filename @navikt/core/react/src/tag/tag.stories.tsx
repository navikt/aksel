import React from "react";
import type { Meta } from "@storybook/react";
import { CounterTag, Tag, TagProps } from ".";

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
} satisfies Meta<typeof Tag>;

export const Default = {
  render: (props) => (
    <Tag variant={props.variant} size={props.size}>
      {props.children}
    </Tag>
  ),

  args: {
    children: "Id elit esse",
    variant: "info",
  },
};

export const Small = () => {
  return (
    <div className="rowgap rowgap-wrap">
      {variants.map((variant, i) => (
        <Tag key={variant} variant={variant} size="small">
          {variant}
        </Tag>
      ))}
    </div>
  );
};

export const xSmall = () => {
  return (
    <div className="rowgap rowgap-wrap">
      {variants.map((variant, i) => (
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
      {variants.map((variant, i) => (
        <Tag key={variant} variant={variant}>
          {variant}
        </Tag>
      ))}
    </div>
  );
};

export const CounterTags = () => {
  return (
    <div className="colgap">
      <div className="rowgap rowgap-wrap">
        {variants.map((variant, i) => (
          <CounterTag key={variant} variant={variant} count={10 * i} />
        ))}
      </div>
      <div className="rowgap rowgap-wrap">
        {variants.map((variant, i) => (
          <CounterTag
            key={variant}
            variant={variant}
            count={10 * i}
            shape="circle"
          />
        ))}
      </div>
    </div>
  );
};
