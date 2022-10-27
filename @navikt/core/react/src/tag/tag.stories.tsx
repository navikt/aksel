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
        options: ["error", "warning", "info", "success"],
      },
    },
  },
};

const variants: Array<"error" | "warning" | "info" | "success"> = [
  "error",
  "warning",
  "info",
  "success",
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
    <div className="rowgap">
      {variants.map((variant, i) => (
        <Tag key={variant} variant={variant} size="small">
          {new Array(i + 1).fill("Id elit esse")}
        </Tag>
      ))}
    </div>
  );
};
