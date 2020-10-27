import React from "react";
import Lenke from "../src/lenke";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Lenke",
  component: Lenke,
} as Meta;

const Template = ({ children, ...args }) => (
  <Lenke href="#" {...args}>
    {children}
  </Lenke>
);

export const Example = Template.bind({});
Example.args = {
  children: "Lenketekst",
};
