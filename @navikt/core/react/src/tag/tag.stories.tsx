import React from "react";
import { Tag } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/Tag",
  component: Tag,
} as Meta;

const vars = [
  "warning",
  "danger",
  "info",
  "success",
  "action",
  "deepblue",
  "purple",
  "limegreen",
  "neutral",
];

const types = ["muted", "outline", "strong"];

export const Default = (props) => {
  return (
    <Tag {...props}>{`${props.variant}${
      props.type ? ` ${props.type}` : ""
    }`}</Tag>
  );
};

Default.args = {
  variant: "info",
};

export const variants = () => {
  return (
    <div className="colgap">
      {vars.map((x: any) => (
        <div className="rowgap">
          {types.map((y: any) => (
            <Tag key={y + x} variant={x} type={y}>
              Tag
            </Tag>
          ))}
        </div>
      ))}
    </div>
  );
};

export const size = () => {
  return (
    <div className="colgap">
      <Tag variant="neutral">Tag</Tag>
      <Tag variant="neutral" size="small">
        Tag
      </Tag>
    </div>
  );
};
