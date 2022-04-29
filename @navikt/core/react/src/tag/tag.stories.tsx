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

export const Toggle = () => {
  return (
    <div className="colgap">
      <Tag.Toggle>Tag</Tag.Toggle>
      <Tag.Toggle size="small">Tag</Tag.Toggle>
    </div>
  );
};

export const Removable = () => {
  return (
    <div className="rowgap">
      <div className="colgap">
        <Tag.Removable>Tag</Tag.Removable>
        <Tag.Removable size="small">Tag</Tag.Removable>
      </div>
      <div className="colgap">
        <Tag.Removable type="strong">Tag</Tag.Removable>
        <Tag.Removable size="small" type="strong">
          Tag
        </Tag.Removable>
      </div>
    </div>
  );
};

export const Wrapper = () => {
  return (
    <div className="colgap" style={{ maxWidth: 400 }}>
      <Tag.Wrapper>
        {vars.map((x: any) => (
          <Tag.Toggle key={x}>{x}</Tag.Toggle>
        ))}
        <button>danger</button>
      </Tag.Wrapper>
      <Tag.Wrapper>
        {vars.map((x: any) => (
          <Tag.Removable key={x}>{x}</Tag.Removable>
        ))}
      </Tag.Wrapper>
      <Tag.Wrapper size="small">
        {vars.map((x: any) => (
          <Tag.Toggle key={x}>{x}</Tag.Toggle>
        ))}
      </Tag.Wrapper>
    </div>
  );
};
