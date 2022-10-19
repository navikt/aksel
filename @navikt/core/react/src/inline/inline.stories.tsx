import React from "react";
import { Tag } from "..";
import { Inline } from ".";

export default {
  title: "ds-react/Layout/Inline",
  component: Inline,
  argTypes: {
    align: {
      defaultValue: "center",
      control: {
        type: "radio",
        options: ["start", "end", "center", "baseline", "stretch"],
      },
    },
    justify: {
      defaultValue: "center",
      control: {
        type: "radio",
        options: ["start", "end", "center", "between", "evenly"],
      },
    },
  },
};

const elements = (
  <>
    <Tag variant="info">Info</Tag>
    <Tag variant="success">success</Tag>
    <Tag variant="error">error</Tag>
    <Tag variant="warning">warning</Tag>
  </>
);

export const Default = (props) => (
  <div style={{ width: "40rem", height: "4rem", display: "grid" }}>
    <Inline {...props}>
      <span>text</span>
      {elements}
      <span>text</span>
    </Inline>
  </div>
);

Default.args = {
  spacing: "4",
  wrap: true,
};

export const Spacing = () => (
  <div className="colgap">
    <Inline spacing="1">{elements}</Inline>
    <Inline spacing="2">{elements}</Inline>
    <Inline spacing="3">{elements}</Inline>
    <Inline spacing="4">{elements}</Inline>
  </div>
);

export const align = () => (
  <div className="colgap">
    <div style={{ height: "4rem", display: "grid" }}>
      <Inline align="start">
        <span>start</span>
        {elements}
      </Inline>
    </div>
    <div style={{ height: "4rem", display: "grid" }}>
      <Inline align="center">
        <span>center</span>
        {elements}
      </Inline>
    </div>
    <div style={{ height: "4rem", display: "grid" }}>
      <Inline align="end">
        <span>end</span>
        {elements}
      </Inline>
    </div>
    <div style={{ height: "4rem", display: "grid" }}>
      <Inline align="baseline">
        <span>baseline</span>
        {elements}
      </Inline>
    </div>
    <div style={{ height: "4rem", display: "grid" }}>
      <Inline align="stretch">
        <span>stretch</span>
        {elements}
      </Inline>
    </div>
  </div>
);

export const justify = () => (
  <div className="colgap" style={{ width: "50rem" }}>
    <Inline justify="start">{elements}</Inline>
    <Inline justify="center">{elements}</Inline>
    <Inline justify="end">{elements}</Inline>
    <Inline justify="between">{elements}</Inline>
    <Inline justify="evenly">{elements}</Inline>
  </div>
);
