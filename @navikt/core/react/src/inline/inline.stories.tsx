import React from "react";
import { Tag } from "..";
import { Inline } from ".";

export default {
  title: "ds-react/layout/Inline",
  component: Inline,
  argTypes: {
    align: {
      control: {
        type: "radio",
        options: ["start", "end", "center", "baseline"],
      },
    },
    justify: {
      control: {
        type: "radio",
        options: ["start", "end", "center", "between"],
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
  <div style={{ width: "40rem" }}>
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
    <Inline align="start">
      <span>text</span>
      {elements}
    </Inline>
    <Inline align="center">
      <span>text</span>
      {elements}
    </Inline>
    <Inline align="end">
      <span>text</span>
      {elements}
    </Inline>
  </div>
);

export const justify = () => (
  <div className="colgap" style={{ width: "50rem" }}>
    <Inline justify="start">{elements}</Inline>
    <Inline justify="center">{elements}</Inline>
    <Inline justify="end">{elements}</Inline>
    <Inline justify="between">{elements}</Inline>
  </div>
);
