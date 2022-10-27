import { Meta } from "@storybook/react";
import React from "react";
import { Heading } from "..";

export default {
  title: "ds-react/Typography/Heading",
  component: Heading,
  argTypes: {
    size: {
      defaultValue: "large",
      control: {
        type: "radio",
        options: ["xlarge", "large", "medium", "small", "xsmall"],
      },
    },
    level: {
      defaultValue: "1",
      control: {
        type: "radio",
        options: ["1", "2", "3", "4", "5", "6"],
      },
    },
  },
} as Meta;

const lorem = "Veniam consequat cillum";

export const Default = (props) => <Heading {...props}>{lorem}</Heading>;

Default.args = {
  spacing: false,
};

export const Sizes = () => (
  <div className="colgap">
    <Heading level="1" size="xlarge">
      {lorem}
    </Heading>
    <Heading level="2" size="large">
      {lorem}
    </Heading>
    <Heading level="3" size="medium">
      {lorem}
    </Heading>
    <Heading level="4" size="small">
      {lorem}
    </Heading>
    <Heading level="5" size="xsmall">
      {lorem}
    </Heading>
  </div>
);

export const Spacing = () => (
  <div>
    <Heading level="1" size="xlarge" spacing>
      {lorem}
    </Heading>
    <Heading level="2" size="large" spacing>
      {lorem}
    </Heading>
    <Heading level="3" size="medium" spacing>
      {lorem}
    </Heading>
    <Heading level="4" size="small" spacing>
      {lorem}
    </Heading>
    <Heading level="5" size="xsmall" spacing>
      {lorem}
    </Heading>
    <Heading level="5" size="xsmall">
      {lorem}
    </Heading>
  </div>
);
