import React from "react";
import { Tag } from ".";

export default {
  title: "ds-react/Tag",
  component: Tag,
  argTypes: {
    variant: {
      defaultValue: "info",
      control: {
        type: "radio",
        options: [
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
        ],
      },
    },
    size: {
      defaultValue: "medium",
      control: {
        type: "radio",
        options: ["xsmall", "small", "medium"],
      },
    },
  },
};

const variants: Array<
  | "warning"
  | "warning-filled"
  | "error"
  | "error-filled"
  | "info"
  | "info-filled"
  | "success"
  | "success-filled"
  | "neutral"
  | "neutral-filled"
  | "alt1"
  | "alt1-filled"
  | "alt2"
  | "alt2-filled"
  | "alt3"
  | "alt3-filled"
> = [
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
];

export const Default = (props) => (
  <Tag variant={props.variant} size={props.size}>
    {props.children}
  </Tag>
);

Default.args = {
  children: "Id elit esse",
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
